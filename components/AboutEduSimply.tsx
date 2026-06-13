"use client";

import { useRef } from "react";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutEduSimply() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] py-24 md:py-36 flex items-center justify-center overflow-hidden border-t border-outline-variant bg-background"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6">
            <ShieldCheck size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">
              About the Academy
            </span>
          </div>

          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">
              EduSimply
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Academy Core narrative (Grid Span 7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 lg:col-span-7 text-left"
          >
            <motion.p
              variants={itemVariants}
              className="font-body-lg text-base md:text-lg text-white font-medium leading-relaxed"
            >
              EduSimply provides personalised tutoring across a wide range of
              science subjects, including Biology, Chemistry, Physics, Human
              Biology, General Science, Anatomy and Physiology, Biochemistry and
              more. Lessons are available for primary school, high school,
              university, and adult learners, ensuring support is tailored to
              each learner’s stage, goals, and academic needs.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              At EduSimply, every student is taught personally by Miss Gomes.
              Rather than using a one-size-fits-all approach, lessons are
              adapted to suit each student&apos;s learning style, strengths, and
              areas for improvement. Whether a student learns best through
              visual explanations, practice questions, discussion-based
              learning, or structured revision plans, lessons are designed to
              help them learn in the way that works best for them.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              EduSimply offers both one-on-one tutoring and group sessions,
              providing flexible learning options for students and families.
              Alongside regular lessons, students receive personalised revision
              notes, mock examinations, homework support, exam preparation
              guidance, study skills coaching, and mentoring to help them build
              confidence and achieve their academic goals.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              Today, EduSimply continues to help students strengthen subject
              knowledge, improve grades, prepare for examinations, develop
              effective study habits, and build lasting confidence in their
              learning journey. The goal is not only academic success but also
              helping students become independent, motivated, and capable
              learners who feel empowered to reach their full potential.
            </motion.p>
          </motion.div>

          {/* Right Column: Values & Inspiration Card Grid (Grid Span 5) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-8 relative"
          >
            {/* Core Values Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-panel p-6 sm:p-8 rounded-[32px] border border-white/5 shadow-xl bg-surface/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Heart size={20} />
                </div>
                <h3 className="font-headline-md text-white text-lg font-bold">
                  Our Core Values
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                The values at the heart of EduSimply are patience,
                encouragement, consistency, and clear communication. Learning
                should feel supportive rather than stressful, and students are
                encouraged to ask questions, make mistakes, and develop
                confidence in their abilities. Families are kept informed
                through regular feedback and progress updates, creating a
                collaborative approach to student success.
              </p>
            </motion.div>

            {/* Inspiration Story Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-panel p-6 sm:p-8 rounded-[32px] border border-white/5 shadow-xl bg-surface/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-headline-md text-white text-lg font-bold">
                  The Inspiration
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                The inspiration behind EduSimply began during Miss Gomes&apos;s
                own school years, where she often supported classmates and peers
                with their studies. Seeing others improve their understanding,
                gain confidence, and achieve strong results sparked a passion
                for teaching that continued to grow over time. What started as
                helping fellow students eventually developed into a tutoring
                service dedicated to supporting learners from diverse
                backgrounds and educational levels.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
