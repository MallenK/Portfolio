
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '../components/MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-white text-black rounded-t-[5vw] md:rounded-t-[10vw]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="contact-reveal text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-black mb-12">
              Collaborate / 05
            </h2>
            <h3 className="contact-reveal text-[15vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-16">
              Start<br /><span className="text-zinc-200">Build</span><br /><span className="text-[#F5C400]">Now</span>
            </h3>
            
            <div className="space-y-12">
              <div className="contact-reveal">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-black">Email Profesional</p>
                <a href="mailto:sergimallen@example.com" className="text-2xl md:text-4xl font-black hover:text-[#F5C400] transition-colors lowercase">hello@sergimallen.dev</a>
              </div>
              <div className="contact-reveal flex flex-wrap gap-12">
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-black">Social</p>
                   <div className="flex gap-8">
                     <a href="https://linkedin.com/in/mallenk" target="_blank" className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic">LinkedIn</a>
                     <a href="https://github.com/mallenk" target="_blank" className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic">Github</a>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-reveal space-y-12">
            <div className="group border-b border-zinc-200 pb-6 focus-within:border-black transition-colors">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">Tu Nombre</label>
              <input type="text" className="w-full bg-transparent py-2 text-2xl md:text-4xl font-light outline-none placeholder:text-zinc-100" placeholder="Nombre completo" />
            </div>
            <div className="group border-b border-zinc-200 pb-6 focus-within:border-black transition-colors">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">Proyecto / Idea</label>
              <input type="text" className="w-full bg-transparent py-2 text-2xl md:text-4xl font-light outline-none placeholder:text-zinc-100" placeholder="Brief de la idea" />
            </div>
            
            <MagneticWrapper strength={0.1}>
              <button className="w-full py-10 bg-black text-white rounded-full font-black uppercase tracking-[0.4em] text-xs hover:bg-[#F5C400] hover:text-black transition-all duration-500">
                Enviar Solicitud
              </button>
            </MagneticWrapper>
          </div>
        </div>

        <div className="mt-40 pt-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase font-black tracking-[0.5em] text-zinc-300">
           <span>Sergi Mallén © 2024</span>
           <span className="text-center">Basado en Colònia Güell, Barcelona</span>
           <span>Full Stack Logic</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
