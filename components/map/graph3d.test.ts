import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '../../constants';
import { buildGraph3D } from './graph3d';

const content = TRANSLATIONS.es;

describe('buildGraph3D', () => {
  const primaryIds = ['perfil', 'proyectos', 'experiencia', 'servicios', 'contacto'];

  it('always includes the core node plus every primary section', () => {
    const { nodes } = buildGraph3D(content);
    expect(nodes.find((n) => n.id === 'core' && n.kind === 'core')).toBeDefined();
    for (const id of primaryIds) {
      expect(nodes.find((n) => n.id === id && n.kind === 'primary')).toBeDefined();
    }
  });

  it('produces no duplicate node ids', () => {
    const { nodes } = buildGraph3D(content);
    const ids = nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has every edge referencing two nodes that actually exist', () => {
    const { nodes, edges } = buildGraph3D(content);
    const ids = new Set(nodes.map((n) => n.id));
    for (const e of edges) {
      expect(ids.has(e.a)).toBe(true);
      expect(ids.has(e.b)).toBe(true);
    }
  });

  it('gives every node a finite, non-overlapping-with-core 3D position', () => {
    const { nodes } = buildGraph3D(content);
    for (const n of nodes) {
      for (const coord of n.pos) expect(Number.isFinite(coord)).toBe(true);
      if (n.id !== 'core') {
        const dist = Math.hypot(...n.pos);
        expect(dist).toBeGreaterThan(0);
      }
    }
  });

  it("gives Perfil exactly two credential satellites (Formación + Idiomas)", () => {
    const { nodes } = buildGraph3D(content);
    const credentials = nodes.filter((n) => n.variant === 'credential');
    expect(credentials.length).toBe(2);
    expect(credentials.map((n) => n.data?.credKind).sort()).toEqual(['edu', 'lang']);
  });

  it('marks proyectos satellites with the same live flags as the source content', () => {
    const { nodes } = buildGraph3D(content);
    const projectSats = nodes
      .filter((n) => n.parent === 'proyectos' && n.variant === 'project')
      .sort((a, b) => Number(a.id.split(':')[1]) - Number(b.id.split(':')[1]));
    expect(projectSats.length).toBe(content.projects.items.length);
    projectSats.forEach((n, i) => {
      const project = content.projects.items[i];
      expect(project).toBeDefined();
      expect(n.data?.live).toBe(!!project?.live);
    });
  });
});
