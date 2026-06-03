"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="font-display-2xl text-[44px] md:text-[64px] font-black text-on-surface tracking-tight select-none">
      <motion.span>{rounded}</motion.span>
      <span className="text-primary text-glow">{suffix}</span>
    </span>
  );
}

export default function TrustSection() {
  const stats: StatItemProps[] = [
    { value: 5000, suffix: "+", label: "Students Taught" },
    { value: 95, suffix: "%", label: "Exam Success Rate" },
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 100, suffix: "%", label: "Student Focused" },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-surface/30 border-y border-outline-variant backdrop-blur-md overflow-hidden">
      {/* Subtle lines or glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-center p-6 glass-panel rounded-2xl border border-outline-variant shadow-sm group hover:border-primary/20 transition-all duration-300"
          >
            <div className="mb-2">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <span className="font-label-caps text-xs md:text-sm tracking-widest text-on-surface-variant uppercase font-medium">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
