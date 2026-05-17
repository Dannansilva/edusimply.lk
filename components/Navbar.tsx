import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-20 bg-surface/80 backdrop-blur-2xl border-b border-outline-variant shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
      <div className="text-xl md:text-2xl font-black text-on-surface italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,30,140,0.6)] font-['Space_Grotesk']">
        edusimply.lk
      </div>
      <nav className="hidden md:flex gap-8 items-center h-full">
        <Link className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1 h-full flex items-center font-['Space_Grotesk'] tracking-tight hover:bg-surface/5 transition-all duration-300 scale-95 active:opacity-80" href="#">
          Subjects
        </Link>
        <Link className="text-on-surface-variant hover:text-on-surface transition-colors h-full flex items-center font-['Space_Grotesk'] tracking-tight hover:bg-surface/5 transition-all duration-300 scale-95 active:opacity-80" href="#">
          About
        </Link>
        <Link className="text-on-surface-variant hover:text-on-surface transition-colors h-full flex items-center font-['Space_Grotesk'] tracking-tight hover:bg-surface/5 transition-all duration-300 scale-95 active:opacity-80" href="#">
          Contact
        </Link>
        <Link className="text-on-surface-variant hover:text-on-surface transition-colors h-full flex items-center font-['Space_Grotesk'] tracking-tight hover:bg-surface/5 transition-all duration-300 scale-95 active:opacity-80" href="#">
          Academy
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="hidden md:block px-6 py-2 rounded-full border border-outline text-on-surface-variant hover:text-on-surface hover:bg-surface/5 transition-all font-label-caps text-label-caps">
          Login
        </button>
        <button className="px-6 py-2 rounded-full bg-primary-container text-on-surface font-label-caps text-label-caps neon-glow hover:bg-primary-fixed-dim transition-all shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.2)]">
          Join Now
        </button>
      </div>
    </header>
  );
}
