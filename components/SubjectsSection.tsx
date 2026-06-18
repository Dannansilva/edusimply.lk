"use client";

import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Calculator,
  HelpCircle,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function SubjectsSection() {
  const categories = [
    {
      title: "WACE ATAR, Cambridge & Edexcel High School Tutoring",
      description:
        "Specialised support for senior high school students. Lessons focus on understanding key concepts, improving exam technique, practising questions, and building confidence before assessments.",
      icon: <GraduationCap className="text-primary" size={24} />,
      subjects: [
        "Biology",
        "Chemistry",
        "Physics",
        "Human Biology",
        "Social Sciences",
        "Economics",
      ],
    },
    {
      title: "University Science Tutoring",
      description:
        "Tailored to each student's university course content, helping simplify complex biomedical and scientific topics to support academic progress.",
      icon: <BookOpen className="text-primary" size={24} />,
      subjects: [
        "Biology",
        "Human Biology",
        "Anatomy and Physiology",
        "Biomedical Science",
        "Biochemistry",
        "Chemistry",
        "Nutrition",
        "Health Science",
        "Psychology",
        "Research skills",
        "Academic study support",
      ],
    },
    {
      title: "Lower High School Tutoring",
      description:
        "For students from Year 6 to Year 9. Strengthen understanding of mathematics and science, improve school performance, and prepare for higher-level study.",
      icon: <Calculator className="text-primary" size={24} />,
      subjects: [
        "Mathematics",
        "General Science",
        "Biology foundations",
        "Chemistry foundations",
        "Physics foundations",
      ],
    },
    {
      title: "Primary School Tutoring",
      description:
        "Helps primary school students build strong foundations in core subjects. Lessons are kept clear, engaging, and age-appropriate, helping students build confidence early.",
      icon: <Sparkles className="text-primary" size={24} />,
      subjects: ["Mathematics", "Science"],
    },
  ];

  const additionalSupport = [
    "Exam preparation",
    "Revision planning",
    "Practice questions",
    "Mock exams",
    "Homework support",
    "Study skills",
    "Active recall techniques",
    "Confidence building",
    "Academic mentoring",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="subjects"
      className="relative py-24 md:py-36 overflow-hidden bg-background border-t border-outline-variant"
    >
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary-container/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-24"
        >
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6">
            <Sparkles size={16} className="text-primary" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">
              Our Syllabus
            </span>
          </div>

          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Subjects We <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">
              Teach
            </span>
          </h2>

          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            EduSimply provides personalised tutoring across WACE ATAR,
            Cambridge, Edexcel, university-level science subjects, lower high
            school and primary school. Lessons are designed to suit each
            student’s learning level, academic goals, and confidence, with a
            focus on making difficult topics easier to understand.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-panel p-8 rounded-[32px] border border-white/5 shadow-lg flex flex-col justify-between hover:border-primary/20 hover:bg-surface/5 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center mb-6 shadow-md bg-white/5">
                  {cat.icon}
                </div>
                <h3 className="font-headline-md text-xl font-bold text-white mb-4">
                  {cat.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-label-caps tracking-wider text-primary font-bold mb-3">
                  Subjects:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl border border-primary/15 bg-primary/5 text-xs text-primary font-semibold"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Learning Support (Full Width Card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/5 shadow-xl max-w-6xl mx-auto mt-12 bg-surface/5"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <HeartHandshake size={20} />
                </div>
                <h3 className="font-headline-md text-on-surface text-xl font-bold">
                  Additional Learning Support
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Alongside subject tutoring, EduSimply helps students develop
                strong study habits, active recall techniques and confidence so
                they can become more independent learners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full md:max-w-2xl text-left">
              {additionalSupport.map((support, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  <span className="text-xs text-on-surface font-medium">
                    {support}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Not Sure If Your Subject Is Covered? Inquiry Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-8 md:p-10 rounded-[32px] border border-primary/20 shadow-2xl max-w-4xl mx-auto mt-12 bg-primary/5 text-center flex flex-col items-center gap-4"
        >
          <HelpCircle size={36} className="text-primary" />
          <h3 className="font-headline-md text-on-surface text-lg md:text-xl font-bold">
            Not Sure If Your Subject Is Covered?
          </h3>
          <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            If you are unsure whether EduSimply can support a specific subject,
            topic, or university module, you are welcome to get in touch.
            Lessons can often be tailored depending on the student’s course,
            syllabus, and learning goals.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-full border border-primary/30 text-xs font-bold font-label-caps uppercase text-primary hover:bg-primary/10 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
