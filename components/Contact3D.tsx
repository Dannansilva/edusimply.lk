"use client";

import { useRef, useState } from "react";
import {
  Send,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

export default function Contact3D() {
  // Input fields state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Focus tracking for floating labels
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation / Submission states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^[0-9+ ]{8,15}$/.test(formData.phone)) {
      tempErrors.phone = "Invalid phone number";
    }
    if (!formData.message.trim())
      tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Simulate API submit delay
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] py-24 md:py-36 flex items-center justify-center overflow-hidden bg-background border-t border-outline-variant"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column Info */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 self-start">
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">
              Contact Us
            </span>
          </div>

          <h2 className="font-display-2xl text-[36px] md:text-[50px] leading-[1.1] text-white font-bold">
            Contact <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">
              EduSimply
            </span>
          </h2>

          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            We would love to hear from you. Whether you are a parent looking for
            tutoring support, a high school student preparing for exams, or a
            university student needing help with science subjects, EduSimply is
            here to make learning feel simple and supportive.
          </p>

          {/* Contact details */}
          <div className="flex flex-col gap-5 mt-2">
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors bg-white/5">
                <Users className="text-primary" size={18} />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase font-bold tracking-wider">
                  Tutor Name
                </p>
                <p className="font-bold text-white text-sm">
                  Miss Pudamini Onethra Gomes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors bg-white/5">
                <Mail className="text-primary" size={18} />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase font-bold tracking-wider">
                  Email Address
                </p>
                <p className="font-bold text-white text-sm">
                  edusimply.tutoring@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors bg-white/5">
                <Phone className="text-primary" size={18} />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase font-bold tracking-wider">
                  Australia Phone
                </p>
                <p className="font-bold text-white text-sm">+61 426 377 543</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors bg-white/5">
                <Phone className="text-primary" size={18} />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-label-caps uppercase font-bold tracking-wider">
                  Sri Lanka WhatsApp Only
                </p>
                <p className="font-bold text-white text-sm">+94 756 546 543</p>
              </div>
            </div>
          </div>

          {/* Enquiries Welcome Subsection */}
          <div className="mt-4 border-t border-outline-variant pt-6 flex flex-col gap-3">
            <h4 className="text-xs uppercase font-label-caps tracking-wider text-white font-bold">
              Enquiries Welcome
            </h4>
            <ul className="text-xs text-on-surface-variant list-disc pl-4 space-y-1.5 leading-relaxed">
              <li>Subject tutoring enquiries</li>
              <li>WACE ATAR, Cambridge, or Edexcel support</li>
              <li>University science tutoring</li>
              <li>Primary and high school tutoring</li>
              <li>Online tutoring information</li>
              <li>Lesson availability and bookings</li>
            </ul>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
              EduSimply offers tutoring support for students in Australia, Sri
              Lanka, and internationally through flexible online learning
              options.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#0078E6]"></span>
              <span className="font-headline-md italic text-xs text-primary font-semibold">
                EduSimply — Where Learning Feels Simple
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Form */}
        <div className="glass-panel p-8 md:p-10 rounded-[32px] border border-white/5 shadow-2xl relative">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name field */}
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  className={`w-full bg-surface/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 backdrop-blur-md pt-6 pb-2 ${
                    errors.name
                      ? "border-error"
                      : focusedField === "name"
                        ? "border-primary shadow-[0_0_10px_rgba(0,120,230,0.15)]"
                        : "border-white/5"
                  }`}
                />
                <label
                  className={`absolute left-5 pointer-events-none transition-all duration-300 uppercase tracking-wider font-label-caps text-[10px] font-bold ${
                    focusedField === "name" || formData.name
                      ? "top-2 text-primary text-xs scale-90 origin-left"
                      : "top-5 text-on-surface-variant"
                  }`}
                >
                  Full Name
                </label>
                {errors.name && (
                  <span className="text-xs text-error flex items-center gap-1 mt-1 pl-1">
                    <AlertCircle size={12} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  className={`w-full bg-surface/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 backdrop-blur-md pt-6 pb-2 ${
                    errors.email
                      ? "border-error"
                      : focusedField === "email"
                        ? "border-primary shadow-[0_0_10px_rgba(0,120,230,0.15)]"
                        : "border-white/5"
                  }`}
                />
                <label
                  className={`absolute left-5 pointer-events-none transition-all duration-300 uppercase tracking-wider font-label-caps text-[10px] font-bold ${
                    focusedField === "email" || formData.email
                      ? "top-2 text-primary text-xs scale-90 origin-left"
                      : "top-5 text-on-surface-variant"
                  }`}
                >
                  Email Address
                </label>
                {errors.email && (
                  <span className="text-xs text-error flex items-center gap-1 mt-1 pl-1">
                    <AlertCircle size={12} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Phone field */}
              <div className="relative w-full">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={handleBlur}
                  className={`w-full bg-surface/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 backdrop-blur-md pt-6 pb-2 ${
                    errors.phone
                      ? "border-error"
                      : focusedField === "phone"
                        ? "border-primary shadow-[0_0_10px_rgba(0,120,230,0.15)]"
                        : "border-white/5"
                  }`}
                />
                <label
                  className={`absolute left-5 pointer-events-none transition-all duration-300 uppercase tracking-wider font-label-caps text-[10px] font-bold ${
                    focusedField === "phone" || formData.phone
                      ? "top-2 text-primary text-xs scale-90 origin-left"
                      : "top-5 text-on-surface-variant"
                  }`}
                >
                  Phone Number
                </label>
                {errors.phone && (
                  <span className="text-xs text-error flex items-center gap-1 mt-1 pl-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="relative w-full">
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  className={`w-full bg-surface/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 backdrop-blur-md pt-7 pb-2 resize-none ${
                    errors.message
                      ? "border-error"
                      : focusedField === "message"
                        ? "border-primary shadow-[0_0_10px_rgba(0,120,230,0.15)]"
                        : "border-white/5"
                  }`}
                />
                <label
                  className={`absolute left-5 pointer-events-none transition-all duration-300 uppercase tracking-wider font-label-caps text-[10px] font-bold ${
                    focusedField === "message" || formData.message
                      ? "top-2 text-primary text-xs scale-90 origin-left"
                      : "top-5 text-on-surface-variant"
                  }`}
                >
                  Tell us about your learning goals
                </label>
                {errors.message && (
                  <span className="text-xs text-error flex items-center gap-1 mt-1 pl-1">
                    <AlertCircle size={12} /> {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-primary to-inverse-primary text-white font-bold tracking-widest uppercase text-xs font-label-caps neon-glow hover:neon-glow-hover transition-all duration-300 flex items-center justify-center gap-3"
              >
                Start Your Tutoring Enquiry
                <Send size={16} />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success mb-6 shadow-lg shadow-success/10">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-display-lg text-2xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed mb-6">
                Thank you for registering. Our student coordinator will contact
                you shortly to complete enrollment.
              </p>
              <span className="w-8 h-1 bg-primary rounded-full animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
