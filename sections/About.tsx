import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioContent } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['about'];
}

const About: React.FC<Props> = ({ content }) => {
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
    <section ref={containerRef} className="min-h-screen py-32 px-6 flex flex-col justify-center bg-[#0B0B0B] w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="about-reveal text-[10px] uppercase tracking-[0.5em] text-[#F5C400] font-black">
              {content.label}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="about-reveal text-4xl sm:text-5xl lg:text-7xl font-light leading-[1] tracking-tighter text-white mb-16">
              {content.title} <span className="text-[#F5C400] font-black uppercase italic">{content.highlight}</span> {content.p1}
            </p>
            
            <div className="grid grid-cols-1 gap-12 text-white/40 text-lg leading-relaxed font-light">
              <div className="about-reveal">
                {content.p2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;