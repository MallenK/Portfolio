import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortfolioMode = 'normal' | 'world' | 'retro' | 'future';
export type SoundTheme = 'sci-fi' | 'fantasy';

interface CheatContextType {
  // Mode Management (Exclusive)
  currentMode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;

  // Actions
  triggerGlitch: () => void;
  isGlitching: boolean;
  
  messiActive: boolean;
  setMessiActive: (v: boolean) => void;

  // Additional settings
  devModeEnabled: boolean;
  setDevModeEnabled: (v: boolean) => void;
  particlesEnabled: boolean;
  soundEnabled: boolean;
  soundTheme: SoundTheme;
}

const CheatContext = createContext<CheatContextType | undefined>(undefined);

export const CheatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<PortfolioMode>('normal');
  const [isGlitching, setIsGlitching] = useState(false);
  const [messiActive, setMessiActive] = useState(false);
  
  // New states for extended functionality
  const [devModeEnabled, setDevModeEnabled] = useState(false);
  const [particlesEnabled] = useState(true);
  const [soundEnabled] = useState(false);
  const [soundTheme] = useState<SoundTheme>('sci-fi');

  // Persistence
  useEffect(() => {
    const savedMode = sessionStorage.getItem('mallenk_mode') as PortfolioMode;
    if (savedMode && ['normal', 'world', 'retro', 'future'].includes(savedMode)) {
      setCurrentMode(savedMode);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('mallenk_mode', currentMode);
    
    // Global body class for styling hooks if needed
    document.body.className = `mode-${currentMode}`;
    
    // Reset standard scroll if leaving world mode
    if (currentMode !== 'world') {
      document.body.style.overflow = '';
    }
  }, [currentMode]);

  const setMode = (mode: PortfolioMode) => {
    // Logic to cleanly switch modes
    setCurrentMode(mode);
  };

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    // Sequence duration matches animation
    setTimeout(() => setIsGlitching(false), 4000); 
  };

  return (
    <CheatContext.Provider value={{
      currentMode, setMode,
      triggerGlitch, isGlitching,
      messiActive, setMessiActive,
      devModeEnabled, setDevModeEnabled,
      particlesEnabled,
      soundEnabled,
      soundTheme
    }}>
      {children}
    </CheatContext.Provider>
  );
};

export const useCheats = () => {
  const context = useContext(CheatContext);
  if (!context) throw new Error("useCheats must be used within a CheatProvider");
  return context;
};