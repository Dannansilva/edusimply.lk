"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, BookOpen, PenTool, RefreshCw, Award } from "lucide-react";

export default function LearningExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const steps = [
    {
      title: "Join Class",
      description: "Easy onboarding and initial assessment to gauge student's current proficiency level.",
      icon: <UserPlus className="w-6 h-6 text-primary" />,
      color: "from-primary/30 to-transparent",
      glowColor: "rgba(232, 93, 146, 0.4)"
    },
    {
      title: "Learn Concepts",
      description: "Understand complex math and science topics through visual, interactive laboratory explanations.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      color: "from-primary/30 to-transparent",
      glowColor: "rgba(232, 93, 146, 0.4)"
    },
    {
      title: "Practice Questions",
      description: "Engage in curated mock exams, quizzes, and structured mathematics coordinate plotting challenges.",
      icon: <PenTool className="w-6 h-6 text-success" />,
      color: "from-success/30 to-transparent",
      glowColor: "rgba(74, 222, 128, 0.4)"
    },
    {
      title: "Revision Session",
      description: "Targeted revision classes, summary cards, and quick shortcut methods for O/L preparation.",
      icon: <RefreshCw className="w-6 h-6 text-primary-container" />,
      color: "from-primary-container/30 to-transparent",
      glowColor: "rgba(247, 168, 196, 0.4)"
    },
    {
      title: "Exam Success",
      description: "Walk into exams with confidence, armed with shortcuts and deep theoretical clarity to secure an A+.",
      icon: <Award className="w-6 h-6 text-success" />,
      color: "from-success/30 to-transparent",
      glowColor: "rgba(74, 222, 128, 0.4)"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-36 bg-surface/10 overflow-hidden">
      {/* Subtle grids or background glows */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">The Journey</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Our Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Methodology
            </span>
          </h2>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            A continuous, highly structured path designed to guide students from foundational understanding to academic excellence.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Vertical Timeline SVG Connector Line */}
          <div className="absolute top-12 bottom-12 left-8 md:left-1/2 w-[2px] bg-outline-variant -translate-x-1/2 pointer-events-none">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="#E85D92"
                strokeWidth="2"
                style={{ pathLength }}
                className="drop-shadow-[0_0_8px_#E85D92]"
              />
            </svg>
          </div>

          {/* Timeline Checkpoints */}
          <div className="w-full flex flex-col gap-16 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="flex flex-col md:flex-row items-center w-full">
                  
                  {/* Left Side Content (Even indices on desktop, empty on odd) */}
                  <div className={`w-full md:w-[45%] flex ${isEven ? "justify-end text-right" : "justify-start text-left md:order-last"} hidden md:flex`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel p-6 rounded-2xl border border-white/5 shadow-lg max-w-sm hover:border-primary/20 transition-all duration-300"
                      >
                        <h3 className="font-headline-md text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Icon Indicator (Middle Column) */}
                  <div className="w-16 h-16 rounded-full glass-panel border border-white/10 flex items-center justify-center relative z-20 md:mx-auto shrink-0 shadow-xl group-hover:scale-110 transition-transform bg-background left-8 md:left-0 -translate-x-1/2 md:translate-x-0" style={{ boxShadow: `0 0 20px ${step.glowColor}` }}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-surface to-surface-variant flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Right Side Content (Odd indices on desktop, all indices on mobile) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 flex ${!isEven ? "justify-start text-left" : "justify-end text-right md:order-first"} md:flex`}>
                    {(!isEven || true) && (
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        // Force desktop left/right alignment, but mobile is always left-aligned
                        className={`glass-panel p-6 rounded-2xl border border-white/5 shadow-lg max-w-sm hover:border-primary/20 transition-all duration-300 md:text-left text-left w-full
                          ${isEven ? "md:text-right" : "md:text-left"}
                          ${isEven ? "md:ml-auto" : "md:mr-auto"}
                          ${index > 0 ? "block" : "block"}
                        `}
                        style={{ contentVisibility: 'auto' }}
                      >
                        <div className="md:hidden">
                          <h3 className="font-headline-md text-lg font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-on-surface-variant text-xs leading-relaxed">{step.description}</p>
                        </div>
                        <div className="hidden md:block">
                          {!isEven ? (
                            <>
                              <h3 className="font-headline-md text-xl font-bold text-white mb-2">{step.title}</h3>
                              <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                            </>
                          ) : (
                            // Desktop Even spacing spacer to prevent double rendering
                            <div className="opacity-0 pointer-events-none select-none h-0 md:h-auto overflow-hidden">
                              <h3 className="font-headline-md text-xl font-bold text-white mb-2">{step.title}</h3>
                              <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
