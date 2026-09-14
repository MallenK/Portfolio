import * as THREE from 'three';
import {
  siReact,
  siNodedotjs,
  siGit,
  siGoogleanalytics,
  siPhp,
  siMysql,
  siTypescript,
  siJavascript,
  siSymfony,
  siHtml5,
  siSass,
  siBootstrap,
  siDocker,
  siWordpress,
  siClaude,
  siVercel,
  siGooglegemini,
  siGithubcopilot,
  siHuggingface
} from 'simple-icons';

/**
 * Flagship technology per Perfil skill category (see COMMON_SKILLS in constants).
 * Category strings are not localised, so we key straight off them.
 */
export const CATEGORY_ICON: Record<string, { path: string; title: string }> = {
  Frontend: { path: siReact.path, title: siReact.title },
  Backend: { path: siNodedotjs.path, title: siNodedotjs.title },
  Tooling: { path: siGit.path, title: siGit.title },
  'Marketing & Data': { path: siGoogleanalytics.path, title: siGoogleanalytics.title }
};

export const PERFIL_CATEGORIES = Object.keys(CATEGORY_ICON);

export function iconForCategory(category: string, index = 0) {
  return CATEGORY_ICON[category] ?? Object.values(CATEGORY_ICON)[index % PERFIL_CATEGORIES.length];
}

/**
 * Every icon usable on the Perfil map — real apps, languages, frameworks and
 * tools only, no decorative marks. Keyed by the exact label shown on the node.
 */
export const SKILL_ICON: Record<string, { path: string; title: string }> = {
  HTML: { path: siHtml5.path, title: siHtml5.title },
  'CSS / SASS': { path: siSass.path, title: siSass.title },
  JavaScript: { path: siJavascript.path, title: siJavascript.title },
  TypeScript: { path: siTypescript.path, title: siTypescript.title },
  React: { path: siReact.path, title: siReact.title },
  Bootstrap: { path: siBootstrap.path, title: siBootstrap.title },
  PHP: { path: siPhp.path, title: siPhp.title },
  CodeIgniter: { path: siPhp.path, title: 'CodeIgniter' },
  Symfony: { path: siSymfony.path, title: siSymfony.title },
  'Node.js': { path: siNodedotjs.path, title: siNodedotjs.title },
  MySQL: { path: siMysql.path, title: siMysql.title },
  Git: { path: siGit.path, title: siGit.title },
  Docker: { path: siDocker.path, title: siDocker.title },
  WordPress: { path: siWordpress.path, title: siWordpress.title },
  'Google Analytics & GTM': { path: siGoogleanalytics.path, title: siGoogleanalytics.title },
  Claude: { path: siClaude.path, title: siClaude.title },
  Vercel: { path: siVercel.path, title: siVercel.title },
  'Google Gemini': { path: siGooglegemini.path, title: siGooglegemini.title },
  'GitHub Copilot': { path: siGithubcopilot.path, title: siGithubcopilot.title },
  'Hugging Face': { path: siHuggingface.path, title: siHuggingface.title }
};

export function iconForSkill(skill: string) {
  return SKILL_ICON[skill];
}

/** Inner ring — the 4 marks rotating tight against the Perfil core. */
export const PERFIL_INNER = ['PHP', 'MySQL', 'JavaScript', 'Claude'];

/** Outer ring — full-size satellites orbiting further out, deduped against
 *  PERFIL_INNER and against each other's icon graphic (e.g. CodeIgniter is
 *  skipped, it reuses the PHP mark already shown). AI tools + Vercel added
 *  alongside the core stack. */
export const PERFIL_OUTER = [
  'TypeScript',
  'React',
  'Symfony',
  'Node.js',
  'Git',
  'Google Analytics & GTM',
  'Vercel',
  'Google Gemini',
  'GitHub Copilot',
  'Hugging Face'
];

const texCache = new Map<string, THREE.Texture>();

/**
 * Render a simple-icons 24×24 path to a canvas (the browser parses the path data
 * natively, fill-rule and all) → a white-on-transparent texture, tinted by the
 * material. Cached per key. Browser-only (needs Path2D + canvas).
 */
export function iconTexture(path: string, key: string): THREE.Texture {
  const hit = texCache.get(key);
  if (hit) return hit;

  const S = 256;
  const pad = 30;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(c);
  ctx.translate(pad, pad);
  ctx.scale((S - pad * 2) / 24, (S - pad * 2) / 24);
  ctx.fillStyle = '#ffffff';
  ctx.fill(new Path2D(path));

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  texCache.set(key, tex);
  return tex;
}
