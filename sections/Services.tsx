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
              className="service-card p-10 md:p-12 border border-white/5 bg-zinc-900/20 rounded-3xl hover:border-[#F5C400] transition-colors duration-500 flex flex-col justify-between items-center text-center"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">
                  {service.title}
                </h4>

                <p className="text-white/50 font-light leading-relaxed max-w-sm mx-auto mb-6">
                  {service.desc}
                </p>
              </div>

              {service.url && (
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all duration-300 shrink-0 cursor-pointer bg-black/40 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-7 md:h-7 -rotate-45"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              )}

              {service.action === "open-ai-chat" && (
                <button
                  onClick={() => {
                    const chatButton = document.querySelector(
                      '.fixed.bottom-6.right-6 button'
                    ) as HTMLButtonElement | null;

                    if (chatButton) {
                      chatButton.click();
                    }
                  }}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all duration-300 shrink-0 cursor-pointer bg-black/40 backdrop-blur-sm"
                >
                  💬
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
