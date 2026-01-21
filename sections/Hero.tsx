
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '../components/MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scale: 1.2,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div ref={bgRef} className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[100vw] h-[100vw] rounded-full bg-[#F5C400] blur-[150px] opacity-10" />
      </div>

      <div className="z-10 text-center max-w-7xl">
        <div className="overflow-hidden mb-6">
          <span className="block text-[#F5C400] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
            Barcelona • Full Stack Developer • Creative Logic
          </span>
        </div>

        <h1 ref={titleRef} className="text-[14vw] sm:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase mb-12">
          Sergi<br />
          <span className="text-white/20 stroke-text">Mallén</span><br />
          López
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <MagneticWrapper strength={0.15}>
            <a href="#projects" className="px-12 py-6 bg-[#F5C400] text-black rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform">
              Ver Proyectos
            </a>
          </MagneticWrapper>
          <a href="#about" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-[#F5C400] transition-colors">
            Sobre mí
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#F5C400] to-transparent" />
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Hero;
