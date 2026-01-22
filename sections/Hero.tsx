
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '../components/MagneticWrapper';
import { PortfolioContent } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['hero'];
}

const Hero: React.FC<Props> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const fullText = content.subtitle;
    setDisplayedText(''); // Reset when language changes
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40); // Type speed

    return () => clearInterval(interval);
  }, [content.subtitle]);

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
        <div className="overflow-hidden mb-6 h-6 flex items-center justify-center">
          <span className="block text-[#F5C400] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
            {displayedText}
            <span className="animate-pulse">|</span>
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
              {content.cta}
            </a>
          </MagneticWrapper>
          {/* Changed link to #skills to point to the technical stack section, avoiding external issues */}
          <a href="#skills" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-[#F5C400] transition-colors">
            MallenK Info
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold">{content.scroll}</span>
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
