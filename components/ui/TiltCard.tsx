"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function TiltCard({ 
  children, 
  className = "", 
  innerClassName = "",
  glowColor = "rgba(255, 30, 140, 0.5)",
  onClick 
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth return
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (-15 to 15 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  // Lighting/Glare effect calculations
  const [isHovered, setIsHovered] = useState(false);
  const glareX = useTransform(springX, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(springY, [-0.5, 0.5], [100, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return to center
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current || e.touches.length === 0) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const touch = e.touches[0];
    // Calculate touch position relative to the center of the card (-0.5 to 0.5)
    let touchX = (touch.clientX - rect.left) / width - 0.5;
    let touchY = (touch.clientY - rect.top) / height - 0.5;
    
    // Clamp values so it doesn't spin out of control if touch moves slightly outside element
    touchX = Math.max(-0.5, Math.min(0.5, touchX));
    touchY = Math.max(-0.5, Math.min(0.5, touchY));

    x.set(touchX);
    y.set(touchY);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group cursor-pointer perspective-1000 ${className}`}
    >
      {/* 
        The glare effect - creates the "glossy 3D card" look by moving a gradient 
        opposite to the mouse movement.
      */}
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none rounded-[inherit] overflow-hidden"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <motion.div 
          className="absolute inset-0 opacity-40 blur-md"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          }}
        />
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glowColor} 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      {/* The main content container - children must use translateZ to pop out! */}
      <div 
        className={`relative w-full h-full rounded-[inherit] transform-style-3d bg-surface/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-colors duration-500 group-hover:border-white/40 ${innerClassName}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
