
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioContent } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['projects'];
}

const Projects: React.FC<Props> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Log global de cambio de tarjeta activa
  useEffect(() => {
    if (activeCardId) {
      console.log(`%c[Projects Story] Focus on: ${activeCardId}`, 'background: #F5C400; color: #000; font-weight: bold; padding: 2px 4px;');
    }
  }, [activeCardId]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    // --- CONTEXTO GSAP GESTIONADO POR MATCHMEDIA ---
    mm.add({
      // CONDICIÓN DESKTOP: Pantalla ancha Y altura suficiente (evita landscape móvil roto)
      isDesktop: "(min-width: 769px) and (min-height: 501px)",
      // CONDICIÓN MÓVIL/TABLET/LANDSCAPE: Todo lo demás
      isMobile: "(max-width: 768px), (max-height: 500px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean };

      if (isDesktop) {
        // ============================================================
        // LÓGICA DESKTOP (APPLE STYLE - PINNED) - INTACTA
        // ============================================================
        
        // 1. Configuración Inicial (Stacking Style)
        gsap.set(containerRef.current, {
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        });

        gsap.set(cards, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          y: 60,
          scale: 0.95,
          pointerEvents: "none", // ← CLAVE
          zIndex: (i) => i + 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        });

        // 2. Timeline Maestro
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${window.innerHeight * (totalCards + 2)}`,
            scrub: 1,
            anticipatePin: 1,
            onLeave: () => {
               console.log('[Projects] Desktop Apple-style END — entering Experience clean');
            }
          }
        });

        // A. Transición Entrada Desktop
        tl.fromTo(containerRef.current,
          { opacity: 0.95, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

        // 3. Secuencia Cards Desktop
        cards.forEach((card, index) => {
          const projectId = content.items[index].id;
            tl.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 1,
              ease: "power3.out",
              onStart: () => setActiveCardId(projectId)
            });
          tl.to(card, { duration: 0.5 }); // Hold
          tl.to(card, { y: -40, opacity: 0, scale: 0.98, duration: 1, ease: "power2.in" });
        });

        // B. Transición Salida Desktop
        tl.to(containerRef.current, {
          opacity: 0.95, y: -20, duration: 0.5, ease: 'power2.in'
        });

      } else if (isMobile) {
        // ============================================================
        // LÓGICA MÓVIL (VERTICAL SCROLL - SIN PIN) - OPTIMIZADA
        // ============================================================
        
        console.log('[Projects] Mobile/Landscape Mode Active: Pinning Disabled');

        // 1. Reset Container para flujo natural
        gsap.set(containerRef.current, {
          height: 'auto',
          display: 'block',
          position: 'relative',
          paddingBottom: '100px' // Espacio final
        });

        // 2. Reset Cards para lista vertical
        gsap.set(cards, {
          position: 'relative',
          width: '100%',
          height: 'auto',
          opacity: 0,
          y: 50, // Empezar un poco más abajo
          scale: 1,
          zIndex: 1,
          display: 'block',
          marginBottom: '3rem', // Separación entre tarjetas
          clearProps: 'left,top,transform' // Limpiar props desktop
        });

        // 3. Animación Simple "Reveal" al hacer scroll
        cards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 85%", // Aparece cuando entra en pantalla
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveCardId(content.items[index].id),
            animation: gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            })
          });
        });
      }
    });

    return () => mm.revert();
  }, [content.items]);

  return (
    <section ref={sectionRef} className="bg-[#0B0B0B] relative overflow-hidden">
      {/* Container adaptativo */}
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 h-screen flex flex-col items-center justify-center">
        
        {/* Header: Posicionamiento condicional vía clases CSS o lógica visual */}
        {/* En móvil, dejamos que fluya o lo posicionamos relative si es necesario. 
            El CSS "absolute" actual funciona bien en desktop, en móvil podemos ajustarlo si se solapa */}
        <div className="absolute top-12 left-6 z-20 pointer-events-none mix-blend-difference md:block hidden">
           <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black mb-4">{content.label}</h2>
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/20">{content.title}</h3>
        </div>
        
        {/* Título Visible solo en móvil para contexto */}
        <div className="md:hidden w-full pt-24 pb-12">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black mb-2">{content.label}</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter text-white">{content.title}</h3>
        </div>

        {content.items.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            // Clases base + ajustes responsivos
            className="w-full flex items-center justify-center p-0 md:p-12 will-change-transform"
          >
            <div className="relative w-full aspect-[3/4] md:aspect-[16/9] bg-zinc-950 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl z-10 group">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                  <div className="max-w-3xl w-full">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#F5C400] font-black mb-3 block">
                      {project.category} — {project.year}
                    </span>
                    <h4 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
                      {project.title}
                    </h4>
                    {/* Descripción truncada o ajustada en móvil */}
                    <p className="text-white/70 text-sm md:text-lg font-light mb-6 max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(s => (
                        <span key={s} className="px-2 py-1 md:px-3 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-white">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Botón ajustado para móvil */}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#F5C400] group-hover:text-black transition-all duration-300 shrink-0 cursor-pointer bg-black/40 backdrop-blur-sm md:bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 md:w-8 md:h-8 -rotate-45"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>

                </div>
              </div>

              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-4xl md:text-6xl font-black text-white/5 pointer-events-none uppercase leading-none">
                 {project.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
