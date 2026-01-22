
import React, { useEffect, useRef } from 'react';
import { useCheats } from '../context/CheatContext';

const Particles: React.FC = () => {
  const { particlesEnabled } = useCheats();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // MOBILE PERFORMANCE CHECK
    // If screen is smaller than 768px, do not init particles.
    if (window.innerWidth < 768) return;

    if (!particlesEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; speedY: number; speedX: number; opacity: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 15 : 35;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.5 + 0.1,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > canvas.height) {
          p.y = 0 - p.size;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [particlesEnabled]);

  // Si detectamos móvil en render inicial (opcional), podríamos retornar null,
  // pero el hook maneja la lógica. Para seguridad SSR/Hydration, el CSS 'fixed'
  // no molesta si el canvas está vacío.
  
  if (!particlesEnabled) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen"
    />
  );
};

export default Particles;
