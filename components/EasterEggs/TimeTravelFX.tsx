
import React from 'react';
import { useCheats } from '../../context/CheatContext';
import { motion } from 'framer-motion';

const TimeTravelFX: React.FC = () => {
  const { currentMode } = useCheats();

  if (currentMode === 'normal' || currentMode === 'world') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      
      {/* --- RETRO MODE (LEGACY - Intacto por compatibilidad) --- */}
      {currentMode === 'retro' && (
        <>
          <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #1a1a1a 4px)',
            opacity: 0.2,
            backgroundSize: '100% 4px'
          }} />
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 font-mono text-green-500 text-xs tracking-widest bg-black/90 p-2 border border-green-500">
            SYSTEM YEAR: 1995
          </div>
          <style>{`
            #portfolio-content { filter: contrast(1.4) sepia(0.8) grayscale(0.2) !important; font-family: 'Courier New', monospace !important; }
            #portfolio-content nav, #portfolio-content section { border-color: #22c55e !important; }
          `}</style>
        </>
      )}

      {/* --- NEW CLEAN FUTURIST MODE --- */}
      {currentMode === 'future' && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
        >
          {/* 1. Sutil Technical Grid (No oscurece, solo aporta textura) */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
             backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
          }} />

          {/* 2. Vignette muy suave para enfocar el centro */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_120%)]" />

          {/* 3. HUD PROTAGONISTA (Bottom Center) */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[100]">
             <div className="h-[1px] w-24 bg-cyan-500/50 mb-2" />
             <div className="font-mono text-cyan-400 text-[10px] md:text-xs tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] flex gap-4 bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full border border-cyan-500/20">
                <span>SYSTEM YEAR: 2049</span>
                <span className="opacity-50">|</span>
                <span className="animate-pulse text-white">MODE: ON</span>
             </div>
             <div className="h-[1px] w-12 bg-cyan-500/30 mt-1" />
          </div>

          {/* 4. Estilos inyectados: Glow elegante en textos clave (Sin romper legibilidad) */}
          <style>{`
            /* Títulos y Headers con Glow suave */
            #portfolio-content h1, #portfolio-content h2, #portfolio-content h3 {
               text-shadow: 0 0 15px rgba(6, 182, 212, 0.4) !important;
            }
            
            /* Botones y Enlaces con borde técnico */
            #portfolio-content button, #portfolio-content a.bg-\[\#F5C400\] {
               box-shadow: 0 0 10px rgba(34, 211, 238, 0.3) !important;
               border: 1px solid rgba(6, 182, 212, 0.3) !important;
            }

            /* Scrollbar técnica */
            ::-webkit-scrollbar { width: 4px; display: block; }
            ::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 4px; }
            ::-webkit-scrollbar-track { background: #000; }
          `}</style>
        </motion.div>
      )}
    </div>
  );
};

export default TimeTravelFX;
