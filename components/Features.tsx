export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      <div className="glass-panel p-8 rounded-2xl border border-outline-variant flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">4+ Years Experience</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Proven track record in delivering high-tier academic results across demanding syllabi.</p>
      </div>
      <div className="glass-panel p-8 rounded-2xl border border-outline-variant flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">Individual &amp; Group</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Tailored session formats to suit varying learning velocities and cognitive styles.</p>
      </div>
      <div className="glass-panel p-8 rounded-2xl border border-outline-variant flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">Grades 8 - A/L</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Comprehensive curriculum coverage from foundational middle school to advanced levels.</p>
      </div>
    </section>
  );
}
