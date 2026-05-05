"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Target, TrendingUp, Users } from "lucide-react";

export default function WhyChooseUs3D() {
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

  const rotateX = useTransform(smoothScroll, [0, 1], [20, -20]);
  const opacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      title: "Proven Excellence",
      description: "Consistent 98% pass rate across all A-Level subjects.",
      icon: <TrendingUp size={24} className="text-primary" />
    },
    {
      title: "Elite Mentors",
      description: "Learn from industry experts and academic veterans.",
      icon: <Users size={24} className="text-inverse-primary" />
    },
    {
      title: "Targeted Focus",
      description: "Personalized learning paths tailored to your goals.",
      icon: <Target size={24} className="text-secondary" />
    },
    {
      title: "Trusted Academy",
      description: "Recognized as a premier institute for digital education.",
      icon: <ShieldCheck size={24} className="text-primary" />
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80vh] py-32 flex items-center justify-center overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-30">
        <motion.div 
          style={{ rotate: useTransform(smoothScroll, [0, 1], [0, 90]) }}
          className="w-[800px] h-[800px] border border-primary/20 rounded-full border-dashed"
        />
        <motion.div 
          style={{ rotate: useTransform(smoothScroll, [0, 1], [0, -90]) }}
          className="absolute w-[600px] h-[600px] border border-inverse-primary/20 rounded-full"
        />
      </div>

      <motion.div 
        style={{ opacity, rotateX }}
        className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 glass-panel p-10 md:p-16 rounded-[40px] border border-white/40 shadow-2xl backdrop-blur-2xl transform-style-3d"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display-2xl text-[clamp(32px,4vw,48px)] leading-[1.2] text-on-surface mb-4 font-bold">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary">EduSimply</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant">
            We bridge the gap between potential and excellence using technology, data-driven insights, and immersive learning methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-full glass-panel border border-white/50 flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
                {feature.icon}
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
