
import React from 'react';
import { useCheats } from '../../context/CheatContext';

const WorldModeFX: React.FC = () => {
  const { currentMode, setMode } = useCheats();

  // NAVEGACIÓN POR TECLADO ELIMINADA (WASD OFF)
  // Este componente ahora es puramente visual (Overlay Linterna)
  
  if (currentMode !== 'world') return null;

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none">
      {/* Flashlight Effect - Visual Only */}
      <div 
        className="absolute inset-0 bg-black/95 transition-all duration-75"
        style={{
          maskImage: `radial-gradient(circle 350px at 50% 50%, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 350px at 50% 50%, transparent 0%, black 100%)`
        }}
      />
      
      {/* HUD Simple */}
      <div className="absolute top-6 left-6 font-mono text-white/80 text-[10px] uppercase tracking-widest border border-white/20 p-4 bg-black/50 backdrop-blur-sm pointer-events-auto">
        <h3 className="text-[#F5C400] mb-2 font-bold">World Mode Active</h3>
        <p className="mb-1 text-white/40">Flashlight Focus Only</p>
        <button 
          onClick={() => setMode('normal')}
          className="mt-4 px-3 py-1 bg-white/10 hover:bg-[#F5C400] hover:text-black transition-colors w-full text-center border border-white/10"
        >
          EXIT MODE
        </button>
      </div>
    </div>
  );
};

export default WorldModeFX;
