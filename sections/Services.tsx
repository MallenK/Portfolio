
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black mb-4">Core / 02</h2>
          <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Servicios</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div key={i} className="service-card p-12 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:border-[#F5C400] transition-colors duration-500">
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 block">{service.icon}</div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h4>
              <p className="text-white/50 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
