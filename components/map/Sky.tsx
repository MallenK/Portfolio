import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html, Line } from '@react-three/drei';
import { atmos } from '../bg/atmos';
import { SKY, type SkyConstellation } from './skyConfig';

const ACCENT = '#fde100';
const DEG = Math.PI / 180;
const UP = /* @__PURE__ */ new THREE.Vector3(0, 1, 0);

const dirFrom = (azDeg: number, altDeg: number) => {
  const az = azDeg * DEG;
  const alt = altDeg * DEG;
  const c = Math.cos(alt);
  return new THREE.Vector3(c * Math.sin(az), Math.sin(alt), c * Math.cos(az));
};
const rand = ([a, b]: [number, number]) => a + Math.random() * (b - a);
const env = (t: number) => Math.min(1, t / 0.14) * Math.min(1, (1 - t) / 0.28);
/** azimuth (deg) the camera looks toward — events cross the current view */
const viewAz = () =>
  (Math.atan2(atmos.tgtX - atmos.camX, atmos.tgtZ - atmos.camZ) * 180) / Math.PI;

/* ------------------------------------------------------------ ambient events */
type Kind = 'comet' | 'shootingStar' | 'satellite' | 'flare';

const Streak: React.FC<{ kind: 'comet' | 'shootingStar' | 'satellite'; onDone: () => void }> = ({
  kind,
  onDone
}) => {
  const g = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const done = useRef(false);
  const t = useRef(0);

  const cfg = useMemo(() => {
    const e = SKY.events;
    const az = viewAz();
    const s = Math.random() < 0.5 ? 1 : -1;
    const a = dirFrom(az - s * (26 + Math.random() * 46), -6 + Math.random() * 40);
    const b = dirFrom(az + s * (26 + Math.random() * 46), -6 + Math.random() * 40);
    if (kind === 'comet')
      return { a, b, dur: rand(e.comet.speedSec), color: e.comet.color, tail: e.comet.tail, head: e.comet.size, glow: true };
    if (kind === 'satellite')
      return { a, b, dur: rand(e.satellite.speedSec), color: e.satellite.color, tail: 0, head: 0.12, glow: false };
    return { a, b, dur: rand(e.shootingStar.speedSec), color: e.shootingStar.color, tail: e.shootingStar.tail, head: 0.18, glow: false };
  }, [kind]);

  useFrame((_, dt) => {
    if (done.current) return;
    t.current += dt / cfg.dur;
    if (t.current >= 1) {
      done.current = true;
      onDone();
      return;
    }
    const grp = g.current;
    if (!grp) return;
    const p = cfg.a.clone().lerp(cfg.b, t.current).normalize();
    grp.position.copy(p).multiplyScalar(SKY.radius);
    if (cfg.tail > 0 && tailRef.current) {
      const ahead = cfg.a.clone().lerp(cfg.b, Math.min(1, t.current + 0.03)).normalize().multiplyScalar(SKY.radius);
      tailRef.current.quaternion.setFromUnitVectors(UP, grp.position.clone().sub(ahead).normalize());
    }
    const e = kind === 'satellite'
      ? Math.min(1, t.current / 0.12) * Math.min(1, (1 - t.current) / 0.12)
      : env(t.current);
    grp.traverse((o) => {
      const m = (o as THREE.Mesh).material as (THREE.Material & { opacity?: number }) | undefined;
      if (m && 'opacity' in m) m.opacity = (Number((o as THREE.Mesh).userData.base) || 1) * e;
    });
  });

  return (
    <group ref={g}>
      <mesh userData={{ base: 1 }}>
        <sphereGeometry args={[cfg.head, 10, 10]} />
        <meshBasicMaterial color={cfg.color} transparent toneMapped={false} />
      </mesh>
      {cfg.glow && (
        <mesh userData={{ base: 0.4 }}>
          <sphereGeometry args={[cfg.head * 3.6, 12, 12]} />
          <meshBasicMaterial color={cfg.color} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      )}
      {cfg.tail > 0 && (
        <mesh ref={tailRef} position={[0, cfg.tail / 2, 0]} userData={{ base: 0.45 }}>
          <coneGeometry args={[cfg.head * 1.15, cfg.tail, 12, 1, true]} />
          <meshBasicMaterial color={cfg.color} transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
};

const Flare: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const g = useRef<THREE.Group>(null);
  const done = useRef(false);
  const t = useRef(0);
  const pos = useMemo(
    () => dirFrom(viewAz() + (Math.random() - 0.5) * 100, -4 + Math.random() * 42).multiplyScalar(SKY.radius),
    []
  );
  useFrame((_, dt) => {
    if (done.current) return;
    t.current += dt / 1.3;
    if (t.current >= 1) {
      done.current = true;
      onDone();
      return;
    }
    const s = Math.sin(t.current * Math.PI);
    if (g.current) g.current.scale.setScalar(0.5 + s * 2.2);
    g.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material as (THREE.Material & { opacity?: number }) | undefined;
      if (m && 'opacity' in m) m.opacity = s;
    });
  });
  return (
    <group ref={g} position={pos}>
      <mesh>
        <sphereGeometry args={[0.17, 10, 10]} />
        <meshBasicMaterial color={SKY.events.flare.color} transparent toneMapped={false} />
      </mesh>
      {[0, Math.PI / 2].map((r) => (
        <mesh key={r} rotation={[0, 0, r]}>
          <planeGeometry args={[1.7, 0.06]} />
          <meshBasicMaterial color={SKY.events.flare.color} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

/* ---------------------------------------------------------------- constellation */
const Constellation: React.FC<{
  data: SkyConstellation;
  theme: 'dark' | 'light';
  onAction: (a: string) => void;
}> = ({ data, theme, onAction }) => {
  const [hover, setHover] = useState(false);
  const starGrp = useRef<THREE.Group>(null);

  const { pts, sizes, bri, edges, center, span } = useMemo(() => {
    const s = data.scale ?? 3;
    const [a0, alt0] = data.anchor;
    const dirs = data.stars.map(([dx, dy]) => dirFrom(a0 + dx * s, alt0 + dy * s));
    const p = dirs.map((d) => d.clone().multiplyScalar(SKY.radius));
    const b = data.stars.map((_, i) => data.brightness?.[i] ?? 1);
    const sz = b.map((v) => SKY.starSize * v * (data.interactive ? 1.12 : 1));
    const e = data.lines
      .map(([a, b]) => (p[a] && p[b] ? ([p[a], p[b]] as [THREE.Vector3, THREE.Vector3]) : null))
      .filter((x): x is [THREE.Vector3, THREE.Vector3] => !!x);
    const ctr = new THREE.Vector3();
    dirs.forEach((d) => ctr.add(d));
    ctr.normalize();
    const sp = Math.max(...dirs.map((d) => d.angleTo(ctr)), 0.05);
    return { pts: p, sizes: sz, bri: b, edges: e, center: ctr.multiplyScalar(SKY.radius), span: sp };
  }, [data]);

  useFrame((state) => {
    if (!starGrp.current) return;
    const T = state.clock.elapsedTime;
    starGrp.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as (THREE.Material & { opacity?: number }) | undefined;
      if (m && 'opacity' in m) m.opacity = (hover ? 1 : 0.82) * (0.7 + 0.3 * Math.sin(T * 1.3 + i * 1.9));
    });
  });

  const starColor = hover ? ACCENT : theme === 'light' ? '#55554a' : '#f4eeda';
  const lineColor = hover ? ACCENT : theme === 'light' ? '#8f8d82' : '#b9b4a1';

  return (
    <group>
      {edges.map((seg, i) => (
        <Line key={i} points={seg} color={lineColor} lineWidth={hover ? 1.6 : 1} transparent opacity={hover ? 0.8 : 0.3} depthWrite={false} />
      ))}
      <group ref={starGrp}>
        {pts.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[hover ? sizes[i] * 1.5 : sizes[i], 6, 6]} />
            <meshBasicMaterial color={starColor} transparent opacity={0.9} toneMapped={false} depthWrite={false} />
          </mesh>
        ))}
      </group>
      {pts.map((p, i) => (
        <mesh key={`h${i}`} position={p}>
          <sphereGeometry args={[sizes[i] * (hover ? 3.6 : 2.9), 8, 8]} />
          <meshBasicMaterial
            color={hover ? ACCENT : '#fff2cc'}
            transparent
            opacity={hover ? 0.28 : theme === 'light' ? 0.06 : 0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* diffraction spikes on the brightest stars — real bright stars sparkle */}
      {pts.map((p, i) =>
        bri[i] >= 1.4 ? (
          <Billboard key={`s${i}`} position={p}>
            {[0, Math.PI / 2].map((r) => (
              <mesh key={r} rotation={[0, 0, r]}>
                <planeGeometry args={[sizes[i] * 22, sizes[i] * 1.4]} />
                <meshBasicMaterial
                  color={hover ? ACCENT : '#fff4d6'}
                  transparent
                  opacity={hover ? 0.5 : 0.28}
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                  toneMapped={false}
                />
              </mesh>
            ))}
          </Billboard>
        ) : null
      )}

      {data.interactive && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: react-three-fiber raycaster event on a 3D mesh, not a DOM click — keyboard nav is the HUD / NavMap
        <mesh
          position={center}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = '';
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (data.onClick) onAction(data.onClick);
          }}
        >
          <sphereGeometry args={[Math.max(span * SKY.radius * 1.35, 5), 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      {hover && (
        <Billboard position={center}>
          <Html center distanceFactor={52} style={{ pointerEvents: 'none' }} zIndexRange={[8, 0]}>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: ACCENT,
                textShadow: theme === 'light' ? '0 0 10px #f4f3ee' : '0 0 12px #000'
              }}
            >
              {data.name}
            </span>
          </Html>
        </Billboard>
      )}
    </group>
  );
};

/* ----------------------------------------------------------------------- sky */
interface Props {
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  onNode: (id: string, section: string, anchor?: string) => void;
}

interface Ev {
  id: number;
  kind: Kind;
}

const Sky: React.FC<Props> = ({ theme, reducedMotion, onNode }) => {
  const flashAnchor = useRef<THREE.Group>(null);
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState<Ev[]>([]);
  const [flash, setFlash] = useState<string | null>(null);
  const nextId = useRef(1);
  const timer = useRef({ next: 3 + Math.random() * 4 });
  const flashTimer = useRef<number>();

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  const spawn = (kind: Kind, n = 1) =>
    setEvents((prev) => {
      const add: Ev[] = [];
      for (let i = 0; i < n; i++) add.push({ id: nextId.current++, kind });
      return [...prev, ...add].slice(-20);
    });
  const remove = (id: number) => setEvents((prev) => prev.filter((e) => e.id !== id));

  const doAction = (a: string) => {
    if (a.startsWith('flash:')) {
      setFlash(a.slice(6));
      window.clearTimeout(flashTimer.current);
      flashTimer.current = window.setTimeout(() => setFlash(null), 2800);
    } else if (a === 'comet') spawn('comet');
    else if (a === 'shower') for (let i = 0; i < 8; i++) window.setTimeout(() => spawn('shootingStar'), i * 170);
    else if (a.startsWith('node:')) onNode(a.slice(5), a.slice(5));
    else if (a.startsWith('url:')) window.open(a.slice(4), '_blank', 'noopener,noreferrer');
  };

  const bag = useMemo(() => {
    const w = SKY.events.weights;
    const out: Kind[] = [];
    (Object.keys(w) as Kind[]).forEach((k) => {
      for (let i = 0; i < (w[k] ?? 0); i++) out.push(k);
    });
    return out.length ? out : (['shootingStar'] as Kind[]);
  }, []);

  useFrame((state) => {
    if (flashAnchor.current) {
      const fx = atmos.tgtX - atmos.camX;
      const fy = atmos.tgtY - atmos.camY;
      const fz = atmos.tgtZ - atmos.camZ;
      const len = Math.hypot(fx, fy, fz) || 1;
      flashAnchor.current.position.set((fx / len) * 34, (fy / len) * 34 + 5, (fz / len) * 34);
    }
    if (!SKY.events.enabled || reducedMotion || !ready) return;
    if (state.clock.elapsedTime < timer.current.next) return;
    timer.current.next = state.clock.elapsedTime + rand(SKY.events.everySec);
    spawn(bag[Math.floor(Math.random() * bag.length)]);
  });

  return (
    <group>
      {ready &&
        SKY.constellations.map((c, i) => (
          <Constellation key={i} data={c} theme={theme} onAction={doAction} />
        ))}

      {events.map((e) =>
        e.kind === 'flare' ? (
          <Flare key={e.id} onDone={() => remove(e.id)} />
        ) : (
          <Streak key={e.id} kind={e.kind} onDone={() => remove(e.id)} />
        )
      )}

      <group ref={flashAnchor}>
        {flash && (
          <Billboard>
            <Html center distanceFactor={40} style={{ pointerEvents: 'none' }} zIndexRange={[9, 0]}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: ACCENT,
                  textShadow: theme === 'light' ? '0 0 12px #f4f3ee' : '0 0 16px #000'
                }}
              >
                {flash}
              </span>
            </Html>
          </Billboard>
        )}
      </group>
    </group>
  );
};

export default Sky;
