"use client";
import React, { useEffect, useRef } from 'react';

type Particle = { 
  x: number; 
  y: number; 
  z: number; 
  vx: number; 
  vy: number; 
  size: number; 
  baseAlpha: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const particles: Particle[] = [];
    const particleCount = 200; // More dense but smaller particles

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 1000 + 100, // Depth from 100 to 1100
            vx: (Math.random() - 0.5) * 0.15, 
            vy: (Math.random() - 0.5) * 0.15, 
            size: Math.random() * 1.5 + 0.2, // Much smaller, sharper particles (0.2 to 1.7)
            baseAlpha: Math.random() * 0.4 + 0.1 // Max alpha 0.5
        });
    }

    const primaryPink = '232, 93, 146'; // matches `#E85D92`
    const lightPink = '245, 161, 189'; // matches `#F5A1BD`

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;

      const focalLength = 400;

      // Draw subtle ambient glow orbs - significantly reduced opacity
      const orb1X = width * 0.3 + Math.sin(time) * 200;
      const orb1Y = height * 0.4 + Math.cos(time * 0.8) * 150;
      const gradient1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 600);
      gradient1.addColorStop(0, `rgba(${primaryPink}, 0.05)`); // Very subtle
      gradient1.addColorStop(1, 'rgba(242, 248, 242, 0)'); // fade to mint bg
      
      const orb2X = width * 0.7 + Math.cos(time * 1.2) * 250;
      const orb2Y = height * 0.6 + Math.sin(time * 0.9) * 200;
      const gradient2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 700);
      gradient2.addColorStop(0, `rgba(${lightPink}, 0.03)`); // Very subtle
      gradient2.addColorStop(1, 'rgba(242, 248, 242, 0)');

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // Update and Draw Particles
      particles.forEach(p => {
          // Drifting
          p.x += p.vx;
          p.y += p.vy;

          // Mouse parallax interaction
          const dx = mouseX - (width / 2);
          const dy = mouseY - (height / 2);
          
          // Parallax shift based on Z depth
          const parallaxX = (dx / p.z) * 5;
          const parallaxY = (dy / p.z) * 5;

          // Screen wrapping
          const screenX = p.x + parallaxX;
          const screenY = p.y + parallaxY;

          if (screenX < -100) p.x = width + 100;
          if (screenX > width + 100) p.x = -100;
          if (screenY < -100) p.y = height + 100;
          if (screenY > height + 100) p.y = -100;

          // Project 3D -> 2D
          const scale = focalLength / p.z;
          const drawSize = p.size * scale * 2; // Sharp particles
          const drawAlpha = p.baseAlpha * Math.min(1, scale * 1.5); // Fade particles further away

          ctx.beginPath();
          ctx.arc(screenX, screenY, drawSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryPink}, ${drawAlpha})`;
          
          // Only very slight glow for the absolute closest particles
          if (p.size > 1.2 && scale > 0.8) {
             ctx.shadowBlur = 5;
             ctx.shadowColor = `rgba(${primaryPink}, ${drawAlpha * 0.5})`;
          } else {
             ctx.shadowBlur = 0;
          }
          
          ctx.fill();
      });

      // Draw subtle connecting lines for nearby particles (Constellation effect)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
             const p1 = particles[i];
             const p2 = particles[j];
             
             // Only connect if Z depth is similar and X/Y are close
             if (Math.abs(p1.z - p2.z) > 100) continue;
             
             const dx1 = mouseX - (width / 2);
             const dy1 = mouseY - (height / 2);
             const x1 = p1.x + (dx1 / p1.z) * 5;
             const y1 = p1.y + (dy1 / p1.z) * 5;
             
             const x2 = p2.x + (dx1 / p2.z) * 5;
             const y2 = p2.y + (dy1 / p2.z) * 5;

             const dist = Math.hypot(x1 - x2, y1 - y2);
             const connectDistance = 80;
             if (dist < connectDistance) {
                const scale = focalLength / ((p1.z + p2.z) / 2);
                // Very subtle connecting lines
                const alpha = Math.pow((1 - dist / connectDistance), 2) * 0.1 * scale;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(${primaryPink}, ${alpha})`;
                ctx.stroke();
             }
          }
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-background">
      <canvas 
          ref={canvasRef} 
          className="absolute origin-center w-full h-full" 
      />
      {/* Subtle grid overlay to enhance depth */}
      <div className="absolute inset-0 grid-bg opacity-30 mix-blend-multiply"></div>
    </div>
  );
}
