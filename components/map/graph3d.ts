import { PortfolioContent } from '../../types';
import { PERFIL_OUTER } from './techIcons';

export type NodeKind = 'core' | 'primary' | 'satellite';
export type PrimaryShape = 'icosa' | 'box' | 'strata' | 'burst' | 'portal';
export type SatVariant = 'project' | 'company' | 'skill' | 'service';

export interface GNode3D {
  id: string;
  kind: NodeKind;
  label: string;
  /** popup section this element opens */
  section: string;
  /** item within the section to scroll to / highlight (satellites) */
  anchor?: string;
  parent?: string;
  count?: number;
  pos: [number, number, number];
  shape?: PrimaryShape;
  variant?: SatVariant;
  data?: {
    year?: string;
    live?: boolean;
    current?: boolean;
    skillCount?: number;
    skillCategory?: string;
    /** company satellite ring size, 0 (oldest) to 1 (most recent) */
    stageScale?: number;
    image?: string;
    /** which fixed icon a 'service' satellite draws (see ServiceIcon) */
    serviceIndex?: number;
    /** per-node size multiplier so the outer ring reads as varied sizes */
    iconScale?: number;
    /** Experiencia primary only — one entry per career stage, most recent
     *  first, driving the strata rings (see StrataCluster in nodes.tsx). */
    stages?: { current: boolean; year: string }[];
    url?: string;
    action?: string;
    stackCount?: number;
  };
}

export interface GEdge3D {
  a: string;
  b: string;
}

/** direction in the x/z plan (matches the minimap) + a distinct height per section */
/** even pentagon in the x/z plan + a distinct height per section */
const PRIMARY: Record<string, { dir: [number, number]; y: number; shape: PrimaryShape }> = {
  perfil: { dir: [-0.95, -0.31], y: 1.1, shape: 'icosa' },
  contacto: { dir: [0.0, -1.0], y: 2.4, shape: 'portal' },
  proyectos: { dir: [0.95, -0.31], y: -0.7, shape: 'box' },
  experiencia: { dir: [0.59, 0.81], y: 1.7, shape: 'strata' },
  servicios: { dir: [-0.59, 0.81], y: -1.5, shape: 'burst' }
};
const S = 6.4;

function rng(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  return (h % 100000) / 100000;
}

export function buildGraph3D(c: PortfolioContent) {
  const nodes: GNode3D[] = [];
  const edges: GEdge3D[] = [];

  nodes.push({
    id: 'core',
    kind: 'core',
    label: c.meta.alias,
    section: 'core',
    pos: [0, 0, 0]
  });

  const sats = (
    pid: string,
    variant: SatVariant,
    items: { label: string; anchor: string; data: GNode3D['data']; distScale?: number; yOverride?: number }[],
    distMul = 1
  ) => {
    const p = nodes.find((n) => n.id === pid)!;
    const [px, py, pz] = p.pos;
    // fan around the parent, biased outward from the core, with real 3D volume
    const outward = Math.atan2(pz, px);
    const spread = Math.min(1.5, 0.65 + items.length * 0.15);
    items.forEach((it, i) => {
      const t = items.length === 1 ? 0 : i / (items.length - 1) - 0.5;
      const a = outward + t * spread;
      const dist = (1.45 + (i % 2) * 0.5 + rng(pid + i) * 0.45) * distMul * (it.distScale ?? 1);
      const id = `${pid}:${i}`;
      nodes.push({
        id,
        kind: 'satellite',
        label: it.label,
        section: pid,
        anchor: it.anchor,
        parent: pid,
        variant,
        data: it.data,
        pos: [
          px + Math.cos(a) * dist,
          py + (it.yOverride ?? (rng(id + 'y') - 0.5) * 2.6),
          pz + Math.sin(a) * dist + (rng(id + 'z') - 0.5) * 1.4
        ]
      });
      edges.push({ a: pid, b: id });
    });
  };

  (
    [
      ['perfil', c.nav.perfil, c.about.skills.length],
      ['proyectos', c.nav.proyectos, c.projects.items.length],
      ['experiencia', c.nav.experiencia, c.experience.items.length],
      ['servicios', c.nav.servicios, c.services.items.length],
      ['contacto', c.nav.contacto, 0]
    ] as [string, string, number][]
  ).forEach(([id, label, count]) => {
    const conf = PRIMARY[id];
    nodes.push({
      id,
      kind: 'primary',
      label,
      section: id,
      count: count || undefined,
      shape: conf.shape,
      pos: [conf.dir[0] * S, conf.y, conf.dir[1] * S],
      data:
        id === 'experiencia'
          ? { stages: c.experience.items.map((e, i) => ({ current: i === 0, year: e.period })) }
          : undefined
    });
    edges.push({ a: 'core', b: id });
  });

  // ---- children (contacto is a leaf: no satellites) ----
  // Perfil's outer ring: the curated PERFIL_OUTER list (already deduped and
  // clear of the 4 inner-ring marks — see techIcons.ts). Every satellite is
  // the same size (SAT_ICON_SIZE, in nodes.tsx) — hierarchy here comes from
  // distance instead: PERFIL_OUTER is ordered core-stack-first, so the core
  // stack (TypeScript, React, Symfony, Node.js, Git…) sits closer and the
  // extras (AI tools, Vercel) sit further out, nearest to furthest in order.
  const categoryOf = new Map<string, string>();
  c.about.skills.forEach((g) => g.skills.forEach((s) => categoryOf.set(s, g.category)));
  const perfilTechs = PERFIL_OUTER.map((label, i) => ({
    label,
    anchor: categoryOf.get(label) ?? 'perfil',
    data: { skillCategory: categoryOf.get(label) },
    distScale: 0.8 + (i / Math.max(1, PERFIL_OUTER.length - 1)) * 0.9
  }));
  sats('perfil', 'skill', perfilTechs, 1.7);
  sats(
    'proyectos',
    'project',
    c.projects.items.map((p) => ({
      label: p.title,
      anchor: p.id,
      data: { year: p.year, live: p.live, url: p.url, stackCount: p.stack.length, image: p.image }
    })),
    1.7
  );
  // Experiencia's satellites line up with the primary's own strata rings
  // (see StrataCluster in nodes.tsx) — the most recent role sits highest,
  // matching its ring, and each older stage steps down in the same order.
  sats(
    'experiencia',
    'company',
    c.experience.items.map((e, i) => {
      const t = c.experience.items.length === 1 ? 0 : i / (c.experience.items.length - 1);
      return {
        label: e.company,
        anchor: e.id,
        // stageScale: 1 = most recent (i=0, biggest ring), 0 = oldest
        data: { year: e.period, current: i === 0, stageScale: 1 - t },
        yOverride: (0.5 - t) * 2.2
      };
    }),
    1.7
  );
  sats(
    'servicios',
    'service',
    c.services.items.map((sv, i) => ({
      label: sv.title,
      anchor: String(i),
      data: { url: sv.url, action: sv.action, serviceIndex: i }
    })),
    1.7
  );

  return { nodes, edges };
}
