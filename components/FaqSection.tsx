"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

function AccordionItem({ question, answer, isOpen, onClick }: FaqItem & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-outline-variant py-4 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-4 text-white hover:text-primary transition-colors focus:outline-none"
      >
        <span className="font-headline-md text-base md:text-lg font-semibold pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-on-surface-variant shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed pb-6 pt-2 font-body-md">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What grades do you teach?",
      answer: "We offer professional Mathematics and Science classes for students in Grade 6 to Grade 11, with dedicated G.C.E. O/L Revision and paper classes."
    },
    {
      question: "Are classes held online or in-person?",
      answer: "Both! We conduct immersive interactive online sessions with real-time simulations, and physical classes at our tutoring academies in Colombo."
    },
    {
      question: "How do parents track student progress?",
      answer: "EduSimply provides parents with monthly progress cards, detailed test performance analytics, and direct support links with the teacher."
    },
    {
      question: "What syllabuses do you cover?",
      answer: "We primarily cover the Sri Lankan National Curriculum for English & Sinhala medium G.C.E. O/L. We also cover fundamental math & science concepts suited for Cambridge/Edexcel juniors."
    },
    {
      question: "How can I enroll in a class?",
      answer: "Simply click the 'Start Learning' CTA or fill out the contact form below. Our support coordinator will get in touch with you immediately to complete the setup."
    }
  ];

  return (
    <section className="relative py-24 md:py-36 bg-surface/10 border-t border-outline-variant overflow-hidden">
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4 flex flex-col gap-6 text-center lg:text-left self-start lg:sticky lg:top-32">
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-center lg:self-start">
            <HelpCircle size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Frequently Asked</span>
          </div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[48px] leading-[1.2] text-white font-bold">
            Questions & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container text-glow">
              Answers
            </span>
          </h2>
          
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
            Everything you need to know about our schedules, teaching styles, learning platforms, and curriculum.
          </p>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-8 glass-panel p-6 md:p-10 rounded-[32px] border border-white/5 shadow-2xl backdrop-blur-md">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
