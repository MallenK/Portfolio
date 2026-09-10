import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioContent } from '../types';
import { SOCIAL_LINKS } from '../constants';

type Lang = 'es' | 'en' | 'cat';

interface Props {
  open: boolean;
  lang: Lang;
  content: PortfolioContent;
  onClose: () => void;
}

const T: Record<Lang, { download: string; print: string; close: string; heading: string; contact: string }> = {
  es: { download: 'Descargar PDF', print: 'Imprimir', close: 'Cerrar', heading: 'Vista rápida', contact: 'Contacto' },
  cat: { download: 'Descarregar PDF', print: 'Imprimir', close: 'Tancar', heading: 'Vista ràpida', contact: 'Contacte' },
  en: { download: 'Download PDF', print: 'Print', close: 'Close', heading: 'Quick view', contact: 'Contact' }
};

const Rule = () => <span className="cv-rule mt-2 mb-6 block h-px w-full bg-hair" />;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="cv-ink font-[var(--font-display)] text-[11px] font-bold uppercase tracking-[0.3em] text-fgdim">
    {children}
  </h2>
);

const CVView: React.FC<Props> = ({ open, lang, content, onClose }) => {
  const t = T[lang];
  const { meta, about, projects, experience, services, nav, ui } = content;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const pdf = `${import.meta.env.BASE_URL}cv.pdf`;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="cv-portal fixed inset-0 z-[10001] bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* toolbar — never prints */}
          <div className="cv-no-print pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-4 sm:p-6">
            <span className="font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.24em] text-fgfaint [text-shadow:0_0_12px_var(--bg)]">
              {nav.cv} · {t.heading}
            </span>
            <div className="pointer-events-auto flex items-center gap-2">
              <a
                href={pdf}
                download="Sergi_Mallen_CV.pdf"
                className="border border-hair bg-bg/70 px-3 py-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.16em] text-fgdim backdrop-blur-sm transition-colors hover:border-accent hover:text-accentink"
              >
                {t.download}
              </a>
              <button type="button"
                onClick={() => window.print()}
                className="border border-hair bg-bg/70 px-3 py-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.16em] text-fgdim backdrop-blur-sm transition-colors hover:border-accent hover:text-accentink"
              >
                {t.print}
              </button>
              <button type="button"
                onClick={onClose}
                className="flex items-center gap-2 border border-hair bg-bg/70 px-3 py-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.16em] text-fgdim backdrop-blur-sm transition-colors hover:border-accent hover:text-accentink"
              >
                {t.close}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="cv-scroll h-full overflow-y-auto">
            <article className="cv-sheet mx-auto max-w-[820px] px-6 pb-24 pt-20 sm:px-10">
              {/* ---- header ---- */}
              <header className="cv-section">
                <p className="font-[var(--font-display)] text-[11px] font-bold uppercase tracking-[0.34em] text-fgdim">
                  {meta.alias}
                </p>
                <h1 className="cv-ink mt-1 font-[var(--font-display)] text-[clamp(2rem,7vw,3.1rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-fg">
                  {meta.name}
                </h1>
                <p className="cv-ink mt-2 font-[var(--font-display)] text-[13px] font-semibold uppercase tracking-[0.14em] text-accentink">
                  {meta.role}
                </p>
                <p className="cv-dim mt-1 text-[13.5px] text-fgdim">{meta.tagline}</p>
                <p className="cv-dim mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-fgdim">
                  <span>{meta.location}</span>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-accentink">{SOCIAL_LINKS.email}</a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accentink">LinkedIn</a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-accentink">GitHub</a>
                </p>
              </header>

              <Rule />

              {/* ---- perfil ---- */}
              <section>
                <SectionTitle>{nav.perfil}</SectionTitle>
                <p className="cv-ink mt-3 max-w-[68ch] text-[14px] leading-[1.6] text-fg">{meta.statement}</p>
                <p className="cv-dim mt-3 max-w-[68ch] text-[13px] leading-[1.7] text-fgdim">{about.body}</p>
                <div className="mt-4 grid gap-1.5">
                  {about.skills.map((g) => (
                    <div key={g.category} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
                      <span className="cv-ink font-[var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.12em] text-fg">
                        {g.category}
                      </span>
                      <span className="cv-dim text-[12.5px] text-fgdim">{g.skills.join('  ·  ')}</span>
                    </div>
                  ))}
                </div>
              </section>

              <Rule />

              {/* ---- proyectos ---- */}
              <section>
                <SectionTitle>{nav.proyectos}</SectionTitle>
                <p className="cv-dim mt-2 text-[12.5px] text-fgdim">{projects.title}</p>
                <div className="mt-4 space-y-5">
                  {projects.items.map((p) => (
                    <div key={p.id} className="cv-section">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="cv-ink font-[var(--font-display)] text-[15px] font-bold text-fg">{p.title}</h3>
                        <span className="cv-dim text-[12px] text-fgdim">
                          {p.category} · {p.year}
                          {p.live ? ` · ${ui.live}` : ''}
                        </span>
                      </div>
                      <p className="cv-dim mt-1 max-w-[68ch] text-[12.5px] leading-[1.6] text-fgdim">{p.description}</p>
                      {p.highlights && p.highlights.length > 0 && (
                        <ul className="mt-1.5 max-w-[68ch] list-disc space-y-1 pl-5">
                          {p.highlights.map((h, k) => (
                            <li key={k} className="cv-dim text-[12px] leading-[1.55] text-fgdim">{h}</li>
                          ))}
                        </ul>
                      )}
                      <p className="cv-dim mt-1.5 text-[11px] uppercase tracking-[0.08em] text-fgfaint">
                        {p.stack.join(' · ')}
                        {p.url ? (
                          <>
                            {'  ·  '}
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-accentink">
                              {p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                            </a>
                          </>
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <Rule />

              {/* ---- experiencia ---- */}
              <section>
                <SectionTitle>{nav.experiencia}</SectionTitle>
                <div className="mt-4 space-y-4">
                  {experience.items.map((e) => (
                    <div key={e.id} className="cv-section grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                      <span className="cv-dim font-[var(--font-display)] text-[11px] font-semibold tracking-[0.06em] text-fgfaint">
                        {e.period}
                      </span>
                      <div>
                        <h3 className="cv-ink font-[var(--font-display)] text-[14px] font-bold text-fg">
                          {e.role} <span className="cv-dim font-medium text-fgdim">· {e.company}</span>
                        </h3>
                        <ul className="mt-1.5 list-disc space-y-1 pl-5">
                          {e.achievements.map((x, k) => (
                            <li key={k} className="cv-dim text-[12px] leading-[1.55] text-fgdim">{x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Rule />

              {/* ---- formación + idiomas ---- */}
              <section>
                <SectionTitle>{about.educationTag}</SectionTitle>
                <div className="mt-3 space-y-2.5">
                  {about.education.map((ed, i) => (
                    <div key={i} className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-5">
                      <span className="cv-dim font-[var(--font-display)] text-[11px] font-semibold tracking-[0.06em] text-fgfaint">
                        {ed.period}
                      </span>
                      <span className="cv-ink text-[12.5px] text-fg">
                        {ed.title}
                        <span className="cv-dim block text-[11.5px] text-fgdim">{ed.org}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="cv-ink mt-5 font-[var(--font-display)] text-[11px] font-bold uppercase tracking-[0.2em] text-fgdim">
                  {about.languagesTag}
                </p>
                <p className="cv-dim mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-fgdim">
                  {about.languages.map((l, i) => (
                    <span key={i}>
                      <span className="cv-ink text-fg">{l.name}</span> · {l.level}
                    </span>
                  ))}
                </p>
              </section>

              <Rule />

              {/* ---- servicios ---- */}
              <section>
                <SectionTitle>{nav.servicios}</SectionTitle>
                <ul className="mt-3 space-y-2">
                  {services.items.map((s) => (
                    <li key={s.title} className="cv-dim text-[12.5px] leading-[1.55] text-fgdim">
                      <span className="cv-ink font-semibold text-fg">{s.title}.</span> {s.desc}
                    </li>
                  ))}
                </ul>
              </section>

              <Rule />

              {/* ---- contacto ---- */}
              <section>
                <SectionTitle>{t.contact}</SectionTitle>
                <p className="cv-dim mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-fgdim">
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-accentink">{SOCIAL_LINKS.email}</a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accentink">
                    {SOCIAL_LINKS.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-accentink">
                    {SOCIAL_LINKS.github.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </p>
                <p className="cv-dim mt-4 text-[10px] uppercase tracking-[0.2em] text-fgfaint">
                  {meta.name} · {meta.location}
                </p>
              </section>
            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CVView;
