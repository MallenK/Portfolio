
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 flex flex-col justify-center max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="about-reveal text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black sticky top-32">
            Profile / 01
          </h2>
        </div>
        <div className="lg:col-span-8">
          <p className="about-reveal text-4xl sm:text-5xl lg:text-7xl font-light leading-[1] tracking-tighter text-white mb-16">
            Ingeniería de software enfocada en crear <span className="text-[#F5C400] font-black uppercase italic">productos reales</span> y experiencias escalables.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-white/40 text-lg leading-relaxed font-light">
            <div className="about-reveal">
              Residente en Colònia Güell, Barcelona. Mi pasión es resolver problemas complejos mediante arquitecturas Full Stack robustas, integrando desde PHP legacy hasta soluciones modernas con React y Supabase.
            </div>
            <div className="about-reveal">
              No solo escribo código; diseño sistemas que perduran. Mi enfoque combina la eficiencia del backend con la interactividad creativa del frontend, buscando siempre el equilibrio entre rendimiento y estética.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
