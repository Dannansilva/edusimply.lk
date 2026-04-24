"use client";
import React, { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; z: number; speedY: number; size: number; glow: boolean };

type RenderElement = 
  | { type: 'particle'; z: number; x: number; y: number; scale: number; glow: boolean; size: number }
  | { type: 'backbone'; z: number; x: number; y: number; scale: number }
  | { type: 'rung'; z: number; x1: number; y1: number; x2: number; y2: number; scale: number }
  | { type: 'node'; z: number; x: number; y: number; scale: number };

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      // Very large buffer to maintain quality and cover all edges when rotated via CSS
      width = canvas.width = window.innerWidth * 1.2;
      height = canvas.height = window.innerHeight * 1.5;
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 1000,
            speedY: (Math.random() - 0.5) * 0.4 - 0.1, 
            size: Math.random() * 3 + 1,
            glow: Math.random() > 0.6 
        });
    }

    let time = 0;
    
    // Palette targeting the ultra-realistic stock image style
    const primaryPink = '230, 100, 150'; // Bright Pink Matches glowing nodes
    const backboneBlue = '160, 185, 230'; // Light frosty blue core
    const deepBlue = '80, 100, 150'; // Deeper indigo blue structure

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015; // Drives the pure 3D rotation around the Y-axis

      const focalLength = 800; // Realistic depth of field
      const dnaRadius = Math.min(width, height) * 0.15; // Massive structure size
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const elements: RenderElement[] = [];

      // 1. Plot atmospheric floating particles
      particles.forEach(p => {
          p.y += p.speedY;
          if (p.y < -50) p.y = height + 50; 
          
          const scale = focalLength / (focalLength + p.z);
          elements.push({
              type: 'particle', z: p.z, x: p.x * scale + centerX * (1-scale), y: p.y, scale, glow: p.glow, size: p.size
          });
      });

      // 2. Generate Massive 3D DNA Construction
      const numRungs = 80; // High density calculation
      const overallHeight = height * 2.5; 
      
      for (let i = -numRungs; i <= numRungs; i++) {
          const y = i * (overallHeight / (numRungs * 2)); 
          
          // Pure Trigonometric 3D Rotation Calculation
          const angle = y * 0.005 + time * 2.0; 
          
          // Majestic swaying curve shifting through space
          const curveX = Math.sin(y * 0.001 - time * 0.2) * 150; 
          const offsetZ = 800; 

          // Strand 1 Coords
          const x1 = Math.cos(angle) * dnaRadius;
          const z1 = Math.sin(angle) * dnaRadius;
          
          // Strand 2 Coords (Offset by precisely half a rotation / Pi)
          const x2 = Math.cos(angle + Math.PI) * dnaRadius;
          const z2 = Math.sin(angle + Math.PI) * dnaRadius;
          
          // Projection 3D -> 2D Space
          const scale1 = focalLength / (focalLength + z1 + offsetZ);
          const drawX1 = (x1 + curveX) * scale1 + centerX;
          const drawY1 = y * scale1 + centerY;
          
          const scale2 = focalLength / (focalLength + z2 + offsetZ);
          const drawX2 = (x2 + curveX) * scale2 + centerX;
          const drawY2 = y * scale2 + centerY;

          // Build thick, textured "organic" cable backbones efficiently using clustered geometry
          for (let b = 0; b < 3; b++) {
             const bumpOffset = Math.sin(y + b * 2) * 6; 
             elements.push({
                 type: 'backbone', z: z1 + offsetZ + b, x: drawX1 + bumpOffset*scale1, y: drawY1 + bumpOffset*scale1, scale: scale1
             });
             elements.push({
                 type: 'backbone', z: z2 + offsetZ + b, x: drawX2 + bumpOffset*scale2, y: drawY2 + bumpOffset*scale2, scale: scale2
             });
          }

          // Connecting Rings / DNA Rungs
          const midZ = (z1 + z2)/2 + offsetZ;
          elements.push({
              type: 'rung', z: midZ, x1: drawX1, y1: drawY1, x2: drawX2, y2: drawY2, scale: (scale1+scale2)/2
          });

          // Embed high intensity glowing nodes periodically
          if (i % 4 === 0) {
              elements.push({
                  type: 'node', z: z1 + offsetZ - 10, x: drawX1, y: drawY1, scale: scale1 * 1.2
              });
          }
          if ((i+2) % 5 === 0) {
              elements.push({
                  type: 'node', z: z2 + offsetZ - 10, x: drawX2, y: drawY2, scale: scale2 * 1.2
              });
          }
      }

      // 3. Absolute Z-Depth Rendering Sequence (Painter's Algorithm)
      elements.sort((a, b) => b.z - a.z);

      // 4. Render Pipeline
      elements.forEach(el => {
          if (el.type === 'particle') {
              ctx.beginPath();
              ctx.arc(el.x, el.y, el.size * el.scale, 0, Math.PI * 2);
              if (el.glow) {
                  ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
                  ctx.shadowBlur = 25 * el.scale;
                  ctx.shadowColor = `rgba(${primaryPink}, 1)`;
              } else {
                  ctx.fillStyle = `rgba(${primaryPink}, 0.5)`;
                  ctx.shadowBlur = 0;
              }
              ctx.fill();
          } else if (el.type === 'rung') {
              // Thick base pair foundations
              ctx.beginPath();
              ctx.moveTo(el.x1, el.y1);
              ctx.lineTo(el.x2, el.y2);
              ctx.strokeStyle = `rgba(${deepBlue}, ${0.5 * el.scale})`;
              ctx.lineWidth = 14 * el.scale; 
              ctx.lineCap = 'round';
              ctx.stroke();
              
              // Internal highlighted core of rung
              ctx.beginPath();
              ctx.moveTo(el.x1, el.y1);
              ctx.lineTo(el.x2, el.y2);
              ctx.strokeStyle = `rgba(${backboneBlue}, ${0.8 * el.scale})`;
              ctx.lineWidth = 6 * el.scale;
              ctx.stroke();
          } else if (el.type === 'backbone') {
              // Primary 3D cluster sphere mimicking organic biological texture
              ctx.beginPath();
              ctx.arc(el.x, el.y, 22 * el.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${deepBlue}, 0.95)`;
              ctx.shadowBlur = 0;
              ctx.fill();
              
              // Specular lighting highlight creating a 3D spherical volume optical illusion
              ctx.beginPath();
              ctx.arc(el.x - 5*el.scale, el.y - 5*el.scale, 7 * el.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${backboneBlue}, 0.9)`;
              ctx.fill();
          } else if (el.type === 'node') {
              // Vibrant pink bio-illuminating blooms
              ctx.beginPath();
              ctx.arc(el.x, el.y, 8 * el.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, 1)`;
              ctx.shadowBlur = 40 * el.scale; 
              ctx.shadowColor = `rgba(${primaryPink}, 1)`;
              ctx.fill();
              ctx.shadowBlur = 0; // Explicit reset
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] flex items-center justify-center">
      <canvas 
          ref={canvasRef} 
          className="absolute origin-center w-[150vw] h-[150vh] rotate-[30deg]" 
      />
    </div>
  );
}
