<div align="center">

<img width="1200" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Sergi Mallén — "MallenK"
### Full Stack Developer · Barcelona

[🌐 Live Portfolio](https://mallenk.github.io/Portfolio/) · [💼 LinkedIn](https://www.linkedin.com/in/sergi-mallen) · [🐙 GitHub](https://github.com/MallenK)

[![CI](https://github.com/MallenK/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/MallenK/Portfolio/actions/workflows/ci.yml)

</div>

---

## 🚀 About This Project

This is my personal portfolio: a one-page, trilingual (ES / CAT / EN) site built around a custom 3D "galaxy" node-map instead of a standard scroll layout — sections (Perfil, Proyectos, Experiencia, Servicios, Contacto) are nodes you navigate in 3D space, with a fast "vista rápida" CV view for anyone who'd rather skip the visuals.

It's real, shipped work: every project linked from the site is a live client project I built, not a demo or a template.

---

## 🧠 Tech Stack

**Core**
React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS v4

**3D / Visuals**
Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing · `vgpu` (WebGPU background) · `ogl` (WebGL fallback)

**Animation**
GSAP (ScrollTrigger) · Framer Motion

**Other**
EmailJS (contact form) · Biome (lint) · `gh-pages` (deploy)

---

## ⚙️ Run Locally

```bash
npm install
npm run dev
```

No environment variables are required — this is a static client-side app with no backend.

---

## 📦 Build & Deploy

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # biome lint .
npm run build        # vite build
npm run deploy       # gh-pages -d dist
```

Deployed to GitHub Pages at [mallenk.github.io/Portfolio](https://mallenk.github.io/Portfolio/) (project-page subpath, configured via `base` in `vite.config.ts`).

---

## 📁 Project Structure

```
components/
 ├── bg/        3D/WebGPU background system
 ├── map/       the 3D node-map (scene, graph data, nodes, nav, sky)
 ├── reactbits/ small animation/visual utilities
 ├── CVView.tsx print/PDF-style "vista rápida" CV
 └── Popup*.tsx node detail popups
hooks/          app state, dev console, sound engine
context/        cheat-mode context (easter eggs)
constants.tsx   all copy, trilingual (TRANSLATIONS: es/cat/en)
types.ts        PortfolioContent type — shape of all site content
scripts/        manual visual-QA tooling (Puppeteer screenshots)
```

All content (projects, experience, services, copy) lives in `constants.tsx`, typed by `types.ts`. The three locales ship together and are switched client-side.

---

## 🎯 Development Philosophy

- Real facts only — every project, employer, and metric shown is verifiable, nothing invented for effect.
- Strict TypeScript, zero lint findings, CI-checked on every push.
- The site itself is the work sample.

---

<div align="center">

### Built with precision. Designed for impact.

</div>
