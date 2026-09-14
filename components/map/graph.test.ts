import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '../../constants';
import { buildGraph } from './graph';

const content = TRANSLATIONS.es;

describe('buildGraph', () => {
  const primaryIds = ['perfil', 'proyectos', 'experiencia', 'servicios', 'contacto'];

  it('always includes the core node plus every primary section', () => {
    const { nodes } = buildGraph(content, false);
    expect(nodes.find((n) => n.id === 'core')).toBeDefined();
    for (const id of primaryIds) {
      expect(nodes.find((n) => n.id === id && n.kind === 'primary')).toBeDefined();
    }
  });

  it('produces no duplicate node ids', () => {
    const { nodes } = buildGraph(content, false);
    const ids = nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has every edge referencing two nodes that actually exist', () => {
    const { nodes, edges } = buildGraph(content, false);
    const ids = new Set(nodes.map((n) => n.id));
    for (const e of edges) {
      expect(ids.has(e.a)).toBe(true);
      expect(ids.has(e.b)).toBe(true);
    }
  });

  it('connects the core to every primary, and every satellite to its parent primary', () => {
    const { edges } = buildGraph(content, false);
    for (const id of primaryIds) {
      expect(edges.some((e) => e.a === 'core' && e.b === id)).toBe(true);
    }
    const satelliteEdges = edges.filter((e) => e.b.includes(':'));
    for (const e of satelliteEdges) {
      const parentId = e.b.split(':')[0];
      expect(e.a).toBe(parentId);
    }
  });

  it('caps satellite counts in "small" mode without dropping any primary', () => {
    const full = buildGraph(content, false);
    const small = buildGraph(content, true);
    expect(small.nodes.length).toBeLessThanOrEqual(full.nodes.length);
    for (const id of primaryIds) {
      expect(small.nodes.find((n) => n.id === id)).toBeDefined();
    }
  });

  it('mirrors the real project/experience counts in full (non-small) mode', () => {
    const { nodes } = buildGraph(content, false);
    const proyectosSats = nodes.filter((n) => n.parent === 'proyectos');
    const experienciaSats = nodes.filter((n) => n.parent === 'experiencia');
    expect(proyectosSats.length).toBe(content.projects.items.length);
    expect(experienciaSats.length).toBe(content.experience.items.length);
  });

  it('caps project/experience satellites to 4 in small mode', () => {
    const { nodes } = buildGraph(content, true);
    const proyectosSats = nodes.filter((n) => n.parent === 'proyectos');
    const experienciaSats = nodes.filter((n) => n.parent === 'experiencia');
    expect(proyectosSats.length).toBe(Math.min(4, content.projects.items.length));
    expect(experienciaSats.length).toBe(Math.min(4, content.experience.items.length));
  });
});
