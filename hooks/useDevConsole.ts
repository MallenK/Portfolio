
import { useEffect, useState } from 'react';
import { useCheats } from '../context/CheatContext';

const KONAMI_CODE = "mallenk";

export const useDevConsole = () => {
  const { devModeEnabled, setDevModeEnabled } = useCheats();
  const [inputBuffer, setInputBuffer] = useState("");

  useEffect(() => {
    // Console signature
    console.log(
      "%c Built with passion by MallenK — Full Stack & AI %c\nIf you're reading this, we should work together.",
      "background: #0B0B0B; color: #F5C400; padding: 8px; font-weight: bold; border: 1px solid #F5C400; border-radius: 4px;",
      "color: #888; margin-top: 5px;"
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      setInputBuffer((prev) => {
        const newBuffer = (prev + key).slice(-KONAMI_CODE.length);
        if (newBuffer === KONAMI_CODE) {
          if (!devModeEnabled) {
             console.log("%c Dev mode unlocked 🔓 ", "background: #F5C400; color: #000; font-size: 12px; padding: 4px; font-weight: bold;");
             setDevModeEnabled(true);
          }
          return "";
        }
        return newBuffer;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [devModeEnabled, setDevModeEnabled]);

  return { devModeEnabled };
};
