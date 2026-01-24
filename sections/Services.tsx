import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioContent } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['services'];
}

const Services: React.FC<Props> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        {
          y: 60,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black mb-4">
            {content.label}
          </h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {content.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((service, i) => (
            <div
              key={i}
              className="service-card p-10 md:p-12 border border-white/5 bg-zinc-900/20 rounded-3xl hover:border-[#F5C400] transition-colors duration-500"
            >
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">
                {service.title}
              </h4>
              <p className="text-white/50 font-light leading-relaxed max-w-sm mx-auto">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
