"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, BookOpen, ChevronDown, Compass, Award } from "lucide-react";

// Simple Magnetic Button Wrapper Component
function MagneticButton({ children, className, href }: { children: React.ReactNode; className: string; href?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Limit pull to 18px max
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="w-full sm:w-auto"
      >
        <a href={href} className={className}>
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="w-full sm:w-auto"
    >
      <button className={className}>
        {children}
      </button>
    </motion.div>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Scroll animations
  const yText = useTransform(smoothScroll, [0, 0.5], [0, 80]);
  const opacityText = useTransform(smoothScroll, [0, 0.45], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      {/* 3D Scene viewport fits right here as fixed background behind this */}
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 min-h-[calc(100vh-80px)]">
        
        {/* Left Content Area (Grid span 7 for spacious look) */}
        <motion.div 
          style={{ opacity: opacityText, y: yText }}
          className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sparkles tag */}
          <div className="glass-panel px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Digital Academy Sri Lanka</span>
          </div>
          
          {/* Main Title */}
          <h1 className="font-display-2xl text-[40px] sm:text-[56px] md:text-[68px] leading-[1.05] text-on-surface font-bold tracking-tight select-none">
            Making Science & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-success text-glow">
              Mathematics Simple
            </span>
          </h1>
          
          {/* Description */}
          <p className="font-body-lg text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed mt-2">
            Interactive lessons, proven teaching methods, and personalized guidance that help students achieve academic excellence.
          </p>
          
          {/* CTAs with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-6 w-full sm:w-auto items-center">
            
            <MagneticButton href="#contact" className="w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-inverse-primary text-white font-label-caps text-xs tracking-widest uppercase font-semibold neon-glow hover:neon-glow-hover transition-all duration-300 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.25)] flex items-center gap-3 relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out"></span>
              Start Learning
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton href="#courses" className="w-full sm:w-auto justify-center px-8 py-4 rounded-full glass-panel text-on-surface font-label-caps text-xs tracking-widest uppercase font-semibold border border-outline-variant hover:bg-white/5 hover:border-primary/40 transition-all duration-300 flex items-center gap-3 group">
              Explore Classes
              <BookOpen size={16} className="text-primary group-hover:scale-110 transition-transform" />
            </MagneticButton>
            
          </div>
        </motion.div>

        {/* Right side spacer for the 3D scene (spans 5 columns) */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none h-[400px]"></div>

      </div>

      {/* Down Scroll Indicator */}
      <motion.div 
        style={{ opacity: opacityText }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-none z-10"
      >
        <span className="font-label-caps text-[9px] tracking-widest text-on-surface-variant uppercase font-semibold">Scroll to Learn</span>
        <ChevronDown size={14} className="text-on-surface-variant" />
      </motion.div>
    </section>
  );
}
