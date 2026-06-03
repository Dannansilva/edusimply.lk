"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-outline-variant py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12 relative z-10">
        
        {/* Column 1: Logo & Mission */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-black text-white italic tracking-tighter drop-shadow-[0_0_8px_rgba(232,93,146,0.4)] font-['Space_Grotesk'] flex items-center gap-2">
            <span className="text-primary font-black">edu</span>simply<span className="text-primary font-black">.lk</span>
          </Link>
          <p className="text-on-surface-variant text-xs leading-relaxed max-w-[240px] font-body-md mt-2">
            Redefining tuition classes in Sri Lanka through visual concepts, interactive simulations, and structured exam preparations.
          </p>
        </div>

        {/* Column 2: Subjects Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">Subject Modules</h4>
          <nav className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" href="#">Pure Mathematics</Link>
            <Link className="hover:text-primary transition-colors" href="#">Organic Chemistry</Link>
            <Link className="hover:text-primary transition-colors" href="#">Advanced Physics</Link>
            <Link className="hover:text-primary transition-colors" href="#">Biology Foundations</Link>
          </nav>
        </div>

        {/* Column 3: Academy Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">Class Grades</h4>
          <nav className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" href="#">Grade 6 - 8 Classes</Link>
            <Link className="hover:text-primary transition-colors" href="#">Grade 9 - 10 Classes</Link>
            <Link className="hover:text-primary transition-colors" href="#">G.C.E. O/L Revision</Link>
            <Link className="hover:text-primary transition-colors" href="#">Model Paper Sessions</Link>
          </nav>
        </div>

        {/* Column 4: Contact Directory */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold font-label-caps uppercase tracking-wider">Inquiries</h4>
          <div className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
            <p>Email: admissions@edusimply.lk</p>
            <p>Hotline: +94 11 234 5678</p>
            <p>Location: Colombo, Sri Lanka</p>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-on-surface-variant font-label-caps uppercase tracking-widest relative z-10">
        <p>© {currentYear} edusimply.lk. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
          <Link className="hover:text-white transition-colors" href="#">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
