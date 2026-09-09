import React, { useEffect, useRef } from 'react';
import { atmos } from './bg/atmos';
import { SKY, type SkyConstellation } from './map/skyConfig';

const ACCENT = '#fde100';

interface Props {
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  /** focus / open a map node — used by 'node:<id>' constellation actions */
  onNode: (id: string, section: string, anchor?: string) => void;
}

type EventKind = 'comet' | 'shootingStar' | 'satellite' | 'flare';
interface Live {
  kind: EventKind;
  t: number; // 0..1
  dur: number; // seconds
  ax: number;
  ay: number;
  bx: number;
  by: number;
  color: string;
  tail: number;
  r?: number; // flare radius base
}

const rnd = ([a, b]: [number, number]) => a + Math.random() * (b - a);

const SkyLayer: React.FC<Props> = ({ theme, reducedMotion, onNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onNodeRef = useRef(onNode);
  onNodeRef.current = onNode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const t0 = performance.now();
    let lastNow = t0;

    const live: Live[] = [];
    let nextEventAt = performance.now() + rnd([2200, 5000]);
    let flash: { text: string; until: number } | null = null;
    let hoverIdx = -1;
    let cursorSet = false;
    const pointer = { x: -9999, y: -9999 };

    // twinkle phase per star, stable across resizes
    const phase = SKY.constellations.map((c) => c.stars.map(() => Math.random() * Math.PI * 2));

    const bag: EventKind[] = [];
    (Object.keys(SKY.events.weights) as EventKind[]).forEach((k) => {
      for (let i = 0; i < (SKY.events.weights[k] ?? 0); i++) bag.push(k);
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // where a star lands on screen, with a touch of pointer parallax
    const px = () => (atmos.mx - 0.5) * 20;
    const py = () => (atmos.my - 0.5) * 12;
    const starXY = (c: SkyConstellation, i: number): [number, number] => {
      const s = c.stars[i];
      return [s[0] * W + px() * (c.interactive ? 1.4 : 1), s[1] * H + py() * (c.interactive ? 1.4 : 1)];
    };

    const bounds = (c: SkyConstellation) => {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      c.stars.forEach((_, i) => {
        const [x, y] = starXY(c, i);
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      });
      return { x0: x0 - 26, y0: y0 - 26, x1: x1 + 26, y1: y1 + 26 };
    };

    const spawn = (kind: EventKind) => {
      const e = SKY.events;
      const edge = () => {
        const s = Math.random();
        if (s < 0.5) return [Math.random() * W, -40] as [number, number]; // top
        if (s < 0.75) return [-40, Math.random() * H * 0.6] as [number, number]; // left
        return [W + 40, Math.random() * H * 0.6] as [number, number]; // right
      };
      if (kind === 'flare') {
        live.push({
          kind,
          t: 0,
          dur: 1.2,
          ax: 60 + Math.random() * (W - 120),
          ay: 40 + Math.random() * (H * 0.5),
          bx: 0,
          by: 0,
          color: e.flare.color,
          tail: 0,
          r: 3
        });
        return;
      }
      const [ax, ay] = edge();
      const bx = W * (0.2 + Math.random() * 0.6);
      const by = H * (0.15 + Math.random() * 0.5);
      const cfg =
        kind === 'comet' ? e.comet : kind === 'satellite' ? e.satellite : e.shootingStar;
      live.push({
        kind,
        t: 0,
        dur: rnd(cfg.speedSec),
        ax,
        ay,
        bx,
        by,
        color: cfg.color,
        tail: 'tail' in cfg ? (cfg as { tail: number }).tail : 0
      });
    };

    const doAction = (a: string) => {
      if (a.startsWith('flash:')) flash = { text: a.slice(6), until: performance.now() + 2800 };
      else if (a === 'comet') spawn('comet');
      else if (a === 'shower') for (let i = 0; i < 9; i++) setTimeout(() => spawn('shootingStar'), i * 160);
      else if (a.startsWith('node:')) onNodeRef.current(a.slice(5), a.slice(5));
      else if (a.startsWith('url:')) window.open(a.slice(4), '_blank', 'noopener,noreferrer');
    };

    const drawStreak = (l: Live) => {
      const x = l.ax + (l.bx - l.ax) * l.t;
      const y = l.ay + (l.by - l.ay) * l.t;
      const dx = l.bx - l.ax;
      const dy = l.by - l.ay;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      const ease =
        l.kind === 'satellite'
          ? Math.min(1, l.t / 0.12) * Math.min(1, (1 - l.t) / 0.12)
          : Math.min(1, l.t / 0.12) * Math.min(1, (1 - l.t) / 0.3);

      if (l.tail > 0) {
        const tl = l.tail * (l.kind === 'comet' ? 1 : 0.7);
        const grad = ctx.createLinearGradient(x, y, x - ux * tl, y - uy * tl);
        grad.addColorStop(0, l.color);
        grad.addColorStop(0.5, l.kind === 'comet' ? 'rgba(255,226,150,0.5)' : 'rgba(255,255,255,0.4)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.globalAlpha = ease * (l.kind === 'comet' ? 0.95 : 0.8);
        ctx.lineWidth = l.kind === 'comet' ? 4.5 : 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - ux * tl, y - uy * tl);
        ctx.stroke();
      }
      // head
      const hr = l.kind === 'comet' ? 4.6 : l.kind === 'satellite' ? 1.5 : 2.2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, hr * 4);
      g.addColorStop(0, l.color);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = ease;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, hr * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.arc(x, y, hr, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawFlare = (l: Live) => {
      const s = Math.sin(l.t * Math.PI); // 0..1..0
      const R = (l.r ?? 3) + s * 26;
      ctx.globalAlpha = s * 0.8;
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(l.ax, l.ay, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(l.ax - R * 1.5, l.ay);
      ctx.lineTo(l.ax + R * 1.5, l.ay);
      ctx.moveTo(l.ax, l.ay - R * 1.5);
      ctx.lineTo(l.ax, l.ay + R * 1.5);
      ctx.globalAlpha = s * 0.5;
      ctx.stroke();
      ctx.globalAlpha = s;
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.arc(l.ax, l.ay, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const time = (now - t0) / 1000;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      ctx.clearRect(0, 0, W, H);

      const light = theme === 'light';
      const lineCol = light ? 'rgba(40,40,34,0.5)' : 'rgba(210,205,185,0.42)';
      const starCol = light ? 'rgba(30,30,26,0.9)' : 'rgba(246,240,222,0.92)';

      // hover hit-test
      hoverIdx = -1;
      for (let i = 0; i < SKY.constellations.length; i++) {
        const c = SKY.constellations[i];
        if (!c.interactive) continue;
        const b = bounds(c);
        if (pointer.x >= b.x0 && pointer.x <= b.x1 && pointer.y >= b.y0 && pointer.y <= b.y1) {
          hoverIdx = i;
          break;
        }
      }
      if (hoverIdx >= 0 && !cursorSet) {
        document.body.style.cursor = 'pointer';
        cursorSet = true;
      } else if (hoverIdx < 0 && cursorSet) {
        document.body.style.cursor = '';
        cursorSet = false;
      }

      // constellations
      SKY.constellations.forEach((c, ci) => {
        const hot = ci === hoverIdx;
        const pts = c.stars.map((_, i) => starXY(c, i));
        ctx.strokeStyle = hot ? ACCENT : lineCol;
        ctx.lineWidth = hot ? 1.6 : 1;
        ctx.globalAlpha = hot ? 0.9 : 1;
        c.lines.forEach(([a, b]) => {
          if (!pts[a] || !pts[b]) return;
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        });
        pts.forEach(([x, y], i) => {
          const tw = reducedMotion ? 0.85 : 0.62 + 0.38 * Math.sin(time * 1.4 + phase[ci][i]);
          const r = (c.interactive ? 2.1 : 1.5) * (hot ? 1.7 : 1);
          ctx.globalAlpha = hot ? 1 : Math.max(0.35, tw);
          // soft glow
          const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
          g.addColorStop(0, hot ? 'rgba(253,225,0,0.5)' : light ? 'rgba(40,40,34,0.28)' : 'rgba(255,244,208,0.28)');
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, r * 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = hot ? ACCENT : starCol;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (hot) {
          const b = bounds(c);
          ctx.font = '700 11px "Montserrat", sans-serif';
          ctx.fillStyle = ACCENT;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.shadowColor = light ? '#f4f3ee' : '#000';
          ctx.shadowBlur = 10;
          ctx.fillText(c.name.toUpperCase(), (b.x0 + b.x1) / 2, b.y0 - 4);
          ctx.shadowBlur = 0;
        }
      });

      // scheduled random events
      if (!reducedMotion && SKY.events.enabled && now > nextEventAt) {
        nextEventAt = now + rnd(SKY.events.everySec) * 1000;
        if (bag.length) spawn(bag[(Math.random() * bag.length) | 0]);
      }

      // advance + draw live events
      for (let i = live.length - 1; i >= 0; i--) {
        const l = live[i];
        l.t += dt / l.dur;
        if (l.t >= 1) {
          live.splice(i, 1);
          continue;
        }
        if (l.kind === 'flare') drawFlare(l);
        else drawStreak(l);
      }

      // flash text
      if (flash) {
        if (now > flash.until) flash = null;
        else {
          const k = Math.min(1, (flash.until - now) / 400);
          ctx.globalAlpha = k;
          ctx.font = '800 13px "Montserrat", sans-serif';
          ctx.fillStyle = ACCENT;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = theme === 'light' ? '#f4f3ee' : '#000';
          ctx.shadowBlur = 14;
          ctx.fillText(flash.text.toUpperCase(), W / 2, H * 0.16);
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onClick = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      for (let i = 0; i < SKY.constellations.length; i++) {
        const c = SKY.constellations[i];
        if (!c.interactive || !c.onClick) continue;
        const b = bounds(c);
        if (e.clientX >= b.x0 && e.clientX <= b.x1 && e.clientY >= b.y0 && e.clientY <= b.y1) {
          doAction(c.onClick);
          break;
        }
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
      if (cursorSet) document.body.style.cursor = '';
    };
  }, [theme, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -5 }}
    />
  );
};

export default SkyLayer;
