"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Microscope, Globe2, Lightbulb, Zap } from "lucide-react";

export default function About3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothScroll, [0, 1], [100, -100]);
  const y2 = useTransform(smoothScroll, [0, 1], [150, -150]);
  const y3 = useTransform(smoothScroll, [0, 1], [200, -200]);
  
  const opacity = useTransform(smoothScroll, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] pt-48 pb-32 flex items-center justify-center overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10">
        
        <motion.div 
          style={{ opacity, y: useTransform(smoothScroll, [0, 1], [50, -50]) }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">The Academy</span>
          </div>
          <h2 className="font-display-2xl text-[clamp(32px,4vw,56px)] leading-[1.2] text-on-surface mb-6">
            Redefining the <span className="text-glow text-primary">Science</span> of Learning
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant">
            We are not just a tutoring center. We are an innovation hub designed to unlock your ultimate academic potential through immersive, technology-driven education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Card 1 */}
          <motion.div 
            style={{ y: y1 }}
            className="glass-panel p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-shadow transition-colors duration-500 transform-style-3d group"
            whileHover={{ rotateY: 5, rotateX: 5, z: 20 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Microscope size={32} className="text-primary" />
            </div>
            <h3 className="font-headline-lg text-2xl mb-4 text-on-surface">Scientific Approach</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Our curriculum is built on cognitive science principles, ensuring information is absorbed, retained, and applied with maximum efficiency.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            style={{ y: y2 }}
            className="glass-panel p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-shadow transition-colors duration-500 transform-style-3d group lg:-mt-12"
            whileHover={{ rotateY: 0, rotateX: 5, z: 20 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-inverse-primary/20 to-inverse-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={32} className="text-inverse-primary" />
            </div>
            <h3 className="font-headline-lg text-2xl mb-4 text-on-surface">Accelerated Pacing</h3>
            <p className="text-on-surface-variant leading-relaxed">
              We eliminate redundancies. Our targeted learning modules accelerate your progress, preparing you for Edexcel & Cambridge exams faster.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            style={{ y: y3 }}
            className="glass-panel p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-shadow transition-colors duration-500 transform-style-3d group"
            whileHover={{ rotateY: -5, rotateX: 5, z: 20 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe2 size={32} className="text-secondary" />
            </div>
            <h3 className="font-headline-lg text-2xl mb-4 text-on-surface">Global Standards</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Designed to meet and exceed international benchmarks, setting you up for success in universities worldwide.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
