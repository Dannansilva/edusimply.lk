"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, Award, Compass } from "lucide-react";

export default function InteractiveSection() {
  const [activeTab, setActiveTab] = useState<"math" | "science" | "physics">("math");

  // Math Lab State
  const [amplitude, setAmplitude] = useState<number>(20);
  const [frequency, setFrequency] = useState<number>(0.05);
  const [mathFunction, setMathFunction] = useState<"sine" | "quadratic" | "linear">("sine");

  // Science Lab State: Excited electron states
  const [energyLevel, setEnergyLevel] = useState<number>(2);
  const [photons, setPhotons] = useState<{ id: number; x: number; y: number }[]>([]);

  // Physics Lab: Pendulum
  const [length, setLength] = useState<number>(120);
  const [gravity, setGravity] = useState<number>(9.8);
  const [angle, setAngle] = useState<number>(Math.PI / 4);
  const [omega, setOmega] = useState<number>(0); // angular velocity
  const requestRef = useRef<number | null>(null);
  const photonCounter = useRef<number>(0);

  // Math Plot calculation
  const getPath = () => {
    const points = [];
    const width = 400;
    const height = 200;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let x = -centerX; x <= centerX; x += 2) {
      let y = 0;
      if (mathFunction === "sine") {
        y = Math.sin(x * frequency) * amplitude;
      } else if (mathFunction === "quadratic") {
        y = (x * x * 0.002 * (amplitude / 20)) - 30;
      } else if (mathFunction === "linear") {
        y = x * (frequency * 10);
      }
      points.push(`${x + centerX},${centerY - y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Science Lab trigger photon emission on click
  const exciteElectron = (level: number) => {
    setEnergyLevel(level);
    photonCounter.current += 1;
    const nextId = photonCounter.current;
    const newPhoton = {
      id: nextId,
      x: 0,
      y: 0,
    };
    setPhotons((prev) => [...prev, newPhoton]);
    // Clear photon after animation
    setTimeout(() => {
      setPhotons((prev) => prev.filter((p) => p.id !== nextId));
    }, 1200);
  };

  // Physics loop for pendulum swinging
  useEffect(() => {
    if (activeTab !== "physics") {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    let currentAngle = angle;
    let currentOmega = omega;
    const dt = 0.05;

    const animatePendulum = () => {
      // Angular acceleration: alpha = -(g/L) * sin(theta)
      const alpha = -(gravity / (length * 0.05)) * Math.sin(currentAngle);
      currentOmega += alpha * dt;
      currentAngle += currentOmega * dt;

      // Apply air resistance damping
      currentOmega *= 0.995;

      setAngle(currentAngle);
      setOmega(currentOmega);

      requestRef.current = requestAnimationFrame(animatePendulum);
    };

    requestRef.current = requestAnimationFrame(animatePendulum);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeTab, length, gravity]);

  // Calculate pendulum bob position
  const bobX = 200 + Math.sin(angle) * length;
  const bobY = 30 + Math.cos(angle) * length;

  return (
    <section className="relative py-24 md:py-36 bg-background overflow-hidden border-t border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex glass-panel px-4 py-2 rounded-full border border-primary/30 items-center gap-2 mb-6"
          >
            <Compass size={16} className="text-primary animate-spin" />
            <span className="font-label-caps text-xs tracking-widest text-primary uppercase font-bold">Interactive Sandbox</span>
          </motion.div>
          
          <h2 className="font-display-2xl text-[36px] md:text-[56px] leading-[1.1] text-white font-bold">
            Virtual Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-success text-glow">
              Simulation Labs
            </span>
          </h2>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6">
            Theory comes alive. Experiment with real physics formulas, mathematical equations, and atomic orbits directly in your browser.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {(["math", "science", "physics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-label-caps text-xs tracking-wider uppercase border transition-all duration-300 relative overflow-hidden group ${
                activeTab === tab
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                  : "glass-panel border-white/5 text-on-surface-variant hover:border-primary/30 hover:text-primary"
              }`}
            >
              {tab === "math" && "Math Lab (Grapher)"}
              {tab === "science" && "Science Lab (Bohr Atom)"}
              {tab === "physics" && "Physics Lab (Pendulum)"}
            </button>
          ))}
        </div>

        {/* Sandbox Board */}
        <div className="max-w-4xl mx-auto glass-panel p-6 md:p-10 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* Math Lab */}
            {activeTab === "math" && (
              <motion.div
                key="math"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="font-headline-lg text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Activity className="text-primary" /> Coordinate Function Grapher
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    Plot mathematical formulas. Adjust the amplitude (height) and frequency (cycles) to see how the graph reacts instantly.
                  </p>

                  <div className="space-y-6">
                    {/* Function Type */}
                    <div className="flex gap-2">
                      {(["sine", "quadratic", "linear"] as const).map((func) => (
                        <button
                          key={func}
                          onClick={() => setMathFunction(func)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            mathFunction === func
                              ? "bg-primary/20 border-primary text-primary"
                              : "border-white/5 hover:bg-white/5 text-on-surface-variant"
                          }`}
                        >
                          {func === "sine" && "y = sin(x)"}
                          {func === "quadratic" && "y = ax²"}
                          {func === "linear" && "y = mx"}
                        </button>
                      ))}
                    </div>

                    {/* Amplitude Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                        <span>Amplitude (a)</span>
                        <span className="text-primary font-bold">{amplitude}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={amplitude}
                        onChange={(e) => setAmplitude(Number(e.target.value))}
                        className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Frequency Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                        <span>Frequency (m / k)</span>
                        <span className="text-primary font-bold">{(frequency * 100).toFixed(0)}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={frequency * 100}
                        onChange={(e) => setFrequency(Number(e.target.value) / 100)}
                        className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Graph Grid Visual */}
                <div className="w-full flex justify-center">
                  <div className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[200px] border border-white/5 bg-black/60 rounded-2xl overflow-hidden shadow-inner">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid-bg opacity-30"></div>
                    {/* X & Y Axes */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>

                    {/* Plot SVG */}
                    <svg className="w-full h-full">
                      <motion.path
                        d={getPath()}
                        fill="none"
                        stroke="#E85D92"
                        strokeWidth="2.5"
                        className="drop-shadow-[0_0_8px_rgba(232,93,146,0.8)]"
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Science Lab (Bohr Atom) */}
            {activeTab === "science" && (
              <motion.div
                key="science"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="font-headline-lg text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Award className="text-success" /> Bohr Atomic Model Simulator
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    Observe energy level quantum jumps. Click an orbital shell to excite the electron. As it decays, it emits a light photon!
                  </p>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-on-surface-variant font-label-caps mb-1">Select Orbit Shell Level</span>
                    {[2, 3, 4].map((level) => (
                      <button
                        key={level}
                        onClick={() => exciteElectron(level)}
                        className={`w-full py-3 rounded-xl border text-sm font-bold flex justify-between px-4 transition-all duration-300 ${
                          energyLevel === level
                            ? "bg-success/10 border-success text-success"
                            : "border-white/5 hover:bg-white/5 text-on-surface-variant"
                        }`}
                      >
                        <span>Orbital Shell {level} {level === 4 ? "(n = 4, Excited)" : ""}</span>
                        <span className="opacity-60">{13.6 / (level * level)} eV</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bohr Orbital Canvas */}
                <div className="w-full flex justify-center items-center h-[280px]">
                  <div className="relative w-[240px] h-[240px] flex justify-center items-center">
                    {/* Nucleus */}
                    <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-success to-primary shadow-[0_0_15px_rgba(74,222,128,0.5)] flex items-center justify-center text-[10px] font-bold text-black font-mono">
                      +P
                    </div>

                    {/* Orbits */}
                    {[1, 2, 3, 4].map((r) => (
                      <div
                        key={r}
                        onClick={() => exciteElectron(r)}
                        className={`absolute rounded-full border border-dashed border-white/10 hover:border-success/30 cursor-pointer transition-colors duration-300`}
                        style={{
                          width: `${r * 50}px`,
                          height: `${r * 50}px`,
                          zIndex: 10 - r,
                        }}
                      ></div>
                    ))}

                    {/* Orbiting Electron */}
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 8 / energyLevel,
                        ease: "linear",
                      }}
                      className="absolute origin-center w-full h-full pointer-events-none"
                    >
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-success absolute shadow-[0_0_10px_#4ADE80]"
                        animate={{
                          x: 0,
                          scale: [1, 1.3, 1],
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                          marginTop: "-7px",
                          marginLeft: "-7px",
                          transform: `translate(${energyLevel * 25}px, 0)`,
                        }}
                      />
                    </motion.div>

                    {/* Emitted Photons */}
                    {photons.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, x: 100, y: -80 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute w-3.5 h-3.5 rounded-full bg-primary/80 blur-[2px] shadow-[0_0_10px_#E85D92]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Physics Lab (Pendulum) */}
            {activeTab === "physics" && (
              <motion.div
                key="physics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="font-headline-lg text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Compass className="text-primary-container" /> Pendulum Simple Harmonic Motion
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    Investigate harmonic oscillation cycles. Modify length and gravity to see how period changes in accordance with T = 2π√(L/g).
                  </p>

                  <div className="space-y-6">
                    {/* Length Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                        <span>Pendulum String Length (L)</span>
                        <span className="text-primary font-bold">{length} cm</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="160"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Gravity Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                        <span>Gravity Constant (g)</span>
                        <span className="text-primary font-bold">{gravity} m/s²</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        step="0.1"
                        value={gravity}
                        onChange={(e) => setGravity(Number(e.target.value))}
                        className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Calculated Period display */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 flex justify-between items-center bg-black/30">
                      <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Calculated Period (T)</span>
                      <span className="font-bold text-white font-mono">
                        {(2 * Math.PI * Math.sqrt(length / (gravity * 10))).toFixed(2)} seconds
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pendulum Swing Box */}
                <div className="w-full flex justify-center">
                  <div className="relative w-[300px] h-[220px] border border-white/5 bg-black/60 rounded-2xl overflow-hidden shadow-inner">
                    {/* Anchor point */}
                    <div className="absolute left-[200px] top-[30px] w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                    
                    {/* String path line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1="200"
                        y1="30"
                        x2={bobX}
                        y2={bobY}
                        stroke="#A0A0A0"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    </svg>

                    {/* Pendulum Bob ball */}
                    <div
                      className="absolute rounded-full bg-gradient-to-r from-primary to-inverse-primary shadow-[0_0_15px_rgba(232,93,146,0.6)]"
                      style={{
                        left: `${bobX}px`,
                        top: `${bobY}px`,
                        width: "24px",
                        height: "24px",
                        transform: "translate(-12px, -12px)",
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
