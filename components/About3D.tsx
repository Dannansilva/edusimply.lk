"use client";

import { useRef } from "react";
import { Award, Users, Heart } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function About3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Profile & Floating Glass Cards (Grid Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            {/* Main Profile Shield/Glow container */}
            <motion.div 
              className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] rounded-[45px] bg-gradient-to-br from-primary/10 to-transparent border border-outline shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Profile Image of Miss Gomes */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/person.jpeg"
                  alt="Miss Pudamini Onethra Gomes"
                  fill
                  className="object-cover object-top filter contrast-[1.02] brightness-[1.02]"
                  priority
                />
              </div>

              {/* Static background rings inside profile */}
              <motion.div 
                className="absolute w-[90%] h-[90%] border border-primary/15 rounded-full z-20"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute w-[70%] h-[70%] border border-primary-container/10 rounded-full border-dashed z-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </motion.div>

            {/* Profile Label Below Image */}
            <motion.div 
              className="text-center mt-2 flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-bold text-on-surface text-xl">Miss Pudamini Gomes</h3>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest font-label-caps mt-0.5">Senior Mathematics & Science Tutor</p>
              
              {/* Tutoring stats highlights */}
              <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant font-medium pt-2 border-t border-outline w-full justify-center">
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-primary" />
                  <span>5+ Years Experience</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-outline"></span>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-primary" />
                  <span>Australia & International</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Teacher Story & Narrative (Grid Span 7) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 lg:col-span-7 text-center lg:text-left"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-center lg:self-start"
            >
              <Heart size={16} className="text-primary" />
              <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">About Miss Gomes</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold"
            >
              Meet Miss <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">
                Pudamini Gomes
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed"
            >
              Miss Gomes holds a Bachelor of Science in Biomedical Science with a GPA of 3.6/4.0 and was recognised as a Higher Academic Achievement Medalist. She is also completing a Master of Medical and Health Science by Research, building on her strong academic background in science and health research, and looking forward to completing a PhD.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              Over the years, she has tutored many students, helping them improve their confidence, prepare for exams, strengthen subject knowledge, and work towards their academic goals.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed"
            >
              Miss Gomes started EduSimply because she wanted to become the kind of teacher she once wished she had, someone patient, clear, encouraging, and able to make learning feel less complicated. Her approach is warm, structured, and student-centred, with a focus on helping each learner feel supported rather than overwhelmed.
            </motion.p>

            {/* Why Families Choose EduSimply Subsection */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 border-t border-outline-variant pt-6 flex flex-col gap-4 text-left"
            >
              <h3 className="font-headline-md text-lg font-bold text-white uppercase tracking-wider">Why Families Choose EduSimply</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                EduSimply is built on trust, care, and clear communication. Parents are kept informed through progress updates and feedback, while students are guided with lessons that match their pace, learning style, and goals.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                From exam preparation to building confidence, EduSimply is here to make learning feel simple, achievable, and encouraging.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#0078E6]"></span>
                <span className="font-headline-md italic text-xs sm:text-sm text-primary font-semibold">
                  EduSimply — Where Learning Feels Simple
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
