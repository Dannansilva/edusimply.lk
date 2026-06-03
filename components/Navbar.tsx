"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Subjects", href: "#subjects" },
    { label: "Timeline", href: "#timeline" },
    { label: "Courses", href: "#courses" },
    { label: "Simulations", href: "#simulations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-background/70 backdrop-blur-xl border-b border-outline-variant shadow-sm">
      {/* Brand logo */}
      <Link
        href="/"
        className="text-xl md:text-2xl font-black text-on-surface italic tracking-tighter drop-shadow-[0_0_8px_rgba(232,93,146,0.3)] font-['Space_Grotesk'] flex items-center gap-2"
      >
        <span className="text-primary font-black">edu</span>simply
        <span className="text-primary font-black">.lk</span>
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
            <button className="w-full py-3 rounded-xl border border-outline-variant text-on-surface-variant hover:text-primary text-xs font-bold tracking-widest uppercase">
              Portal Login
            </button>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-inverse-primary text-white text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center gap-2"
            >
              Join Class
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
