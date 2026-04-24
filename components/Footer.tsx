import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-center px-16 py-12 gap-8 bg-surface border-t border-pink-500/20 font-['Space_Grotesk'] uppercase tracking-widest text-[12px] text-pink-500 dark:text-pink-400 opacity-100 hover:opacity-80">
      <div className="text-xl font-bold text-slate-500">
        edusimply.lk
      </div>
      <p className="text-slate-500 text-center md:text-left">
        © 2028 edusimply.lk. Pioneering the cinematic frontier of digital education.
      </p>
      <nav className="flex gap-6">
        <Link className="text-slate-500 hover:text-pink-400 transition-colors" href="#">Privacy</Link>
        <Link className="text-slate-500 hover:text-pink-400 transition-colors" href="#">Terms</Link>
        <Link className="text-slate-500 hover:text-pink-400 transition-colors" href="#">Research</Link>
        <Link className="text-slate-500 hover:text-pink-400 transition-colors" href="#">Contact</Link>
      </nav>
    </footer>
  );
}
