"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "A-Level Student",
    content: "The immersive approach totally changed how I study. Physics used to be abstract, but here, everything is visualized and clear.",
    avatar: "https://i.pravatar.cc/150?img=44",
    offset: -20
  },
  {
    name: "David Chen",
    role: "University Freshman",
    content: "I achieved 3 A*s thanks to the targeted methodologies. The digital learning environment is years ahead of normal schools.",
    avatar: "https://i.pravatar.cc/150?img=11",
    offset: 20
  },
  {
    name: "Amelia Rose",
    role: "O-Level Student",
    content: "EduSimply isn't just classes; it's an experience. The educators are brilliant, and the high-tech platform makes learning addictive.",
    avatar: "https://i.pravatar.cc/150?img=9",
    offset: -10
  }
];

export default function Testimonials3D() {
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

  const scale = useTransform(smoothScroll, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] py-32 flex items-center justify-center overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <motion.div 
        style={{ scale, opacity }}
        className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 border border-primary/20 shadow-[0_0_20px_rgba(153,64,93,0.3)]">
            <Quote size={28} className="text-primary" />
          </div>
          <h2 className="font-display-2xl text-[clamp(32px,4vw,48px)] leading-[1.2] text-on-surface mb-4 font-bold">
            Success <span className="text-glow text-inverse-primary">Stories</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant">
            Join thousands of students who have transformed their academic trajectories with our cinematic approach.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: testimonial.offset, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05, z: 30, rotateY: i === 0 ? 5 : i === 2 ? -5 : 0 }}
              className="glass-panel p-8 md:p-10 rounded-[32px] border border-white/40 shadow-xl max-w-md w-full transform-style-3d group relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-inverse-primary rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
              
              <Quote size={40} className="text-primary/20 absolute top-8 left-8" />
              
              <p className="text-on-surface text-lg leading-relaxed mb-8 relative z-10 font-body-lg mt-6">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{testimonial.name}</h4>
                  <p className="text-sm text-on-surface-variant font-label-caps">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
