import type React from 'react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioContent } from '../types';
import { useMediaQuery } from '../hooks/useApp';
import PopupContent from './PopupContent';
import AnimatedContent from './reactbits/AnimatedContent';

interface Props {
  nodeId: string | null;
  anchor: string | null;
  content: PortfolioContent;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const titleFor = (id: string, c: PortfolioContent) => {
  switch (id) {
    case 'core':
      return c.ui.indexTitle;
    case 'perfil':
      return c.nav.perfil;
    case 'proyectos':
      return c.nav.proyectos;
    case 'experiencia':
      return c.nav.experiencia;
    case 'servicios':
      return c.nav.servicios;
    case 'contacto':
      return c.nav.contacto;
    default:
      return '';
  }
};

const NUM: Record<string, string> = {
  core: '00',
  perfil: '01',
  proyectos: '02',
  experiencia: '03',
  servicios: '04',
  contacto: '05'
};

const Popup: React.FC<Props> = ({ nodeId, anchor, content, onClose, onNavigate }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  // ≥ lg: node info opens as a right-hand panel and the galaxy shifts left.
  // below that: keep the emergent popup.
  const split = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!nodeId) return;
    document.body.classList.add('popup-open');
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      document.body.classList.remove('popup-open');
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [nodeId, onClose]);

  return (
    <AnimatePresence>
      {nodeId && (
        <motion.div
          className="fixed z-[10000] flex inset-0 items-end justify-center sm:items-center sm:p-6 lg:left-auto lg:right-0 lg:w-[var(--panel-w)] lg:items-stretch lg:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* scrim only for the emergent popup — in split mode the galaxy stays live */}
          <button type="button"
            aria-label={content.ui.close}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-[3px] lg:hidden"
          />

          {/* biome-ignore lint/a11y/useSemanticElements: ARIA APG dialog pattern — native <dialog> conflicts with framer-motion exit + the split (non-modal) mode */}
          <motion.div role="dialog"
            ref={panelRef}
            aria-modal={split ? undefined : true}
            aria-label={titleFor(nodeId, content)}
            tabIndex={-1}
            initial={split ? { x: '100%' } : { y: 40, opacity: 0.6 }}
            animate={split ? { x: 0 } : { y: 0, opacity: 1 }}
            exit={split ? { x: '100%' } : { y: 30, opacity: 0 }}
            transition={
              split
                ? { type: 'spring', stiffness: 260, damping: 34 }
                : { type: 'spring', stiffness: 320, damping: 32 }
            }
            className="relative flex max-h-[92svh] w-full flex-col border border-hair bg-bg outline-none sm:max-h-[85vh] sm:max-w-2xl lg:h-full lg:max-h-none lg:max-w-none lg:border-y-0 lg:border-r-0 lg:border-l lg:shadow-[-24px_0_60px_-30px_rgba(0,0,0,0.55)]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-hair px-5 py-4 sm:px-8 sm:py-6">
              <div className="flex items-baseline gap-3">
                <span className="tag-n">{NUM[nodeId]}</span>
                <span className="tag">{titleFor(nodeId, content)}</span>
              </div>
              <button type="button"
                onClick={onClose}
                className="-mr-1 -mt-1 flex items-center gap-2 p-1 font-[var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.2em] text-fgdim transition-colors hover:text-accentink"
              >
                {content.ui.close}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <AnimatedContent distance={24} duration={0.55} className="px-5 py-7 sm:px-8 sm:py-9">
                <PopupContent
                  nodeId={nodeId}
                  anchor={anchor}
                  content={content}
                  onNavigate={onNavigate}
                />
              </AnimatedContent>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
