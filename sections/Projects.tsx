
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i === PROJECTS.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "bottom top",
          scrub: true,
        });

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.3,
          scrollTrigger: {
            trigger: card,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0B0B] py-32">
      <div className="px-6 max-w-7xl mx-auto mb-24">
         <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black mb-4">Portfolio / 03</h2>
         <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">Proyectos</h3>
      </div>

      <div className="flex flex-col">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[index] = el!)}
            className="w-full h-screen flex items-center justify-center p-4 md:p-10 bg-[#0B0B0B]"
          >
            <div className="relative w-full h-full md:h-[85vh] bg-zinc-950 rounded-[3rem] overflow-hidden group border border-white/5">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                  <div className="max-w-3xl">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#F5C400] font-black mb-6 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {project.category} — {project.year}
                    </span>
                    <h4 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none">
                      {project.title}
                    </h4>
                    <p className="text-white/60 text-lg md:text-xl font-light mb-10 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      {project.stack.map(s => (
                        <span key={s} className="px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full text-[10px] uppercase font-black tracking-widest border border-white/10 text-white hover:bg-[#F5C400] hover:text-black transition-colors">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#F5C400] group-hover:text-black transition-all duration-500 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 delay-300 shrink-0">
                     <span className="text-[10px] uppercase font-black tracking-widest -rotate-45">Ver</span>
                  </button>
                </div>
              </div>

              <div className="absolute top-12 right-12 text-[15vw] font-black text-white/5 pointer-events-none uppercase leading-none">
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
