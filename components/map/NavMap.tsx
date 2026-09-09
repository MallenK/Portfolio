import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioContent } from '../../types';
import { buildGraph3D } from './graph3d';
import { atmos } from '../bg/atmos';

interface Props {
  content: PortfolioContent;
  /** section whose popup is open */
  active: string | null;
  /** node the camera is currently focused on */
  focus: string | null;
  /** fly the camera to a node */
  onFly: (id: string) => void;
}

const R = 8; // world half-extent shown (top-down x/z plan)
const SECTIONS = ['perfil', 'proyectos', 'experiencia', 'servicios', 'contacto'] as const;

/**
 * Navigation console (centre-right): a top-down plan of the map with a live
 * "where you're looking" marker + a section list. Click anything to fly there.
 */
const NavMap: React.FC<Props> = ({ content, active, focus, onFly }) => {
  const marker = useRef<SVGGElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  const graph = useMemo(() => buildGraph3D(content), [content]);
  const nodes = useMemo(() => graph.nodes.filter((n) => n.kind !== 'satellite'), [graph]);
  const edges = useMemo(
    () => graph.edges.filter((e) => nodes.some((n) => n.id === e.a) && nodes.some((n) => n.id === e.b)),
    [graph, nodes]
  );

  // live view marker driven by the shared camera state
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const g = marker.current;
      if (!g) return;
      const x = (atmos.tgtX / R) * 42 + 50;
      const y = (atmos.tgtZ / R) * 42 + 50;
      const ang = Math.atan2(atmos.camX - atmos.tgtX, atmos.camZ - atmos.tgtZ) * (180 / Math.PI);
      g.setAttribute('transform', `translate(${x} ${y}) rotate(${ang})`);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const px = (p: [number, number, number]) => (p[0] / R) * 42 + 50;
  const py = (p: [number, number, number]) => (p[2] / R) * 42 + 50;
  const lit = (n: (typeof nodes)[number]) =>
    focus === n.id || active === n.section || (n.kind === 'core' && (focus === 'core' || active === 'core'));

  return (
    <div className="pointer-events-auto absolute right-3 top-1/2 hidden -translate-y-1/2 select-none sm:block md:right-5">
      <div className="w-[150px] border border-hair bg-bg/60 p-2.5 backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-[var(--font-display)] text-[8px] font-semibold uppercase tracking-[0.22em] text-fgfaint">
            {content.ui.mapLabel}
          </span>
          <button
            onClick={() => onFly('core')}
            aria-label={content.meta.alias}
            className="grid h-4 w-4 place-items-center border border-hair text-[9px] leading-none text-fgdim transition-colors hover:border-accent hover:text-accentink"
          >
            ⌂
          </button>
        </div>

        <svg viewBox="-4 -4 108 108" className="block h-[130px] w-[130px]">
          <circle cx="50" cy="50" r="50" fill="none" stroke="var(--hair)" strokeWidth="0.6" opacity="0.5" />
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.a);
            const b = nodes.find((n) => n.id === e.b);
            if (!a || !b) return null;
            return (
              <line
                key={i}
                x1={px(a.pos)}
                y1={py(a.pos)}
                x2={px(b.pos)}
                y2={py(b.pos)}
                stroke="var(--hair)"
                strokeWidth="0.7"
              />
            );
          })}

          <g ref={marker}>
            <path d="M0 -7 L4.4 5 L0 2.6 L-4.4 5 Z" fill="var(--accent)" opacity="0.9" />
          </g>

          {nodes.map((n) => {
            const on = lit(n);
            const hot = hover === n.id || hover === n.section;
            const cx = px(n.pos);
            const cy = py(n.pos);
            const r = n.kind === 'core' ? 3.6 : 3;
            return (
              <g
                key={n.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onFly(n.id)}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                <circle cx={cx} cy={cy} r={r + 6} fill="transparent" />
                {on && <circle cx={cx} cy={cy} r={r + 2.6} fill="none" stroke="var(--accent)" strokeWidth="0.9" />}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={on || hot || n.kind === 'core' ? 'var(--accent)' : 'var(--fg)'}
                  opacity={on || hot || n.kind === 'core' ? 1 : 0.7}
                >
                  <title>{n.id === 'core' ? content.meta.alias : n.label}</title>
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex flex-col gap-[3px] border-t border-hair pt-2">
          {SECTIONS.map((s) => {
            const on = focus === s || active === s;
            return (
              <button
                key={s}
                onClick={() => onFly(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                className={`flex items-center gap-2 text-left font-[var(--font-display)] text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  on ? 'text-accentink' : 'text-fgdim hover:text-fg'
                }`}
              >
                <span
                  className="inline-block h-[3px] w-[3px] rounded-full"
                  style={{ background: on ? 'var(--accent)' : 'var(--fg-faint)' }}
                />
                {content.nav[s]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavMap;
