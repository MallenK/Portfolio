
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioContent } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['experience'];
}

const Experience: React.FC<Props> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-block", {
        x: -30,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-16">
          {content.label}
        </h2>

        <div className="space-y-24">
          {content.items.map((exp) => (
            <div
              key={exp.id}
              className="exp-block relative pl-12 border-l border-zinc-800"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-black" />
              <div className="mb-6">
                <span className="text-zinc-500 text-sm block mb-2">{exp.period}</span>
                <h3 className="text-3xl font-bold">{exp.role}</h3>
                <h4 className="text-xl text-zinc-400">{exp.company}</h4>
              </div>
              <ul className="space-y-4">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="text-zinc-500 flex gap-4">
                    <span className="text-zinc-800">•</span>
                    {item}
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

export default Experience;
