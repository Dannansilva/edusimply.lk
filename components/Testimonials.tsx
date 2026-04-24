'use client';

import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "The approach to physics here is unlike any other. It makes the complex feel incredibly simple and exciting.",
    author: "Sarah Jenkins",
    role: "Physics Student",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    text: "As a teacher, I've seen my students' engagement skyrocket since we started using Science Academy modules.",
    author: "Dr. Robert Chen",
    role: "Head of Science, Heights High",
    image: "https://i.pravatar.cc/150?u=robert"
  },
  {
    text: "The visual aids and interactive elements help me visualize problems that used to be impossible to grasp.",
    author: "James Wilson",
    role: "Undergraduate Researcher",
    image: "https://i.pravatar.cc/150?u=james"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-on-surface">Voices of the Academy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-10 bg-surface rounded-2xl shadow-xl hover:shadow-2xl transition-all group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 group-hover:scale-110 transition-transform">
                <Quote className="w-24 h-24 text-on-surface-variant rotate-180" />
              </div>
              
              <p className="text-on-surface-variant text-lg italic mb-10 leading-relaxed relative z-10">
                &quot;{t.text}&quot;
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-14 h-14 rounded-full border-2 border-primary grayscale group-hover:grayscale-0 transition-all shadow-md"
                />
                <div>
                  <div className="font-display font-bold text-on-surface">{t.author}</div>
                  <div className="text-sm text-on-surface-variant">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
