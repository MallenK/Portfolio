import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '../components/MagneticWrapper';
import { PortfolioContent } from '../types';
import { SOCIAL_LINKS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  content: PortfolioContent['contact'];
}

const Contact: React.FC<Props> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-white text-black rounded-t-[5vw] md:rounded-t-[10vw]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* LEFT */}
          <div>
            <h2 className="contact-reveal text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-black mb-12">
              {content.label}
            </h2>

            <h3 className="contact-reveal text-[15vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-16">
              Start<br />
              <span className="text-zinc-200">Build</span><br />
              <span className="text-[#F5C400]">Now</span>
            </h3>

            <div className="space-y-12">
              <div className="contact-reveal">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-black">
                  {content.freelanceLabel}
                </p>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="text-2xl md:text-4xl font-black hover:text-[#F5C400] transition-colors lowercase"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </div>

              <div className="contact-reveal">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-black">
                  {content.socialLabel}
                </p>
                <div className="flex gap-8 flex-wrap">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic"
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-black hover:text-[#F5C400] transition-colors uppercase italic"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <form
            action="https://formspree.io/f/xanvepwo"
            method="POST"
            className="contact-reveal space-y-12"
          >
            {/* NAME */}
            <div className="group border-b border-zinc-200 pb-6 focus-within:border-black transition-colors">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">
                {content.formName}
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent py-2 text-2xl md:text-4xl font-light text-black outline-none placeholder:text-zinc-400"
                placeholder={content.formName}
              />
            </div>

            {/* EMAIL */}
            <div className="group border-b border-zinc-200 pb-6 focus-within:border-black transition-colors">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">
                {content.formEmail}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent py-2 text-2xl md:text-4xl font-light text-black outline-none placeholder:text-zinc-400"
                placeholder={content.formEmail}
              />
            </div>

            {/* MESSAGE */}
            <div className="group border-b border-zinc-200 pb-6 focus-within:border-black transition-colors">
              <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">
                {content.formIdea}
              </label>
              <input
                type="text"
                name="message"
                required
                className="w-full bg-transparent py-2 text-2xl md:text-4xl font-light text-black outline-none placeholder:text-zinc-400"
                placeholder={content.formIdea}
              />
            </div>

            <MagneticWrapper strength={0.1}>
              <button
                type="submit"
                className="w-full py-10 bg-black text-white rounded-full font-black uppercase tracking-[0.4em] text-xs hover:bg-[#F5C400] hover:text-black transition-all duration-500"
              >
                {content.btn}
              </button>
            </MagneticWrapper>
          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-40 pt-16 border-t border-zinc-300 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase font-black tracking-[0.5em] text-zinc-500">
          <span className="text-zinc-700">
            {content.footerText}
          </span>

          <span className="text-center text-zinc-500">
            {content.footerLoc}
          </span>

          <span className="text-zinc-700">
            {content.footerRole}
          </span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
