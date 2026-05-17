"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, PlayCircle, Atom, Dna, Rocket, BookOpen, Microscope } from "lucide-react";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothScroll, [0, 1], [0, 200]);
  const y2 = useTransform(smoothScroll, [0, 1], [0, -150]);
  const y3 = useTransform(smoothScroll, [0, 1], [0, 300]);
  const scale = useTransform(smoothScroll, [0, 1], [1, 1.1]);
  const opacity = useTransform(smoothScroll, [0, 0.8], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-20 overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      
      {/* 3D Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ y: y1, x: 50 }} className="absolute top-[20%] left-[10%] opacity-40">
          <Atom size={80} className="text-primary animate-[spin_20s_linear_infinite]" />
        </motion.div>
        <motion.div style={{ y: y2, x: -50 }} className="absolute top-[60%] right-[15%] opacity-30">
          <Dna size={120} className="text-inverse-primary animate-[spin_30s_linear_infinite_reverse]" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute bottom-[10%] left-[20%] opacity-20">
          <Microscope size={60} className="text-secondary" />
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content Area */}
        <motion.div 
          style={{ opacity, y: useTransform(smoothScroll, [0, 1], [0, 100]) }}
          className="flex flex-col gap-8 items-center text-center lg:items-start lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="glass-panel px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Next-Gen Science Education</span>
          </div>
          
          <h1 className="font-display-2xl text-[clamp(40px,5vw,72px)] leading-[1.1] text-on-surface font-bold tracking-tight">
            The Cinematic Frontier of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-inverse-primary text-glow">
              Science Learning
            </span>
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl text-lg md:text-xl">
            Immerse yourself in a premium laboratory experience. High-tech, interactive environments designed for the modern student aiming for academic excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-surface font-label-caps text-label-caps tracking-widest neon-glow hover:neon-glow-hover transition-all duration-300 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.2)] flex items-center gap-3 relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out"></span>
              ENROLL NOW
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto justify-center px-8 py-4 rounded-full glass-panel text-on-surface font-label-caps text-label-caps tracking-widest border border-outline hover:bg-surface/20 hover:border-primary/50 transition-all duration-300 flex items-center gap-3 group">
              <PlayCircle size={20} className="text-primary group-hover:scale-110 transition-transform" />
              WATCH INTRO
            </button>
          </div>
        </motion.div>

        {/* Right 3D Visual Area */}
        <motion.div 
          style={{ 
            scale, 
            opacity, 
            y: useTransform(smoothScroll, [0, 1], [0, -50]),
            rotateX,
            rotateY
          }}
          className="relative w-full h-[500px] md:h-[700px] flex justify-center items-center perspective-1000 transform-style-3d"
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          {/* Futuristic Orbs */}
          <div className="absolute w-[120%] h-[120%] rounded-full border border-primary/10 border-dashed animate-[spin_60s_linear_infinite] z-0 transform translate-z-[-50px]"></div>
          <div className="absolute w-[90%] h-[90%] rounded-full border border-secondary/20 animate-[spin_40s_linear_infinite_reverse] z-0 transform translate-z-[-20px]"></div>
          
          {/* Main 3D Container */}
          <motion.div 
            className="relative z-10 w-[90%] h-[90%] glass-panel rounded-3xl border border-white/40 overflow-hidden shadow-2xl transform-style-3d group"
            style={{ translateZ: 50 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img 
              alt="Science Laboratory" 
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 scale-105 group-hover:scale-100" 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000"
            />
            
            {/* Overlay Glass Cards */}
            <motion.div 
              className="absolute top-8 -left-4 glass-panel p-4 rounded-xl border border-white/50 shadow-lg flex items-center gap-4 backdrop-blur-md transform translate-z-[100px]"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Rocket className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-label-caps text-xs text-on-surface-variant">Acceleration</p>
                <p className="font-bold text-on-surface text-lg">Future Ready</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-8 -right-4 glass-panel p-5 rounded-xl border border-white/50 shadow-lg flex flex-col gap-3 backdrop-blur-md min-w-[200px] transform translate-z-[120px]"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-xs text-on-surface-variant">Success Rate</span>
                <span className="font-bold text-primary">98%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-inverse-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "98%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
