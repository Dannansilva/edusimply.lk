"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-outline-variant py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12 relative z-10">
        {/* Column 1: Logo & Mission */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg border border-white/10 p-0.5 transition-transform group-hover:scale-105 bg-white/10">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/images/logo.jpeg"
                  alt="EduSimply Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight font-logo flex items-center">
              <span className="text-[#0B3B60]">Edu</span>
              <span className="text-[#0078E6]">Simply</span>
            </span>
          </Link>
          <p className="text-on-surface-variant text-xs leading-relaxed max-w-[240px] font-body-md mt-2">
            At EduSimply, learning is made clear, supportive, and simple.
            Founded by Miss Pudamini Onethra Gomes, helping students build
            confidence and achieve academic goals.
          </p>
        </div>

        {/* Column 2: Subjects Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">
            Science Subjects
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <span className="text-on-surface-variant">
              Biology & Human Biology
            </span>
            <span className="text-on-surface-variant">
              Chemistry & Biochemistry
            </span>
            <span className="text-on-surface-variant">
              Physics & General Science
            </span>
            <span className="text-on-surface-variant">
              Anatomy & Physiology
            </span>
          </nav>
        </div>

        {/* Column 3: Academy Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">
            Tutoring Levels
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <span className="text-on-surface-variant">
              Primary School Tutoring
            </span>
            <span className="text-on-surface-variant">
              Lower High School (Yr 7-10)
            </span>
            <span className="text-on-surface-variant">
              WACE ATAR, Cambridge & Edexcel
            </span>
            <span className="text-on-surface-variant">
              University Science Tutoring
            </span>
          </nav>
        </div>

        {/* Column 4: Contact Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">
            Enquiries
          </h4>
          <div className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <p>Email: edusimply.tutoring@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-on-surface-variant font-label-caps uppercase tracking-widest relative z-10">
        <p>© {currentYear} EduSimply. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-white transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-white transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-white transition-colors" href="#">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
