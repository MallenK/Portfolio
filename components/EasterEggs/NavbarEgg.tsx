
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIF_SRC = '/assets/easter-egg-navbar.gif';
const FALLBACK_SRC = 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif'; // Minion/Funny placeholder

const NavbarEgg: React.FC = () => {
  const [active, setActive] = useState(false);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const triggerEl = document.getElementById('navbar-logo');
    
    if (!triggerEl) return;

    const handleClick = (e: MouseEvent) => {
      // Don't prevent default, allow navigation if it were a link, but here it's a div.
      // If it was an anchor, we would be careful.
      
      if (cooldownRef.current) return;

      setActive(true);
      cooldownRef.current = true;

      // Visible for 3 seconds
      setTimeout(() => {
        setActive(false);
      }, 3000);

      // Cooldown for 10 seconds
      setTimeout(() => {
        cooldownRef.current = false;
      }, 10000);
    };

    triggerEl.addEventListener('click', handleClick);

    return () => {
      triggerEl.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-x-0 top-0 z-[99999] flex flex-col items-center justify-start pointer-events-none pt-24">
           <motion.div
             initial={{ y: "-100%", opacity: 0 }}
             animate={{ 
               y: "0%", 
               opacity: 1,
               transition: { type: "spring", stiffness: 200, damping: 15 }
             }}
             exit={{ y: "-100%", opacity: 0, transition: { duration: 0.5 } }}
             className="relative flex flex-col items-center"
           >
              {/* Message */}
              <div className="mb-2 bg-white text-black font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl text-xs">
                 You found it 👀
              </div>
              
              {/* GIF */}
              <img 
                src={GIF_SRC}
                onError={(e) => { e.currentTarget.src = FALLBACK_SRC; }}
                alt="Hidden Easter Egg"
                className="w-48 h-auto rounded-xl shadow-2xl border-4 border-white rotate-3"
              />
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavbarEgg;
