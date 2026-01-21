
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: (i % 2 === 0 ? -20 : 20),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#F5C400] mb-24 text-center font-black">
          Stack / 04
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((group, idx) => (
            <div
              key={group.category}
              ref={(el) => (cardsRef.current[idx] = el!)}
              className="p-10 border border-white/5 rounded-[2rem] bg-zinc-900/10 backdrop-blur-md group hover:border-[#F5C400] transition-all duration-700"
            >
              <h3 className="text-lg font-black uppercase tracking-tight mb-8 text-white group-hover:text-[#F5C400] transition-colors">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#F5C400] rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
