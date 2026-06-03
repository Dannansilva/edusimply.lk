"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ruwan Wijetunga",
    role: "Parent of Grade 10 Student",
    content: "My son used to struggle with geometry, but after joining EduSimply, he scored an A for maths. The visual simulators make all the difference.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5
  },
  {
    name: "Sadeepa Bandara",
    role: "O/L Student (Grade 11)",
    content: "The revision paper classes are excellent. The short-cut blueprints for physics equations saved me so much time in the term exams.",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5
  },
  {
    name: "Dr. Priyantha Perera",
    role: "University Lecturer & Parent",
    content: "As an academic, I am highly impressed by the pedagogical methods. Concept first teaching style is exactly what our educational system needs.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5
  },
  {
    name: "Methmi Silva",
    role: "Grade 9 Student",
    content: "I love the interactive Bohr atom simulation. Learning science feels like playing a futuristic game on the platform.",
    avatar: "https://i.pravatar.cc/150?img=49",
    rating: 5
  },
  {
    name: "Anura Jayasekara",
    role: "Parent of O/L Student",
    content: "Highly professional service. The monthly progress reports keep us updated, and the teacher is extremely supportive.",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5
  }
];

export default function Testimonials3D() {
  // Duplicate list to achieve seamless infinite scroll loops
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 md:py-36 bg-background overflow-hidden border-t border-outline-variant">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 border border-primary/20 shadow-[0_0_15px_rgba(232,93,146,0.25)]">
            <Quote size={24} className="text-primary" />
          </div>
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Success <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Stories
            </span>
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            Hear from students and parents who have unlocked academic excellence through our concept-oriented tutoring.
          </p>
        </div>

        {/* Custom Infinite Horizontal Marquee Scroll Track */}
        <div className="relative w-full overflow-hidden py-4 flex select-none">
          {/* Faders */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Inner Track */}
          <div className="flex gap-6 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] shrink-0 w-max">
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="glass-panel p-6 md:p-8 rounded-[24px] border border-white/5 shadow-md w-[320px] md:w-[380px] shrink-0 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300"
              >
                <div className="flex flex-col gap-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} size={14} className="text-primary fill-primary drop-shadow-[0_0_4px_rgba(232,93,146,0.6)]" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body-md italic">
                    &quot;{item.content}&quot;
                  </p>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-4 mt-6 border-t border-white/5 pt-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-label-caps uppercase mt-0.5 tracking-wider">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Global CSS animation fallback injected for standard marquee motion */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
