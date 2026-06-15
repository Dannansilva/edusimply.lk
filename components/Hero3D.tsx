"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      {/* Centered Large Background Watermark Logo */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
        <motion.div 
          className="relative w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] md:w-[680px] md:h-[680px] opacity-[0.04] invert mix-blend-screen"
          animate={{ 
            scale: [1, 1.03, 1],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Image
            src="/images/logo.jpeg"
            alt="EduSimply Background Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center text-center relative z-10 min-h-[calc(100vh-80px)]">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 items-center text-center max-w-3xl z-10"
        >
          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="font-display-2xl text-[38px] sm:text-[50px] md:text-[60px] leading-[1.1] text-on-surface font-bold tracking-tight select-none"
          >
            Where Learning <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">
              Feels Simple
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-5 text-on-surface-variant leading-relaxed mt-2 text-sm sm:text-base text-center items-center"
          >
            <p className="font-body-md font-medium text-on-surface max-w-2xl">
              At EduSimply, learning is made clear, supportive, and simple. Founded by Miss Pudamini Onethra Gomes, EduSimply helps students build confidence, understand difficult topics, and work towards their academic goals.
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-2xl">
              With over 5 years of tutoring experience, Miss Gomes has supported students across Australia and internationally through personalised, student-centred lessons. Her approach focuses on simple explanations, visual learning, active recall, and warm guidance, helping students feel supported rather than overwhelmed.
            </p>
          </motion.div>

          {/* Slogan Indicator */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 border-y border-primary/20 py-2.5 px-6 mt-3"
          >
            <span className="font-headline-md italic text-xs sm:text-sm text-primary font-semibold tracking-wider">
              EduSimply — Where Learning Feels Simple
            </span>
          </motion.div>
          
        </motion.div>

      </div>

      {/* Down Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-none z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-label-caps text-[9px] tracking-widest text-on-surface-variant uppercase font-semibold">Scroll to Learn</span>
        <ChevronDown size={14} className="text-on-surface-variant" />
      </motion.div>
    </section>
  );
}
