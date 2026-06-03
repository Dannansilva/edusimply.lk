"use client";

import { motion } from "framer-motion";
import { Sparkles, Grid } from "lucide-react";

export default function GallerySection() {
  const images = [
    {
      title: "Interactive Classroom",
      category: "In-Person",
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
      size: "col-span-1 md:col-span-2 row-span-1"
    },
    {
      title: "Online Class Workspace",
      category: "Digital",
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      size: "col-span-1"
    },
    {
      title: "Collaborative Study Group",
      category: "Community",
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      size: "col-span-1"
    },
    {
      title: "Science Experiments Lab",
      category: "Practical",
      url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      size: "col-span-1 md:col-span-2 row-span-1"
    }
  ];

  return (
    <section className="relative py-24 md:py-36 bg-background overflow-hidden border-t border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <Grid size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Campus Life</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Immersive Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-success text-glow">
              Environments
            </span>
          </h2>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            A window into the high-tech, welcoming spaces where our mathematics and science students prepare to lead the future.
          </p>
        </div>

        {/* Apple-Style Expandable Reveal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-[32px] cursor-pointer group shadow-xl ${img.size}`}
              initial={{ 
                clipPath: "inset(10% 10% 10% 10% round 24px)", 
                opacity: 0,
                y: 40
              }}
              whileInView={{ 
                clipPath: "inset(0% 0% 0% 0% round 32px)", 
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              style={{ contentVisibility: 'auto' }}
            >
              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 p-6 md:p-8 flex flex-col justify-end">
                <span className="font-label-caps text-[10px] tracking-widest text-primary uppercase font-bold mb-1">
                  {img.category}
                </span>
                <h3 className="font-display-lg text-lg md:text-xl font-bold text-white group-hover:text-primary-container transition-colors">
                  {img.title}
                </h3>
              </div>

              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-[280px] md:h-[340px] object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
