export default function Hero() {
  return (
    <section className="relative min-h-[870px] flex flex-col md:flex-row items-center gap-12 mt-12 z-10">
      {/* Content Left */}
      <div className="flex-1 flex flex-col gap-8 items-start">
        <div className="glass-panel px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">The Future of Personalized Learning</span>
        </div>
        <h1 className="font-display-2xl text-display-2xl text-on-surface">
          Edexcel &amp; <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-inverse-primary text-glow">Cambridge</span> <br/>
          Classes
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          Experience a cinematic approach to education. High-tech, immersive learning environments designed for the modern student aiming for academic excellence.
        </p>
        <div className="flex gap-6 mt-4">
          <button className="px-8 py-4 rounded-full bg-primary-container text-on-surface font-label-caps text-label-caps tracking-widest neon-glow hover:bg-primary-fixed-dim transition-all shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.2)] flex items-center gap-3">
            ENROLL NOW
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
          </button>
          <button className="px-8 py-4 rounded-full glass-panel text-on-surface font-label-caps text-label-caps tracking-widest border border-outline hover:bg-surface/10 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined">play_circle</span>
            WATCH INTRO
          </button>
        </div>
      </div>
      {/* Image Right - 3D Floating Effect */}
      <div className="flex-1 relative w-full h-[600px] flex justify-center items-center">
        {/* Decorative Tech Rings */}
        <div className="absolute w-[120%] h-[120%] rounded-full border border-primary/10 border-dashed animate-[spin_60s_linear_infinite] z-0"></div>
        <div className="absolute w-[90%] h-[90%] rounded-full border border-secondary/20 animate-[spin_40s_linear_infinite_reverse] z-0"></div>
        {/* Main Image Container */}
        <div className="relative z-10 w-full h-full glass-panel rounded-3xl border border-outline-variant overflow-hidden transform hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
          <img alt="Tutor" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBypIst2b7QoDT8oBQOMv--aeFIBwGmcYZ5ngeMGTFsPxEXLak0M5r0fmoeEnRiN93LoP9xXTIJFvsGm4Y_GFQrTtl90vPIBar150jBMStuRqsF0aDLtfH2IKffukeEg1McY4Php9WS6JCP4eUAHid14H4jI0Vanqi6BygMcTQlRB8W2gbjvDECAOwL3Z8w1ptO8_snUSXMMQUpL3ip3qiDzXRC6HlQ52PPqP37dgZzSYMjf_sBBYm8os793CkUlqacrLfGxUNBUaqP"/>
          {/* Tech Overlay Elements */}
          <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-lg border border-primary/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">data_usage</span>
            <span className="font-label-caps text-label-caps text-on-surface">Live Metrics</span>
          </div>
          <div className="absolute bottom-6 right-6 glass-panel p-4 rounded-xl border border-outline-variant flex flex-col gap-2 max-w-[200px]">
            <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]"></div>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant text-right">Student Success Rate 85%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
