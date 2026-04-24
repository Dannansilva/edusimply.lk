export default function Subjects() {
  return (
    <section className="flex flex-col gap-12 relative z-10 pt-16">
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="font-display-lg text-display-lg text-on-surface">Core Subjects</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Master the sciences with our specialized, high-intensity modules designed for complete comprehension.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Subject Card 1 */}
        <div className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-outline-variant neon-glow-hover transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/5 to-transparent z-10"></div>
          <img alt="Biology" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoHkNiL7MFsnoXN4BqjIEqYY3Dcq1szY6feGgSQVK30HPNoGcjHexJzOUhapLxEjS2W1eul3Uc-UARQUFd0ihp82QIL9V1p-wKR8_2xBjvlj-c-dBHYhGfY_agR-O3Y-Sellzl-g02Hpam6HaBeW2b-8mY17PAp9EwSP9ripZHT_8Qrhn06m-lUZUtH43M8X-UOBzFZVE8oufbK-8Jl3fzJAvPug5jW8OppbVbjhpWRWfQF06OtvW5KVVzFwJ2MmJuKwVrUY3gbAm9"/>
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Biology</h3>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Molecular, Cellular &amp; Human Systems</p>
          </div>
        </div>
        {/* Subject Card 2 */}
        <div className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-outline-variant neon-glow-hover transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/5 to-transparent z-10"></div>
          <img alt="Chemistry" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBlnRXHCax5gVMITXe7SBYVmiYOAXPQZIHjoFSsAznYtO9b1emdieu-8kHkkU0A3GgScBB0bibRD838NFlTOijoInSRHf7ftHmAh-IZ3v0L1fOGmgGd4ZKxty1PHK_cXg-i8uJCb4PkLQ2wY1-HyuutkvZ8v88qx7Ad-8SxHIaUGzLSQEYnZZHICWogC6jenhieZNlSJLMh1khtnfPip64SiMTvJfObimcEwgFjFfAdzzWGYqRhLtiwIpuUqfxtQh9pim8wta7sOr9"/>
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Chemistry</h3>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Organic, Inorganic &amp; Physical Dynamics</p>
          </div>
        </div>
        {/* Subject Card 3 */}
        <div className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-outline-variant neon-glow-hover transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/5 to-transparent z-10"></div>
          <img alt="Physics" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDCr1lu9O07TXW8pm8lHA-aj1YLB792DRPjt3oncWhB3RCjn47PR-loQH5Ijee0r5AgHmpiKTVKWt1CnyoS2A28JHE8yfty5jT-QwZowy8dj256kbg2kvn7UttU-shGonMQ0Iinrt4ndaTEyOgAORbFP-Hobcn24njvIchn38ipXxHTwx4KHgP42-txs-B2RD4y3UcZXWTFc1INWrYNBx9ng0mPZU85cCwGAp_9npsmnwYLzaLNARQtQ-J4qgqMhLfMx4P4EY1Can6"/>
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Physics</h3>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Mechanics, Fields &amp; Quantum Theory</p>
          </div>
        </div>
      </div>
    </section>
  );
}

