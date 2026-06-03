"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

export default function About3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Parallax shifts for floating elements
  const yFloatingCard1 = useTransform(smoothScroll, [0, 1], [-40, 40]);
  const yFloatingCard2 = useTransform(smoothScroll, [0, 1], [40, -40]);
  const opacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] py-24 md:py-36 flex items-center justify-center overflow-hidden border-t border-outline-variant bg-background"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Profile & Floating Glass Cards (Grid Span 5) */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[400px] md:h-[500px]">
            {/* Main Profile Shield/Glow container */}
            <motion.div 
              style={{ opacity }}
              className="relative w-72 h-96 rounded-[40px] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md"
            >
              {/* Animated background rings inside profile */}
              <div className="absolute w-64 h-64 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-48 h-48 border border-success/15 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Centered Icon Representing Teacher profile */}
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-inverse-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <GraduationCap size={44} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Senior Tutor</h3>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label-caps mt-1">Math & Science Specialist</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Card 1 (Top Left) */}
            <motion.div
              style={{ y: yFloatingCard1 }}
              className="absolute top-8 left-[-16px] md:left-[-32px] glass-panel p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-3 backdrop-blur-md max-w-[200px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Award className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-headline-md">10+ Years Exp.</h4>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase mt-0.5">Trained Educator</p>
              </div>
            </motion.div>

            {/* Floating Glass Card 2 (Bottom Right) */}
            <motion.div
              style={{ y: yFloatingCard2 }}
              className="absolute bottom-8 right-[-16px] md:right-[-32px] glass-panel p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-3 backdrop-blur-md max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center shrink-0">
                <Users className="text-success" size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-headline-md">B.Sc. Graduate</h4>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase mt-0.5">Concept-first teaching</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Teacher Story & Narrative (Grid Span 7) */}
          <motion.div 
            style={{ opacity, y: useTransform(smoothScroll, [0, 1], [40, -40]) }}
            className="flex flex-col gap-6 lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-center lg:self-start">
              <BookOpen size={16} className="text-primary" />
              <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">The Educator</span>
            </div>
            
            <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
              Simplifying the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-success text-glow">
                Concepts that Matter
              </span>
            </h2>
            
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
              Tuition isn&apos;t about memorizing formulas. It&apos;s about developing a core spatial and logical understanding. With over a decade of classroom experience, our classes bridge the gap between abstract textbook theories and clear, practical knowledge.
            </p>
            
            <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
              We specialize in preparing Grade 6-11 and O/L students for exam success, combining rigorous past-paper practices with next-generation visual graphics that keep students fully engaged.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#E85D92]"></span>
                <span className="text-sm font-semibold text-white">English & Sinhala Medium</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_#4ADE80]"></span>
                <span className="text-sm font-semibold text-white">Proven O/L A+ Blueprint</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
