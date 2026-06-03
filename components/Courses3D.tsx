"use client";

import { motion } from "framer-motion";
import { Calculator, FlaskConical, Sparkles, BookOpen, Clock, ArrowRight } from "lucide-react";
import { TiltCard } from "./ui/TiltCard";

const courses = [
  {
    title: "Grade 6 Academy",
    description: "Foundational mathematics and basic scientific observation techniques for young minds.",
    subjects: ["Mathematics", "Science"],
    icon: <BookOpen className="text-primary" size={24} />,
    duration: "4 hours / week",
    color: "from-primary/20 to-transparent",
    glow: "rgba(232, 93, 146, 0.3)"
  },
  {
    title: "Grade 7 Academy",
    description: "Introduction to algebraic concepts, chemical elements, and natural energy laws.",
    subjects: ["Mathematics", "Science"],
    icon: <BookOpen className="text-primary" size={24} />,
    duration: "4 hours / week",
    color: "from-primary/20 to-transparent",
    glow: "rgba(232, 93, 146, 0.3)"
  },
  {
    title: "Grade 8 Academy",
    description: "Focus on equations, biological systems, basic electricity, and structural geometry.",
    subjects: ["Mathematics", "Science"],
    icon: <BookOpen className="text-primary" size={24} />,
    duration: "4 hours / week",
    color: "from-primary/20 to-transparent",
    glow: "rgba(232, 93, 146, 0.3)"
  },
  {
    title: "Grade 9 Academy",
    description: "Intermediate algebra, force vectors, and human physiological structures.",
    subjects: ["Mathematics", "Science"],
    icon: <BookOpen className="text-primary" size={24} />,
    duration: "4 hours / week",
    color: "from-primary/20 to-transparent",
    glow: "rgba(232, 93, 146, 0.3)"
  },
  {
    title: "Grade 10 Academy",
    description: "Advanced trigonometry, chemical equations, and physical optics prep for O/L.",
    subjects: ["Mathematics", "Science"],
    icon: <Calculator className="text-success" size={24} />,
    duration: "5 hours / week",
    color: "from-success/20 to-transparent",
    glow: "rgba(74, 222, 128, 0.2)"
  },
  {
    title: "Grade 11 Academy",
    description: "Full syllabus optimization, past paper analysis, and intensive G.C.E. O/L prep.",
    subjects: ["Mathematics", "Science"],
    icon: <Calculator className="text-success" size={24} />,
    duration: "5 hours / week",
    color: "from-success/20 to-transparent",
    glow: "rgba(74, 222, 128, 0.2)"
  },
  {
    title: "O/L Revision Core",
    description: "Fast-track mock paper session, revision of 5-year exam papers, and time shortcut blueprints.",
    subjects: ["Math & Science Revision"],
    icon: <FlaskConical className="text-primary-container" size={24} />,
    duration: "6 hours / week",
    color: "from-primary-container/20 to-transparent",
    glow: "rgba(247, 168, 196, 0.3)",
    highlight: true
  }
];

export default function Courses3D() {
  return (
    <section id="courses" className="relative py-24 md:py-36 bg-background overflow-hidden border-t border-outline-variant">
      {/* Background glow */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Curriculums</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Available Class <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Programs
            </span>
          </h2>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            Find the right level. All grades follow structured lesson sheets, interactive experiments, and intensive exam paper classes.
          </p>
        </div>

        {/* Courses Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              className={`${course.highlight ? "md:col-span-2 lg:col-span-3" : "col-span-1"}`}
              style={{ contentVisibility: 'auto' }}
            >
              <TiltCard 
                className="w-full h-full rounded-3xl" 
                innerClassName={`p-8 border bg-surface/40 h-full flex flex-col justify-between ${
                  course.highlight ? "border-primary/40 bg-gradient-to-r from-primary/5 via-transparent to-transparent" : "border-white/5"
                }`}
                glowColor={course.glow}
              >
                <div className="flex flex-col h-full transform-style-3d group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-background to-surface border border-white/10 flex items-center justify-center shadow-md">
                      {course.icon}
                    </div>
                    {course.highlight && (
                      <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase font-label-caps animate-pulse">
                        Most Enrolled
                      </span>
                    )}
                  </div>

                  <div className={course.highlight ? "grid grid-cols-1 lg:grid-cols-3 gap-6 items-center" : ""}>
                    <div className={course.highlight ? "lg:col-span-2" : ""}>
                      <h3 className="font-display-lg text-xl md:text-2xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{course.description}</p>
                    </div>

                    <div className={`flex flex-col gap-4 ${course.highlight ? "lg:col-span-1 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0" : ""}`}>
                      {/* Subjects tags */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {course.subjects.map((sub, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 text-on-surface-variant px-2.5 py-1 rounded-lg text-xs font-semibold">
                            {sub}
                          </span>
                        ))}
                      </div>

                      {/* Class Details */}
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
                        <Clock size={14} className="text-primary" />
                        <span>{course.duration}</span>
                      </div>

                      {/* Enroll CTA */}
                      <a href="#contact" className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 hover:from-primary hover:to-inverse-primary border border-primary/20 hover:border-transparent text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-primary">
                        Enroll Now
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
