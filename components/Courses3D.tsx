"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { BookMarked, Calculator, FlaskConical, Languages } from "lucide-react";
import { TiltCard } from "./ui/TiltCard";

const courses = [
  {
    title: "Advanced Physics",
    level: "A-Level",
    icon: <FlaskConical size={32} />,
    color: "from-primary to-primary-container",
    delay: 0,
    marginTopClass: "mt-0"
  },
  {
    title: "Mathematics",
    level: "O-Level & A-Level",
    icon: <Calculator size={32} />,
    color: "from-inverse-primary to-primary",
    delay: 0.1,
    marginTopClass: "mt-0 sm:mt-10"
  },
  {
    title: "Chemistry",
    level: "A-Level",
    icon: <BookMarked size={32} />,
    color: "from-secondary to-primary-container",
    delay: 0.2,
    marginTopClass: "mt-0 sm:mt-20"
  },
  {
    title: "English Lit",
    level: "O-Level",
    icon: <Languages size={32} />,
    color: "from-primary-container to-inverse-primary",
    delay: 0.3,
    marginTopClass: "mt-0 sm:mt-10"
  }
];

export default function Courses3D() {
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

  const scale = useTransform(smoothScroll, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] py-32 flex items-center justify-center overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Text Area */}
        <motion.div 
          style={{ opacity, x: useTransform(smoothScroll, [0, 1], [-100, 100]) }}
          className="flex-1 max-w-xl"
        >
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-inverse-primary animate-pulse shadow-[0_0_10px_var(--color-inverse-primary)]"></span>
            <span className="font-label-caps text-label-caps text-inverse-primary tracking-widest uppercase">Premium Curriculums</span>
          </div>
          
          <h2 className="font-display-2xl text-[clamp(40px,4vw,56px)] leading-[1.1] text-on-surface mb-6 font-bold tracking-tight">
            Cinematic Learning <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">Experiences</span>
          </h2>
          
          <p className="font-body-lg text-lg text-on-surface-variant mb-8">
            Every course is designed as a masterpiece. Interactive, visually stunning, and academically rigorous. We transform traditional textbooks into immersive digital journeys.
          </p>

          <button className="px-8 py-4 rounded-full bg-surface-variant/50 text-on-surface font-label-caps text-label-caps tracking-widest border border-outline hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-3 group backdrop-blur-md">
            EXPLORE ALL COURSES
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </motion.div>

        {/* Right 3D Cards Grid */}
        <motion.div 
          style={{ scale, opacity }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full relative"
        >
          {/* Floating glow behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/20 to-inverse-primary/20 blur-[120px] pointer-events-none rounded-full"></div>
          
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: course.delay, duration: 0.8, ease: "easeOut" }}
              className={`${course.marginTopClass}`}
            >
              <TiltCard className="w-full h-full rounded-3xl" innerClassName="p-8" glowColor="rgba(255, 30, 140, 0.4)">
                <div 
                  className="w-full h-full flex flex-col transform-style-3d group" 
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-full`} style={{ transform: "translateZ(-20px)" }}></div>
                  
                  <div 
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-12 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    style={{ transform: "translateZ(60px)" }}
                  >
                    {course.icon}
                  </div>
                  
                  <p className="font-label-caps text-xs text-on-surface-variant mb-2 tracking-widest uppercase" style={{ transform: "translateZ(30px)" }}>{course.level}</p>
                  <h3 className="font-headline-lg text-2xl text-on-surface font-bold" style={{ transform: "translateZ(50px)" }}>{course.title}</h3>
                  
                  <div 
                    className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
