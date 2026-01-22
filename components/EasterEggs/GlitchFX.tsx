
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCheats } from '../../context/CheatContext';

const GlitchFX: React.FC = () => {
  const { isGlitching } = useCheats();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const rgbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGlitching) return;

    // TARGET ELEMENTS
    const targets = document.querySelectorAll("#portfolio-content nav, #portfolio-content section");
    
    // --- 1. DEFINE THE 10 CHAOS EFFECTS ---
    const effects = [
        // 1. Gravity Drop (Classic)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            y: () => window.innerHeight / 2, rotation: () => Math.random() * 20 - 10, duration: 0.5, ease: "bounce.out" 
        }),
        
        // 2. Screen Shake (Violent)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            x: () => Math.random() * 100 - 50, y: () => Math.random() * 50 - 25, duration: 0.1, repeat: 5, yoyo: true 
        }),

        // 3. RGB Split (CSS Filter)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            textShadow: "4px 0px 0px red, -4px 0px 0px blue", duration: 0.1, repeat: 3, yoyo: true 
        }),

        // 4. Scanlines Aggressive
        (tl: gsap.core.Timeline) => tl.to(scanlineRef.current, { 
            opacity: 0.8, duration: 0.1, repeat: 4, yoyo: true 
        }),

        // 5. Pixelation Burst (Blur simulation)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            filter: "blur(10px) contrast(200%)", duration: 0.2, repeat: 1, yoyo: true 
        }),

        // 6. Wave Distortion (Skew)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            skewX: 45, scaleY: 1.5, duration: 0.4, ease: "elastic.out(1, 0.3)" 
        }),

        // 7. Blur Shock
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            filter: "blur(20px)", opacity: 0.5, duration: 0.3, ease: "power1.inOut" 
        }),

        // 8. Mirror Flip
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            scaleX: -1, duration: 0.2, repeat: 1, yoyo: true 
        }),

        // 9. Freeze Frame (Pause UI)
        (tl: gsap.core.Timeline) => tl.to(targets, { 
            opacity: 0, duration: 0.1, repeat: 3, yoyo: true 
        }),

        // 10. Light Flash (Whiteout)
        (tl: gsap.core.Timeline) => tl.to(rgbRef.current, { 
            backgroundColor: "white", mixBlendMode: "difference", opacity: 1, duration: 0.05, repeat: 3, yoyo: true 
        })
    ];

    // --- 2. RANDOM SELECTION (3 to 5 effects) ---
    const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
    const selectedEffects = shuffle(effects).slice(0, Math.floor(Math.random() * 3) + 3);

    // --- 3. MASTER TIMELINE ---
    const masterTl = gsap.timeline({
        onComplete: () => {
            // FORCE RELOAD AFTER CHAOS
            setTimeout(() => window.location.reload(), 800);
        }
    });

    // START CHAOS
    selectedEffects.forEach((effect) => {
        effect(masterTl);
        masterTl.add("+=0.1"); // Small gasp between effects
    });

    // FINAL REVEAL MESSAGE (Always happens)
    masterTl.addLabel("reveal")
        .to(overlayRef.current, { opacity: 1, duration: 0.2, backgroundColor: "#000" }, "reveal")
        .to(textRef.current, { opacity: 1, scale: 1, duration: 1, ease: "expo.out" }, "reveal+=0.3")
        .to({}, { duration: 1.5 }); // Read time

  }, [isGlitching]);

  if (!isGlitching) return null;

  return (
    <>
      {/* FX LAYERS */}
      <div ref={scanlineRef} className="fixed inset-0 z-[10500] pointer-events-none opacity-0" 
           style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)' }} />
      <div ref={rgbRef} className="fixed inset-0 z-[10600] pointer-events-none opacity-0" />

      {/* OVERLAY & MESSAGE */}
      <div ref={overlayRef} className="fixed inset-0 z-[11000] pointer-events-none opacity-0 flex items-center justify-center bg-black">
        <div ref={textRef} className="text-center opacity-0 scale-95 p-6 transform-gpu">
          <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase mb-8 leading-tight animate-pulse">
            Behind every interface,<br />
            <span className="text-[#F5C400] blur-[1px]">there is logic.</span>
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto mb-8 rounded-full" />
          <p className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">System Rebooting — MallenK</p>
        </div>
      </div>
    </>
  );
};

export default GlitchFX;
