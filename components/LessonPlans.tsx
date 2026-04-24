'use client';

import React from 'react';
import { Microscope, FlaskConical, Dna, Rocket, ArrowRight, Atom } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Atomic Architecture',
    description: 'Exploring the building blocks of matter and the forces that bind them.',
    icon: Atom,
    progress: 75,
    tag: 'Physics',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Chemical Catalysts',
    description: 'Understanding molecular interactions and the transformation of substance.',
    icon: FlaskConical,
    progress: 40,
    tag: 'Chemistry',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Biological Blueprint',
    description: 'Decoding the complexity of life from cellular structures to ecosystems.',
    icon: Dna,
    progress: 90,
    tag: 'Biology',
    color: 'tertiary',
  },
  {
    id: 4,
    title: 'Galactic Frontiers',
    description: 'Venturing into the unknown reaches of space and celestial mechanics.',
    icon: Rocket,
    progress: 15,
    tag: 'Astrophysics',
    color: 'secondary',
  }
];

const LessonPlans = () => {
  return (
    <section id="lessons" className="py-24 bg-surface-container/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Curriculum</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight">
              Interactive Lesson Plans <br />
              Tailored for Mastery
            </h3>
          </div>
          <p className="text-on-surface-variant text-lg max-w-md">
            Our modules are structured to challenge students while maintaining an approachable discovery path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-surface p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative border-t-4"
              style={{ borderTopColor: `var(--${course.color})` }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className={`p-3 rounded-lg bg-background text-${course.color}`}>
                  <course.icon className="w-8 h-8" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-${course.color}/10 text-${course.color} uppercase tracking-wider`}>
                  {course.tag}
                </span>
              </div>
              
              <h4 className="text-xl font-display font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {course.title}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                {course.description}
              </p>

              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
                  <span>Enrolled Growth</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-tertiary transition-all duration-1000`} 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm font-bold text-on-surface-variant group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LessonPlans;
