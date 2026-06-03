"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, HeartHandshake, Compass, TrendingUp, FlaskConical, ShieldCheck } from "lucide-react";

export default function WhyChooseUs3D() {
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

  const opacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      title: "Simple Explanations",
      description: "We break complex mathematical and scientific equations into clear, visual diagrams.",
      icon: <Zap size={24} className="text-primary" />
    },
    {
      title: "Exam-Oriented Learning",
      description: "Rigorous practice with structural past papers, model questions, and speed techniques.",
      icon: <Target size={24} className="text-primary-container" />
    },
    {
      title: "Personalized Support",
      description: "Direct student-to-teacher communication for clarifying doubts outside class hours.",
      icon: <HeartHandshake size={24} className="text-success" />
    },
    {
      title: "Interactive Teaching",
      description: "Participate in virtual laboratory sessions and responsive visual simulation modules.",
      icon: <Compass size={24} className="text-primary" />
    },
    {
      title: "Progress Tracking",
      description: "Interactive analytics cards and feedback reports sent directly to parents monthly.",
      icon: <TrendingUp size={24} className="text-success" />
    },
    {
      title: "Practical Science Learning",
      description: "Watch real laboratory experiments and animations to bridge abstract textbook concepts.",
      icon: <FlaskConical size={24} className="text-primary-container" />
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] py-24 md:py-36 flex items-center justify-center overflow-hidden bg-background border-t border-outline-variant"
    >
      
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-20">
        <motion.div 
          style={{ rotate: useTransform(smoothScroll, [0, 1], [0, 60]) }}
          className="w-[800px] h-[800px] border border-primary/10 rounded-full border-dashed"
        />
        <div className="absolute w-[500px] h-[500px] bg-success/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <ShieldCheck size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Why Choose Us</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            The Advantage of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Modern Tutoring
            </span>
          </h2>
        </div>

        {/* Features Grid (2 columns on tablet, 3 columns on desktop) */}
        <motion.div 
          style={{ opacity }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, border: "rgba(232, 93, 146, 0.3) 1px solid" }}
              className="glass-panel p-8 rounded-3xl border border-white/5 shadow-lg flex flex-col items-start hover:shadow-2xl hover:bg-surface/60 transition-all duration-300 transform-style-3d group"
              style={{ contentVisibility: 'auto' }}
            >
              <div className="w-12 h-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center mb-6 shadow-md shadow-primary/5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-headline-md text-lg md:text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
