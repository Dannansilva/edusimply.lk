"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function Contact3D() {
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

  const y = useTransform(smoothScroll, [0, 1], [100, -50]);
  const opacity = useTransform(smoothScroll, [0, 0.3], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] py-32 flex items-center justify-center overflow-hidden perspective-1000"
      style={{ position: 'relative' }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none"></div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left Info */}
        <div className="flex flex-col gap-8">
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-start">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Get in Touch</span>
          </div>
          
          <h2 className="font-display-2xl text-[clamp(40px,4vw,64px)] leading-[1.1] text-on-surface font-bold">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">Accelerate?</span>
          </h2>
          
          <p className="font-body-lg text-lg text-on-surface-variant max-w-md">
            Step into the future of education. Contact our admissions team to secure your place in our next cohort.
          </p>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-primary/20 group-hover:bg-primary/10 transition-colors">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant font-label-caps">Email</p>
                <p className="font-bold text-on-surface">admissions@edusimply.lk</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-primary/20 group-hover:bg-primary/10 transition-colors">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant font-label-caps">Phone</p>
                <p className="font-bold text-on-surface">+94 11 234 5678</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-primary/20 group-hover:bg-primary/10 transition-colors">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant font-label-caps">Location</p>
                <p className="font-bold text-on-surface">Colombo Innovation Tower, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <motion.div 
          className="glass-panel p-8 md:p-10 rounded-[32px] border border-white/40 shadow-2xl backdrop-blur-2xl transform-style-3d group relative"
          whileHover={{ rotateY: -2, rotateX: 2, z: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[32px] pointer-events-none"></div>
          
          <form className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">First Name</label>
                <input type="text" className="w-full bg-surface/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-md" placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Last Name</label>
                <input type="text" className="w-full bg-surface/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-md" placeholder="Doe" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Email Address</label>
              <input type="email" className="w-full bg-surface/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-md" placeholder="john@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Message</label>
              <textarea rows={4} className="w-full bg-surface/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-md resize-none" placeholder="How can we help you?"></textarea>
            </div>

            <button type="button" className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold tracking-widest neon-glow hover:neon-glow-hover transition-all duration-300 flex items-center justify-center gap-3">
              SEND MESSAGE
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
