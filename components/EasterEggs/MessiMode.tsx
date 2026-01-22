
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCheats } from '../../context/CheatContext';

// POOL DE GIFs: MESSI + PELÍCULAS ICONICAS (Divertidos/Expresivos)
const GIF_POOL = [
  // Messi
  'https://media.giphy.com/media/TjAcxImn74uoDYVxFl/giphy.gif', // Goat classic
  'https://media.giphy.com/media/ipD7A4WdJ8r0Q/giphy.gif',       // Skills
  
  // Cine / Pop Culture
  'https://media.giphy.com/media/rY93u9tQbybks/giphy.gif',       // Wolf of Wall Street (Clapping)
  'https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif',       // Pulp Fiction (Travolta Confused)
  'https://media.giphy.com/media/eIm657DGMCERkQlNBQ/giphy.gif',  // Matrix (Dodging)
  'https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif',      // The Office (No God No)
  'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif',       // Waiting...
];

const MessiMode: React.FC = () => {
  const { messiActive, setMessiActive } = useCheats();
  const [currentGif, setCurrentGif] = useState(GIF_POOL[0]);

  // Trigger automático al cambiar el estado en el Contexto (vía botón)
  useEffect(() => {
    if (messiActive) {
      // 1. Seleccionar GIF aleatorio
      const randomGif = GIF_POOL[Math.floor(Math.random() * GIF_POOL.length)];
      setCurrentGif(randomGif);

      // 2. Auto-ocultar tras 3 segundos
      const timer = setTimeout(() => {
        setMessiActive(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messiActive, setMessiActive]);

  return (
    <AnimatePresence>
      {messiActive && (
        <div className="fixed inset-x-0 bottom-0 z-[99999] flex flex-col items-center justify-end pointer-events-none pb-0">
           <motion.div
             initial={{ y: "100%", opacity: 0 }}
             animate={{ 
               y: "0%", 
               opacity: 1,
               transition: { type: "spring", stiffness: 200, damping: 20 }
             }}
             exit={{ 
               y: "100%", 
               opacity: 0,
               transition: { duration: 0.3 } 
            }}
             className="relative flex flex-col items-center"
           >
              {/* Mensaje Superior */}
              <div className="mb-4 bg-white/90 backdrop-blur-md text-black font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-2xl text-xs border-2 border-black transform -rotate-2">
                 Easter Egg Activated 😎
              </div>
              
              {/* Animated GIF */}
              <img 
                src={currentGif}
                alt="Random GIF"
                className="max-h-[50vh] md:max-h-[40vh] w-auto object-contain drop-shadow-2xl"
              />
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessiMode;
