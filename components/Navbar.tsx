"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About EduSimply", href: "#about-edusimply" },
    { label: "About Tutor", href: "#about-tutor" },
    { label: "Subjects", href: "#subjects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-background/70 backdrop-blur-xl border-b border-outline-variant shadow-sm">
      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-outline shadow-sm backdrop-blur-sm bg-white/40 p-0.5 transition-transform group-hover:scale-105">
          <div className="relative w-full h-full rounded-[10px] overflow-hidden">
            <Image
              src="/images/logo.jpeg"
              alt="EduSimply Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <span className="text-xl md:text-2xl font-black text-on-surface italic tracking-tighter font-['Space_Grotesk'] flex items-center">
          <span className="text-primary font-black">Edu</span>Simply
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex gap-8 items-center h-full justify-center">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 font-label-caps text-xs tracking-widest uppercase hover:-translate-y-0.5 active:opacity-80"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-on-surface hover:text-primary transition-colors focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-background border-b border-outline-variant p-6 flex flex-col gap-6 md:hidden z-40 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-sm tracking-wider uppercase py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-inverse-primary text-white text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
