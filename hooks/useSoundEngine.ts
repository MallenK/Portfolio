
import { useEffect, useRef } from 'react';
import { useCheats } from '../context/CheatContext';

export const useSoundEngine = () => {
  const { soundEnabled, soundTheme } = useCheats();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);

  const stopSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    oscillatorsRef.current = [];
    gainNodesRef.current = [];
    if (audioCtxRef.current?.state !== 'closed') {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    }
  };

  const createDrone = (freq: number, type: OscillatorType, vol: number, pan: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // LFO for movement
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1 + Math.random() * 0.2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 2; // subtle pitch drift
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start();

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 2);

    panner.pan.value = pan;

    osc.connect(gain).connect(panner).connect(ctx.destination);
    osc.start();

    oscillatorsRef.current.push(osc, lfo);
    gainNodesRef.current.push(gain);
  };

  const startSound = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();

    if (soundTheme === 'fantasy') {
      // Ethereal / Coral / LOTR vibes (Major chords, sine/triangle)
      createDrone(110, 'sine', 0.1, -0.5); // A2
      createDrone(164.8, 'sine', 0.08, 0.5); // E3
      createDrone(220, 'triangle', 0.05, 0); // A3
      createDrone(277.18, 'sine', 0.05, 0.3); // C#4
    } else {
      // Sci-Fi / Star Wars vibes (Deep, Sawtooth, Detuned)
      createDrone(55, 'sawtooth', 0.05, 0); // A1 (Deep drone)
      createDrone(56, 'sawtooth', 0.05, -0.3); // Detuned
      createDrone(110, 'square', 0.02, 0.4); // A2
      createDrone(880, 'sine', 0.01, 0); // High glitchy shine
    }
  };

  useEffect(() => {
    if (soundEnabled) {
      startSound();
    } else {
      stopSound();
    }
    return () => stopSound();
  }, [soundEnabled, soundTheme]);

  // UI Sound Effect Trigger
  const playHover = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = soundTheme === 'fantasy' ? 'sine' : 'sawtooth';
    osc.frequency.setValueAtTime(soundTheme === 'fantasy' ? 880 : 220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(soundTheme === 'fantasy' ? 440 : 50, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  return { playHover };
};
