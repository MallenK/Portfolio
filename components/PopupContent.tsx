import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PortfolioContent } from '../types';
import { SOCIAL_LINKS } from '../constants';
import { Reveal, useCopy } from './ui';
import ShinyText from './reactbits/ShinyText';

interface Props {
  nodeId: string;
  anchor: string | null;
  content: PortfolioContent;
  onNavigate: (id: string) => void;
}

const NODES = ['perfil', 'proyectos', 'experiencia', 'servicios', 'contacto'] as const;

/* ---------------- core / manifiesto ---------------- */
const Core: React.FC<Props> = ({ content, onNavigate }) => (
  <div className="space-y-8">
    <Reveal>
      <p className="max-w-[46ch] text-[clamp(1.15rem,3.6vw,1.6rem)] font-medium leading-[1.4] text-fg">
        {content.meta.statement}
      </p>
    </Reveal>
    <Reveal delay={100}>
      <ul className="border-t border-hair">
        {NODES.map((id, i) => (
          <li key={id}>
            <button
              onClick={() => onNavigate(id)}
              className="group flex w-full items-baseline justify-between border-b border-hair py-4 text-left"
            >
              <span className="font-[var(--font-display)] text-lg font-semibold uppercase tracking-[0.06em] text-fg transition-colors group-hover:text-accentink">
                {content.nav[id]}
              </span>
              <span className="tag-n">{String(i + 1).padStart(2, '0')}</span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  </div>
);

/* ---------------- perfil ---------------- */
const Perfil: React.FC<Props> = ({ content }) => {
  const a = content.about;
  return (
    <div className="space-y-8">
      <Reveal>
        <p className="max-w-[44ch] text-[clamp(1.15rem,3.6vw,1.55rem)] font-medium leading-[1.35] text-fg">
          {a.lead}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <p className="max-w-[56ch] text-[14.5px] leading-[1.75] text-fgdim">{a.body}</p>
      </Reveal>
      <Reveal delay={160}>
        <div className="border-t border-hair">
          {a.skills.map((g) => (
            <div
              key={g.category}
              data-anchor={g.category}
              className="grid gap-1.5 border-b border-hair px-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
            >
              <span className="font-[var(--font-display)] text-[12px] font-semibold uppercase tracking-[0.12em] text-fg">
                {g.category}
              </span>
              <span className="text-[13px] leading-relaxed text-fgdim">{g.skills.join('  ·  ')}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

/* ---------------- proyectos ---------------- */
const Proyectos: React.FC<Props> = ({ content }) => {
  const { projects, ui } = content;
  return (
    <div>
      <Reveal>
        <p className="mb-8 max-w-[40ch] text-[15px] leading-relaxed text-fgdim">{projects.title}</p>
      </Reveal>
      <div className="border-t border-hair">
        {projects.items.map((p, i) => (
          <Reveal key={p.id} delay={i * 50}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-anchor={p.id}
              className="group block border-b border-hair px-2 py-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="tag-n">{p.id}</span>
                <h3 className="font-[var(--font-display)] text-[clamp(1.15rem,4vw,1.5rem)] font-semibold leading-tight text-fg transition-colors group-hover:text-accentink">
                  {p.title}
                </h3>
                {p.live && (
                  <span className="flex items-center gap-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.16em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <ShinyText text={ui.live} color="#b58b00" shineColor="#fde100" speed={3.2} />
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-[var(--font-display)] text-[11px] font-medium uppercase tracking-[0.14em] text-fgdim">
                {p.category} · {p.year} · {ui.roleLabel} {p.role}
              </p>
              <p className="mt-3 max-w-[58ch] text-[13.5px] leading-relaxed text-fgdim">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-[var(--font-display)] text-[10px] font-medium uppercase tracking-[0.1em] text-fgfaint">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

/* ---------------- experiencia ---------------- */
const Experiencia: React.FC<Props> = ({ content }) => {
  const { experience } = content;
  return (
    <div>
      <Reveal>
        <p className="mb-8 max-w-[40ch] text-[15px] leading-relaxed text-fgdim">{experience.title}</p>
      </Reveal>
      <ol className="border-t border-hair">
        {experience.items.map((e, i) => (
          <Reveal key={e.id} as="li" delay={i * 50}>
            <div
              data-anchor={e.id}
              className="grid gap-3 border-b border-hair px-2 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8"
            >
              <span className="tag-n">{e.period}</span>
              <div>
                <h3 className="font-[var(--font-display)] text-[15px] font-semibold text-fg">
                  {e.role} <span className="text-fgdim">· {e.company}</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {e.achievements.map((x, k) => (
                    <li key={k} className="flex gap-2.5 text-[13px] leading-relaxed text-fgdim">
                      <span className="mt-1 select-none text-[10px] text-accentink">—</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
};

/* ---------------- servicios ---------------- */
const Servicios: React.FC<Props> = ({ content }) => {
  const { services } = content;
  return (
    <div>
      <Reveal>
        <p className="mb-8 max-w-[40ch] text-[15px] leading-relaxed text-fgdim">{services.title}</p>
      </Reveal>
      <div className="border-t border-hair">
        {services.items.map((s, i) => {
          const num = String(i + 1).padStart(2, '0');
          const interactive = Boolean(s.url || s.action);
          const inner = (
            <>
              <span className="tag-n pt-0.5">{num}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2.5">
                  <span className="font-[var(--font-display)] text-[15px] font-semibold text-fg transition-colors group-hover:text-accentink">
                    {s.title}
                  </span>
                  {interactive && (
                    <span className="text-[13px] text-fgfaint transition-all group-hover:translate-x-1 group-hover:text-accentink">
                      →
                    </span>
                  )}
                </span>
                <span className="mt-1 block max-w-[52ch] text-[13px] leading-relaxed text-fgdim">
                  {s.desc}
                </span>
              </span>
            </>
          );
          const cls = 'group flex w-full items-start gap-4 border-b border-hair px-2 py-5 text-left';
          return (
            <Reveal key={s.title} delay={i * 45}>
              {s.url ? (
                <a data-anchor={String(i)} className={cls} href={s.url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div data-anchor={String(i)} className={cls.replace('group ', '')}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------- contacto ---------------- */
type Status = 'idle' | 'sending' | 'sent' | 'error';
const SOCIALS = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp }
];

const Field: React.FC<{
  name: string;
  label: string;
  type?: string;
  area?: boolean;
  max?: number;
  onValue?: (v: string) => void;
}> = ({ name, label, type = 'text', area, max, onValue }) => {
  const base =
    'peer w-full bg-transparent pt-6 text-[15px] leading-normal text-fg outline-none focus-visible:outline-none placeholder-transparent';
  const move = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onValue?.(e.target.value);
  return (
    <label className="relative block">
      {area ? (
        <textarea
          name={name}
          required
          rows={4}
          maxLength={max}
          placeholder={label}
          onChange={move}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={label}
          onChange={move}
          className={base}
        />
      )}
      <span
        className="pointer-events-none absolute left-0 top-1 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.2em] text-fgdim transition-all duration-200
          peer-placeholder-shown:top-6 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-fgfaint
          peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accentink"
      >
        {label}
      </span>
      <span className="mt-2 block h-px w-full bg-hair" />
      <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
    </label>
  );
};

const MSG_MAX = 600;

const Contacto: React.FC<Props> = ({ content }) => {
  const { contact, ui, meta } = content;
  const [status, setStatus] = useState<Status>('idle');
  const [msgLen, setMsgLen] = useState(0);
  const { copied, copy } = useCopy();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    setStatus('sending');
    emailjs
      .send(
        'service_cilgouv',
        'template_7vb1edf',
        {
          name: (form.elements.namedItem('name') as HTMLInputElement).value,
          email: (form.elements.namedItem('email') as HTMLInputElement).value,
          message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
          date: new Date().toLocaleString()
        },
        'iGpB097zxE-0bBxRC'
      )
      .then(() => {
        setStatus('sent');
        setMsgLen(0);
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setStatus('error');
      });
  };

  return (
    <div className="flex flex-col gap-9">
      {/* ---- reach me directly ---- */}
      <div className="flex flex-col gap-7">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.2em] text-fgdim">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {contact.directLabel}
          </span>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-fgdim">{contact.line}</p>
        </Reveal>

        <Reveal delay={70}>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="block break-words text-[15px] leading-tight text-fg transition-colors hover:text-accentink sm:text-[17px]"
          >
            <ShinyText text={SOCIAL_LINKS.email} color="#8a8a8a" shineColor="#fde100" speed={4} />
          </a>
          <button
            onClick={() => copy(SOCIAL_LINKS.email)}
            className="mt-3 inline-flex items-center gap-2 border border-hair px-3 py-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.18em] text-fgdim transition-colors hover:border-accent hover:text-accentink"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              {copied ? (
                <path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <rect x="3.2" y="3.2" width="6.3" height="6.3" rx="1" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M2.5 8V2.5A.5.5 0 013 2h4.5" stroke="currentColor" strokeWidth="1.1" />
                </>
              )}
            </svg>
            {copied ? ui.copied : ui.copy}
          </button>
        </Reveal>

        <Reveal delay={120}>
          <p className="tag">{contact.socialLabel}</p>
          <div className="mt-3 flex flex-col">
            {SOCIALS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between py-2.5 text-[14px] text-fgdim transition-colors hover:text-fg ${
                  i ? 'border-t border-hair' : ''
                }`}
              >
                {s.label}
                <span className="text-fgfaint transition-all group-hover:translate-x-0.5 group-hover:text-accentink">→</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---- the form, as a defined surface ---- */}
      <Reveal delay={90}>
        <div className="relative border border-hair bg-bg2/70 p-5 backdrop-blur-sm sm:p-6">
          <span className="absolute inset-x-0 top-0 h-px bg-accent/40" />

          {status === 'sent' ? (
            <div className="flex flex-col items-start gap-4 py-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-black">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M3.5 9.5l3.5 3.5L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-[16px] font-medium text-fg">{ui.sent}</p>
              <p className="text-[13px] text-fgdim">{contact.line}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-1 inline-flex items-center gap-1.5 font-[var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.2em] text-fgdim transition-colors hover:text-accentink"
              >
                <span aria-hidden>↺</span> {ui.send}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form flex flex-col gap-6">
              <p className="text-[15px] font-medium leading-snug text-fg">{contact.title}</p>
              <Field name="name" label={contact.formName} />
              <Field name="email" label={contact.formEmail} type="email" />
              <div>
                <Field name="message" label={contact.formIdea} area max={MSG_MAX} onValue={(v) => setMsgLen(v.length)} />
                <span className="tnum mt-1.5 block text-right text-[10px] tracking-wide text-fgfaint">
                  {msgLen}/{MSG_MAX}
                </span>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden border border-fg py-3.5 font-[var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.24em] text-fg transition-colors hover:border-accent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative">{status === 'sending' ? ui.sending : ui.send}</span>
                <svg className="relative transition-transform group-hover:translate-x-1" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {status === 'error' && (
                <p role="status" className="text-[13px] text-[#e0857a]">
                  {ui.error}
                </p>
              )}
            </form>
          )}
        </div>
      </Reveal>

      <div className="flex flex-col gap-1 border-t border-hair pt-6 font-[var(--font-display)] text-[10px] font-medium uppercase tracking-[0.2em] text-fgfaint sm:flex-row sm:justify-between sm:gap-4">
        <span>{meta.name} © 2026</span>
        <span>{contact.footerLoc}</span>
        <span>{contact.footerRole}</span>
      </div>
    </div>
  );
};

const Body: React.FC<Props> = (props) => {
  switch (props.nodeId) {
    case 'core':
      return <Core {...props} />;
    case 'perfil':
      return <Perfil {...props} />;
    case 'proyectos':
      return <Proyectos {...props} />;
    case 'experiencia':
      return <Experiencia {...props} />;
    case 'servicios':
      return <Servicios {...props} />;
    case 'contacto':
      return <Contacto {...props} />;
    default:
      return null;
  }
};

const PopupContent: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!props.anchor) return;
    const sel = `[data-anchor="${(window as any).CSS?.escape ? CSS.escape(props.anchor) : props.anchor}"]`;
    const t = setTimeout(() => {
      const el = ref.current?.querySelector(sel) as HTMLElement | null;
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('anchor-hit');
      setTimeout(() => el.classList.remove('anchor-hit'), 2200);
    }, 420);
    return () => clearTimeout(t);
  }, [props.anchor, props.nodeId]);

  return (
    <div ref={ref}>
      <Body {...props} />
    </div>
  );
};

export default PopupContent;
