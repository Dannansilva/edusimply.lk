"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, CheckCircle, AwardIcon } from "lucide-react";

export default function StudentResults() {
  // Floating badge settings
  const badges = [
    { grade: "A+", label: "Pure Maths", delay: 0.1, top: "20%", left: "10%", color: "border-primary/40 shadow-primary/10 text-primary" },
    { grade: "A", label: "Chemistry", delay: 0.3, top: "60%", left: "80%", color: "border-success/40 shadow-success/10 text-success" },
    { grade: "A+", label: "Physics", delay: 0.5, top: "15%", right: "15%", color: "border-primary-container/40 shadow-primary-container/10 text-primary-container" },
    { grade: "B+", label: "Applied Maths", delay: 0.2, top: "70%", left: "15%", color: "border-on-surface-variant/20 text-on-surface-variant" },
  ];

  // SVG Chart path calculation
  const chartPoints = "0,120 40,110 80,95 120,70 160,85 200,60 240,40 280,45 320,20 360,10";

  return (
    <section className="relative py-24 md:py-36 bg-surface/20 border-t border-outline-variant overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[40%] right-[10%] w-[380px] h-[380px] bg-primary/10 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Floating Badges */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: badge.delay }
            }}
            className={`absolute glass-panel p-4 rounded-2xl border flex flex-col items-center justify-center min-w-[100px] shadow-lg ${badge.color}`}
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
            }}
          >
            <span className="text-3xl font-black tracking-tighter font-display-lg">{badge.grade}</span>
            <span className="text-[10px] uppercase font-label-caps font-semibold opacity-70 tracking-widest mt-1">{badge.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side text */}
        <div className="flex flex-col gap-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-center lg:self-start"
          >
            <Award size={16} className="text-primary animate-pulse" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Proven Outcomes</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Record-Breaking <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Academic Results
            </span>
          </h2>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            Our students consistently outperform national averages. Immersive visual learning translates directly to exam clarity and outstanding grades.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-left">
            {[
              "95% O/L Mathematics A/B passes",
              "92% O/L Science A/B passes",
              "1,200+ students with straight A's",
              "100% curriculum coverage & revision"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-success shrink-0" />
                <span className="text-sm font-medium text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Visual: Glassmorphism Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-6 md:p-8 rounded-[32px] border border-white/5 shadow-2xl relative"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-xs uppercase font-label-caps tracking-widest text-on-surface-variant">Class Performance Index</span>
              <h3 className="text-xl font-bold text-white mt-1">Syllabus Mastery Curve</h3>
            </div>
            <div className="flex items-center gap-2 text-success bg-success/10 px-3 py-1 rounded-full text-xs font-bold">
              <TrendingUp size={14} />
              <span>+34% Growth</span>
            </div>
          </div>

          {/* SVG Animated Chart */}
          <div className="relative w-full h-[200px] border-b border-l border-white/10 flex items-end">
            <svg viewBox="0 0 360 130" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="360" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="360" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Path line drawing */}
              <motion.path
                d={`M ${chartPoints}`}
                fill="none"
                stroke="#E85D92"
                strokeWidth="3.5"
                className="drop-shadow-[0_0_10px_#E85D92]"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Path area gradient fill */}
              <motion.path
                d={`M 0,130 L ${chartPoints} L 360,130 Z`}
                fill="url(#gradient-chart)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              <defs>
                <linearGradient id="gradient-chart" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E85D92" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Bob nodes */}
            <div className="absolute bottom-[110px] left-[55%] w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
            <div className="absolute bottom-[125px] left-[98%] w-2.5 h-2.5 rounded-full bg-success ring-4 ring-success/20"></div>
          </div>

          <div className="flex justify-between text-xs text-on-surface-variant mt-4 font-mono">
            <span>Week 1</span>
            <span>Week 4</span>
            <span>Week 8</span>
            <span>Week 12 (Exams)</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
