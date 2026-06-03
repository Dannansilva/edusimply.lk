"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";
import { Calculator, FlaskConical, Binary, Sparkles, BookOpen } from "lucide-react";

export default function SubjectsSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-success/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Academic Focus</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold"
          >
            Deep Dive Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-success text-glow">
              Core Subjects
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6"
          >
            We transform challenging formulas and abstract concepts into intuitive, interactive visual stories.
          </motion.p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          {/* Card 1: Mathematics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TiltCard className="w-full h-full rounded-[32px]" innerClassName="p-8 md:p-12 border border-white/5 bg-surface/40" glowColor="rgba(232, 93, 146, 0.3)">
              <div className="flex flex-col h-full transform-style-3d group">
                
                {/* SVG Math Graphic overlay */}
                <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.08] pointer-events-none group-hover:opacity-15 transition-opacity duration-500 overflow-hidden" style={{ transform: "translateZ(-10px)" }}>
                  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white">
                    <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d="M 10,80 Q 50,10 90,80" strokeWidth="0.8" />
                  </svg>
                </div>

                <div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-inverse-primary flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/20 transform-style-3d group-hover:scale-110 transition-transform duration-300"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Calculator size={28} />
                </div>

                <h3 
                  className="font-display-lg text-2xl md:text-3xl font-bold text-white mb-4 transform-style-3d"
                  style={{ transform: "translateZ(40px)" }}
                >
                  Mathematics
                </h3>
                
                <p 
                  className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 font-body-md"
                  style={{ transform: "translateZ(25px)" }}
                >
                  Unlock logical deduction and algebraic principles. We make geometry, algebra, trigonometry, and calculus visual, structured, and simple.
                </p>

                <ul 
                  className="space-y-3 mb-8 text-sm text-on-surface-variant"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Interactive algebraic geometry graphing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Practical problem solving & past-paper analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Speed calculations & exam shortcut methods
                  </li>
                </ul>

                <div 
                  className="mt-auto flex items-center gap-3 text-primary font-bold text-sm hover:underline cursor-pointer"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <span>Explore Mathematics Syllabus</span>
                  <BookOpen size={16} />
                </div>

              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Science */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TiltCard className="w-full h-full rounded-[32px]" innerClassName="p-8 md:p-12 border border-white/5 bg-surface/40" glowColor="rgba(74, 222, 128, 0.2)">
              <div className="flex flex-col h-full transform-style-3d group">
                
                {/* SVG Science Graphic overlay */}
                <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.08] pointer-events-none group-hover:opacity-15 transition-opacity duration-500 overflow-hidden" style={{ transform: "translateZ(-10px)" }}>
                  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white">
                    <ellipse cx="50" cy="50" rx="40" ry="15" strokeWidth="0.5" transform="rotate(30 50 50)" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" strokeWidth="0.5" transform="rotate(150 50 50)" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" strokeWidth="0.5" />
                    <circle cx="16" cy="30" r="2" fill="currentColor" />
                    <circle cx="84" cy="70" r="2" fill="currentColor" />
                  </svg>
                </div>

                <div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success/80 to-primary flex items-center justify-center text-white mb-8 shadow-lg shadow-success/10 transform-style-3d group-hover:scale-110 transition-transform duration-300"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <FlaskConical size={28} />
                </div>

                <h3 
                  className="font-display-lg text-2xl md:text-3xl font-bold text-white mb-4 transform-style-3d"
                  style={{ transform: "translateZ(40px)" }}
                >
                  Science
                </h3>
                
                <p 
                  className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 font-body-md"
                  style={{ transform: "translateZ(25px)" }}
                >
                  Investigate natural laws, chemical compositions, and biological systems. We bridge the gap between theory and practical lab observations.
                </p>

                <ul 
                  className="space-y-3 mb-8 text-sm text-on-surface-variant"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Physics simulations (Electricity, Waves, Forces)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Chemistry molecular structures & reaction paths
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Biology diagrams with interactive explanations
                  </li>
                </ul>

                <div 
                  className="mt-auto flex items-center gap-3 text-success font-bold text-sm hover:underline cursor-pointer"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <span>Explore Science Syllabus</span>
                  <BookOpen size={16} />
                </div>

              </div>
            </TiltCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
