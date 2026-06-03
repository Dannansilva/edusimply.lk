"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Torus } from "@react-three/drei";
import { useScroll, useSpring } from "framer-motion";
import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// Pure deterministic sine-wave hash function for stateless PRNG
const hash = (x: number) => {
  const val = Math.sin(x) * 10000;
  return val - Math.floor(val);
};

// Hook to generate dynamic canvas texture for holographic screens
function useDashboardTexture(type: "eeg" | "radar" | "binary") {
  const canvas = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 180;
    return c;
  }, []);

  const texture = useMemo(() => {
    if (!canvas) return null;
    return new THREE.CanvasTexture(canvas);
  }, [canvas]);

  useEffect(() => {
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw screen panel background & border glow - high tech cyan
      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)"; 
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

      // Corners
      ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
      ctx.fillRect(2, 2, 12, 3);
      ctx.fillRect(2, 2, 3, 12);
      ctx.fillRect(canvas.width - 14, 2, 12, 3);
      ctx.fillRect(canvas.width - 5, 2, 3, 12);
      ctx.fillRect(2, canvas.height - 5, 12, 3);
      ctx.fillRect(2, canvas.height - 14, 3, 12);
      ctx.fillRect(canvas.width - 14, canvas.height - 5, 12, 3);
      ctx.fillRect(canvas.width - 5, canvas.height - 14, 3, 12);

      // Draw subgrid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 12; x < canvas.width; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 4);
        ctx.lineTo(x, canvas.height - 4);
        ctx.stroke();
      }
      for (let y = 12; y < canvas.height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(4, y);
        ctx.lineTo(canvas.width - 4, y);
        ctx.stroke();
      }

      // Title & Status
      ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
      ctx.font = "bold 8px monospace";

      if (type === "eeg") {
        ctx.fillText("NEURAL COGNITION SYSTEM", 12, 18);
        ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
        ctx.fillText("EEG: ACTIVE", 12, 28);

        // Drawing a real-time wavy brain signal
        ctx.strokeStyle = "#38BDF8"; 
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        offset += 0.07;
        for (let x = 12; x < canvas.width - 12; x++) {
          const y =
            canvas.height / 2 +
            10 +
            Math.sin(x * 0.05 + offset) * 16 * Math.sin(x * 0.01) +
            Math.cos(x * 0.16 + offset * 1.6) * 6;
          if (x === 12) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (type === "radar") {
        ctx.fillText("SYNAPSE MAPPING RADAR", 12, 18);
        ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
        ctx.fillText("SCANNING...", 12, 28);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2 + 15;

        // Radar circular grids
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.beginPath();
        ctx.moveTo(cx - 55, cy);
        ctx.lineTo(cx + 55, cy);
        ctx.moveTo(cx, cy - 55);
        ctx.lineTo(cx, cy + 55);
        ctx.stroke();

        // Scanning sweeping line
        offset += 0.025;
        ctx.strokeStyle = "#38BDF8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(offset) * 48, cy + Math.sin(offset) * 48);
        ctx.stroke();

        // Draw scanning targets
        ctx.fillStyle = "#38BDF8";
        ctx.beginPath();
        ctx.arc(cx - 20, cy - 15, 2, 0, Math.PI * 2);
        ctx.arc(cx + 25, cy + 10, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === "binary") {
        ctx.fillText("NEURAL INTERFACE LINK", 12, 18);
        ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
        ctx.fillText("STREAM: ONLINE", 12, 28);

        ctx.font = "7px monospace";
        offset += 0.045;

        for (let col = 0; col < 6; col++) {
          const x = 12 + col * 38;
          for (let row = 0; row < 10; row++) {
            const val = Math.random() > 0.45 ? "1" : "0";
            const alpha = Math.sin(row * 0.4 + offset + col) * 0.45 + 0.55;
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.fillText(val, x, 40 + row * 12);
          }
        }
      }

      if (texture) {
        texture.needsUpdate = true;
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [canvas, texture, type]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

// Hook to generate dynamic canvas texture for high-tech HUD floor
function useHudTexture() {
  const canvas = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    return c;
  }, []);

  const texture = useMemo(() => {
    if (!canvas) return null;
    return new THREE.CanvasTexture(canvas);
  }, [canvas]);

  useEffect(() => {
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let animFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Glow parameters
      const glowColor = "rgba(56, 189, 248, 0.85)";
      const dimColor = "rgba(56, 189, 248, 0.3)";
      const faintColor = "rgba(56, 189, 248, 0.08)";

      // Background radial glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 240);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 240, 0, Math.PI * 2);
      ctx.fill();

      // Outer rings
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = dimColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 220, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = glowColor;
      ctx.save();
      ctx.setLineDash([4, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Thick segmented arc ring
      ctx.strokeStyle = dimColor;
      ctx.lineWidth = 6;
      ctx.save();
      ctx.setLineDash([80, 50, 30, 50]);
      ctx.beginPath();
      ctx.arc(cx, cy, 195, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Fine tick marks
      ctx.lineWidth = 1.0;
      const tickCount = 90;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const len = i % 5 === 0 ? 8 : 4;
        ctx.strokeStyle = i % 5 === 0 ? glowColor : dimColor;
        ctx.beginPath();
        ctx.moveTo(cx + cos * 178, cy + sin * 178);
        ctx.lineTo(cx + cos * (178 - len), cy + sin * (178 - len));
        ctx.stroke();
      }

      // Middle dashed ring
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 1.5;
      ctx.save();
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, 155, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner thin ring
      ctx.strokeStyle = faintColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.stroke();

      // Innermost dashed
      ctx.strokeStyle = dimColor;
      ctx.save();
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // HUD Text Labels rotating slowly
      ctx.fillStyle = glowColor;
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const labels = [
        "A P E C T A N G T E",
        "M A T O C  S E C O N D A R Y",
        "N E U R O - S Y N A P T I C",
        "S Y S T E M  A C T I V E",
        "D A T A  L I N K  E N A B L E D",
        "C O G N I T I V E  L A Y E R",
      ];
      labels.forEach((label, idx) => {
        const angle = (idx / labels.length) * Math.PI * 2 + Date.now() * 0.00015;
        const tx = cx + Math.cos(angle) * 142;
        const ty = cy + Math.sin(angle) * 142;

        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });

      // Center crosshairs
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = dimColor;
      ctx.beginPath();
      ctx.moveTo(cx - 65, cy);
      ctx.lineTo(cx - 35, cy);
      ctx.moveTo(cx + 35, cy);
      ctx.lineTo(cx + 65, cy);
      ctx.moveTo(cx, cy - 65);
      ctx.lineTo(cx, cy - 35);
      ctx.moveTo(cx, cy + 35);
      ctx.lineTo(cx, cy + 65);
      ctx.stroke();

      if (texture) {
        texture.needsUpdate = true;
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [canvas, texture]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

// Subcomponent: Holographic floating monitor screens
function FloatingScreen({
  type,
  position,
  rotation,
  scale = 1,
}: {
  type: "eeg" | "radar" | "binary";
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const texture = useDashboardTexture(type);
  if (!texture) return null;

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1.5, 1.05]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Subcomponent: Procedurally generated 3D Brain model
function NeuralBrain() {
  // Memoize positions, colors, meshes, and line objects
  const {
    particlesPos,
    particlesColor,
    lineObjects,
    leftGeom,
    rightGeom,
    leftCerebGeom,
    rightCerebGeom,
    stemGeom,
  } = useMemo(() => {
    const posList: number[] = [];
    const colorList: number[] = [];

    const colorCyan = new THREE.Color("#38BDF8"); // brand primary cyan
    const colorBlue = new THREE.Color("#0284C7"); // brand deep blue

    // --- 1. Solid Anatomical Hemispheres (Left & Right) ---
    const buildHemisphereGeom = (isLeft: boolean) => {
      const g = new THREE.SphereGeometry(1.0, 48, 48);
      const pos = g.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const r = Math.sqrt(x * x + y * y + z * z);
        const ratio = Math.max(-1, Math.min(1, y / r));
        const phi = Math.acos(ratio);
        const theta = Math.atan2(z, x);

        // Lower frequency theta with massive phi phase shift for winding, serpentine gyri
        const winding = Math.sin(theta * 5.0 + Math.sin(phi * 4.5) * 3.5);
        const irregular = Math.cos(theta * 2.5 - phi * 3.0) * Math.sin(phi * 4.0);
        
        // Combine with power shaping for broad, rounded gyri and narrow, deep crevices
        const val = winding * 0.75 + irregular * 0.25;
        const fold = Math.sign(val) * Math.pow(Math.abs(val), 0.5) * 0.12;

        // Base sphere directions
        const bx = Math.sin(phi) * Math.cos(theta);
        const by = Math.cos(phi);
        const bz = Math.sin(phi) * Math.sin(theta);

        // First scale the base ellipsoid, then offset uniformly along sphere normal
        let nx = bx * 0.88 + bx * fold;
        let ny = by * 0.75 + by * fold;
        const nz = bz * 1.15 + bz * fold;

        ny += 0.15; // Shift up slightly

        // Flatten the inner dividing fissure faces (hemispheres very close together)
        if (isLeft) {
          if (nx > -0.015) nx = -0.015;
        } else {
          if (nx < 0.015) nx = 0.015;
        }

        pos.setXYZ(i, nx, ny, nz);
      }
      g.computeVertexNormals();
      return g;
    };

    const lGeom = buildHemisphereGeom(true);
    const rGeom = buildHemisphereGeom(false);

    // --- 2. Solid Cerebellum (Lobes at bottom back) ---
    const buildCerebellumGeom = () => {
      const g = new THREE.SphereGeometry(0.45, 24, 24);
      const pos = g.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        const r = Math.sqrt(x * x + y * y + z * z);
        const ratio = Math.max(-1, Math.min(1, y / r));
        const phi = Math.acos(ratio);
        const theta = Math.atan2(z, x);

        // Intricate cerebellar ripples (folia)
        const fold = Math.sin(phi * 30.0 + Math.cos(theta * 6.0) * 1.0) * 0.018 +
                     Math.sin(theta * 8.0) * Math.sin(phi * 8.0) * 0.008;
        const nr = r + fold;

        const nx = nr * Math.sin(phi) * Math.cos(theta) * 0.85;
        const ny = nr * Math.cos(phi) * 0.70;
        const nz = nr * Math.sin(phi) * Math.sin(theta) * 0.85;

        pos.setXYZ(i, nx, ny, nz);
      }
      g.computeVertexNormals();
      return g;
    };

    const lCereb = buildCerebellumGeom();
    const rCereb = buildCerebellumGeom();

    // --- 3. Solid Brainstem ---
    const stem = new THREE.CylinderGeometry(0.18, 0.12, 0.8, 16);

    // --- 4. Sparse Synaptic Point Cloud (Overlaying sparklers) ---
    const synapseCount = 650;
    for (let i = 0; i < synapseCount; i++) {
      const theta = hash(i * 3) * Math.PI * 2;
      const phi = hash(i * 7) * Math.PI;

      const winding = Math.sin(theta * 5.0 + Math.sin(phi * 4.5) * 3.5);
      const irregular = Math.cos(theta * 2.5 - phi * 3.0) * Math.sin(phi * 4.0);
      const val = winding * 0.75 + irregular * 0.25;
      const fold = Math.sign(val) * Math.pow(Math.abs(val), 0.5) * 0.12;

      const bx = Math.sin(phi) * Math.cos(theta);
      const by = Math.cos(phi);
      const bz = Math.sin(phi) * Math.sin(theta);

      const rOffset = (hash(i * 11) - 0.5) * 0.06;
      let nx = bx * (0.88 + fold + rOffset);
      let ny = by * (0.75 + fold + rOffset);
      const nz = bz * (1.15 + fold + rOffset);

      ny += 0.15;

      const isLeft = hash(i * 13) > 0.5;
      nx += isLeft ? -0.015 : 0.015;

      posList.push(nx, ny, nz);

      const mixRatio = (nz + 1.05) / 2.1;
      const color = new THREE.Color();
      color.lerpColors(colorBlue, colorCyan, mixRatio);
      colorList.push(color.r, color.g, color.b);
    }

    // --- 5. Gyri Fiber Paths (Curved neon lines) ---
    const lines: THREE.Line[] = [];
    const curveCount = 18;
    const pointsPerCurve = 30;

    for (let c = 0; c < curveCount; c++) {
      const points: THREE.Vector3[] = [];
      let theta = hash(c * 23 + 7000) * Math.PI * 2;
      let phi = hash(c * 29 + 8000) * Math.PI * 0.8 + 0.1;
      const isLeft = hash(c * 31 + 9000) > 0.5;

      for (let p = 0; p < pointsPerCurve; p++) {
        const winding = Math.sin(theta * 5.0 + Math.sin(phi * 4.5) * 3.5);
        const irregular = Math.cos(theta * 2.5 - phi * 3.0) * Math.sin(phi * 4.0);
        const val = winding * 0.75 + irregular * 0.25;
        const fold = Math.sign(val) * Math.pow(Math.abs(val), 0.5) * 0.12;

        const bx = Math.sin(phi) * Math.cos(theta);
        const by = Math.cos(phi);
        const bz = Math.sin(phi) * Math.sin(theta);

        const rOffset = 0.02;
        let nx = bx * (0.88 + fold + rOffset);
        let ny = by * (0.75 + fold + rOffset);
        const nz = bz * (1.15 + fold + rOffset);

        ny += 0.15;
        nx += isLeft ? -0.015 : 0.015;

        points.push(new THREE.Vector3(nx, ny, nz));

        theta += (hash(p * 37 + c * 100) - 0.5) * 0.15;
        phi += (hash(p * 43 + c * 100) - 0.5) * 0.12;
      }

      const curvePath = new THREE.CatmullRomCurve3(points);
      const curvePoints = curvePath.getPoints(40);

      const lineGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: c % 2 === 0 ? "#38BDF8" : "#0284C7",
        opacity: 0.5,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      lines.push(new THREE.Line(lineGeom, lineMat));
    }

    return {
      particlesPos: new Float32Array(posList),
      particlesColor: new Float32Array(colorList),
      lineObjects: lines,
      leftGeom: lGeom,
      rightGeom: rGeom,
      leftCerebGeom: lCereb,
      rightCerebGeom: rCereb,
      stemGeom: stem,
    };
  }, []);

  // WebGL disposability cleanup for materials and geometries
  useEffect(() => {
    return () => {
      leftGeom.dispose();
      rightGeom.dispose();
      leftCerebGeom.dispose();
      rightCerebGeom.dispose();
      stemGeom.dispose();
      lineObjects.forEach((line) => {
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach((m) => m.dispose());
        } else {
          line.material.dispose();
        }
      });
    };
  }, [leftGeom, rightGeom, leftCerebGeom, rightCerebGeom, stemGeom, lineObjects]);

  return (
    <group scale={1.1}>
      {/* Solid Left Hemisphere (Cyan Metallic Glass) */}
      <mesh geometry={leftGeom} position={[-0.015, 0, 0]}>
        <meshPhysicalMaterial
          color="#0B132B"
          transmission={0.4}
          roughness={0.2}
          thickness={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          metalness={0.7}
          emissive="#0EA5E9"
          emissiveIntensity={1.4}
          ior={1.55}
          transparent
        />
      </mesh>
      {/* Glowing Technical Wireframe Left Hemisphere */}
      <mesh geometry={leftGeom} position={[-0.015, 0, 0]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid Right Hemisphere (Cyan Metallic Glass) */}
      <mesh geometry={rightGeom} position={[0.015, 0, 0]}>
        <meshPhysicalMaterial
          color="#0B132B"
          transmission={0.4}
          roughness={0.2}
          thickness={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          metalness={0.7}
          emissive="#0EA5E9"
          emissiveIntensity={1.4}
          ior={1.55}
          transparent
        />
      </mesh>
      {/* Glowing Technical Wireframe Right Hemisphere */}
      <mesh geometry={rightGeom} position={[0.015, 0, 0]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid Left Cerebellum (Cyan Metallic Glass) */}
      <mesh geometry={leftCerebGeom} position={[-0.22, -0.60, -0.35]}>
        <meshPhysicalMaterial
          color="#0B132B"
          transmission={0.3}
          roughness={0.2}
          thickness={1.0}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          metalness={0.7}
          emissive="#0284C7"
          emissiveIntensity={1.2}
          ior={1.5}
          transparent
        />
      </mesh>
      {/* Glowing Technical Wireframe Left Cerebellum */}
      <mesh geometry={leftCerebGeom} position={[-0.22, -0.60, -0.35]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid Right Cerebellum (Cyan Metallic Glass) */}
      <mesh geometry={rightCerebGeom} position={[0.22, -0.60, -0.35]}>
        <meshPhysicalMaterial
          color="#0B132B"
          transmission={0.3}
          roughness={0.2}
          thickness={1.0}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          metalness={0.7}
          emissive="#0284C7"
          emissiveIntensity={1.2}
          ior={1.5}
          transparent
        />
      </mesh>
      {/* Glowing Technical Wireframe Right Cerebellum */}
      <mesh geometry={rightCerebGeom} position={[0.22, -0.60, -0.35]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid Brainstem (Cyan Metallic Glass Cylinder) */}
      <mesh geometry={stemGeom} position={[0, -0.95, -0.1]} rotation={[0.1, 0, 0]}>
        <meshPhysicalMaterial
          color="#0B132B"
          transmission={0.3}
          roughness={0.22}
          thickness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.15}
          metalness={0.6}
          emissive="#0284C7"
          emissiveIntensity={1.0}
          ior={1.5}
          transparent
        />
      </mesh>
      {/* Glowing Technical Wireframe Brainstem */}
      <mesh geometry={stemGeom} position={[0, -0.95, -0.1]} rotation={[0.1, 0, 0]}>
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Synapse Star Sparklers Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particlesColor, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Synaptic Loops (Gyri Lines) on top of solid hemispheres */}
      {lineObjects.map((lineObj, index) => (
        <primitive key={index} object={lineObj} />
      ))}
    </group>
  );
}

// 3D Universe combining the Brain, holographic screens and sci-fi coordinate bases
interface LearningUniverseProps {
  mainGroupRef: React.RefObject<THREE.Group | null>;
  dragRotRef: React.MutableRefObject<[number, number]>;
  isDraggingRef: React.MutableRefObject<boolean>;
  autoSpinYRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function LearningUniverse({
  mainGroupRef,
  dragRotRef,
  isDraggingRef,
  autoSpinYRef,
  mouseRef,
}: LearningUniverseProps) {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  const hudTexture = useHudTexture();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseRef]);

  useFrame((state, delta) => {
    const scroll = smoothScroll.get();

    if (mainGroupRef.current) {
      // 1. Scroll Translation & Scale
      const scaleVal = 1.0 - scroll * 0.65;
      mainGroupRef.current.scale.setScalar(scaleVal);

      // Transition the brain sideways on scroll
      const targetX = isMobile ? 0 : 1.95 - scroll * 5.2;
      const targetY = -scroll * 1.8;
      mainGroupRef.current.position.x = THREE.MathUtils.lerp(
        mainGroupRef.current.position.x,
        targetX,
        0.08
      );
      mainGroupRef.current.position.y = THREE.MathUtils.lerp(
        mainGroupRef.current.position.y,
        targetY,
        0.08
      );

      // 2. Dynamic Rotation Inertia (Direct assignment during dragging for zero-latency)
      if (isDraggingRef.current) {
        mainGroupRef.current.rotation.x = dragRotRef.current[0];
        mainGroupRef.current.rotation.y = dragRotRef.current[1];
      } else {
        // Gentle automated rotation + mouse parallax tilt when not dragging
        autoSpinYRef.current += delta * 0.06;
        const targetRotX = mouseRef.current.y * 0.28 + 0.15 + dragRotRef.current[0];
        const targetRotY = mouseRef.current.x * 0.28 + autoSpinYRef.current + dragRotRef.current[1];

        mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          mainGroupRef.current.rotation.x,
          targetRotX,
          0.15
        );
        mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          mainGroupRef.current.rotation.y,
          targetRotY,
          0.15
        );
      }
    }
  });

  return (
    <group ref={mainGroupRef} scale={isMobile ? 0.65 : 1} position={[isMobile ? 0 : 1.95, 0, 0]}>
      {/* 3D Brain centerpiece */}
      <NeuralBrain />

      {/* Holographic interface overlay panels */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <FloatingScreen
          type="eeg"
          position={[-2.4, 0.7, 0.8]}
          rotation={[0, Math.PI / 5, 0]}
          scale={0.9}
        />
      </Float>

      <Float speed={3.0} rotationIntensity={0.5} floatIntensity={0.9}>
        <FloatingScreen
          type="radar"
          position={[2.4, -0.6, -0.6]}
          rotation={[0, -Math.PI / 5, 0]}
          scale={0.9}
        />
      </Float>

      <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingScreen
          type="binary"
          position={[2.1, 1.2, 0.4]}
          rotation={[0.1, -Math.PI / 4, -0.1]}
          scale={0.8}
        />
      </Float>

      {/* Dynamic 2D Hologram HUD disk floor */}
      <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 4.2]} />
        {hudTexture && (
          <meshBasicMaterial
            map={hudTexture}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* Floating 3D Concentric Orbit Torus rings for parallax depth */}
      <group position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1.6, 0.01, 8, 80]}>
          <meshBasicMaterial color="#38BDF8" opacity={0.25} transparent blending={THREE.AdditiveBlending} />
        </Torus>
        <Torus args={[1.2, 0.006, 8, 60]}>
          <meshBasicMaterial color="#0284C7" opacity={0.15} transparent blending={THREE.AdditiveBlending} />
        </Torus>
      </group>
    </group>
  );
}

export default function Scene3D() {
  const mainGroupRef = useRef<THREE.Group>(null);
  const dragRotRef = useRef<[number, number]>([0.2, 0]);
  const dragStartRot = useRef({ x: 0.2, y: 0 });
  const isDraggingRef = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const autoSpinYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    // Avoid capturing inputs or links
    if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).tagName === "A") return;
    
    isDraggingRef.current = true;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    if (mainGroupRef.current) {
      dragStartRot.current = {
        x: mainGroupRef.current.rotation.x,
        y: mainGroupRef.current.rotation.y,
      };
    } else {
      dragStartRot.current = {
        x: dragRotRef.current[0],
        y: dragRotRef.current[1],
      };
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;

    dragRotRef.current = [
      dragStartRot.current.x + dy * 0.006, // Dragging down rotates brain forward
      dragStartRot.current.y + dx * 0.006, // Dragging right spins brain clockwise
    ];
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    if (mainGroupRef.current) {
      autoSpinYRef.current = 0;
      dragRotRef.current = [
        mainGroupRef.current.rotation.x - mouseRef.current.y * 0.28 - 0.15,
        mainGroupRef.current.rotation.y - mouseRef.current.x * 0.28,
      ];
    }
    
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-auto w-full h-full cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        {/* Monochromatic high-tech cyan/blue lighting */}
        <ambientLight intensity={0.6} color="#e0f2fe" />
        <directionalLight position={[10, 10, 8]} intensity={3.5} color="#38BDF8" />
        <directionalLight position={[-10, -10, -8]} intensity={2.8} color="#0284C7" />
        <pointLight position={[0, -0.8, 1.5]} intensity={2.5} color="#38BDF8" />

        <LearningUniverse
          mainGroupRef={mainGroupRef}
          dragRotRef={dragRotRef}
          isDraggingRef={isDraggingRef}
          autoSpinYRef={autoSpinYRef}
          mouseRef={mouseRef}
        />

        <ContactShadows
          position={[0, -2.9, 0]}
          opacity={0.35}
          scale={12}
          blur={2.4}
          far={6}
          color="#1A1B1F"
        />
      </Canvas>
    </div>
  );
}
