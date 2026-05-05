"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, ContactShadows, Sphere, Cylinder, Torus } from "@react-three/drei";
import { useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

// Reusable Glass Material
const GlassMaterial = ({ color }: { color: string }) => (
  <MeshTransmissionMaterial 
    backside
    samples={4} 
    thickness={2} 
    chromaticAberration={1} 
    anisotropy={0.5} 
    distortion={0.5} 
    distortionScale={0.5} 
    temporalDistortion={0.2} 
    color={color}
    transmission={0.9}
    roughness={0.1}
    clearcoat={1}
  />
);

function ScienceAtom() {
  const atomRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (atomRef.current) {
      atomRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      atomRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={atomRef} scale={1.5}>
      {/* Nucleus */}
      <Sphere args={[0.5, 32, 32]}>
        <GlassMaterial color="#FF1E8C" />
      </Sphere>
      
      {/* Electron Orbits */}
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FF1E8C" emissive="#FF1E8C" emissiveIntensity={0.5} />
      </Torus>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#FF1E8C" emissive="#FF1E8C" emissiveIntensity={0.5} transparent opacity={0.3} />
      </Torus>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#FF1E8C" emissive="#FF1E8C" emissiveIntensity={0.5} />
      </Torus>
    </group>
  );
}

function ScienceMolecule() {
  const molRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (molRef.current) {
      molRef.current.rotation.x = state.clock.elapsedTime * -0.1;
      molRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={molRef} scale={1.2}>
      {/* Center Node */}
      <Sphere args={[0.6, 32, 32]}>
         <GlassMaterial color="#0A2463" />
      </Sphere>
      
      {/* Bond 1 */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Cylinder args={[0.05, 0.05, 2]} position={[0, 1, 0]}>
           <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </Cylinder>
        <Sphere args={[0.4, 32, 32]} position={[0, 2, 0]}>
           <GlassMaterial color="#00E5FF" />
        </Sphere>
      </group>

      {/* Bond 2 */}
      <group rotation={[-Math.PI / 3, Math.PI / 3, 0]}>
        <Cylinder args={[0.05, 0.05, 2]} position={[0, 1, 0]}>
           <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </Cylinder>
        <Sphere args={[0.3, 32, 32]} position={[0, 2, 0]}>
           <GlassMaterial color="#FF1E8C" />
        </Sphere>
      </group>
      
      {/* Bond 3 */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 0.75, 0]}>
           <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </Cylinder>
        <Sphere args={[0.5, 32, 32]} position={[0, 1.5, 0]}>
           <GlassMaterial color="#00E5FF" />
        </Sphere>
      </group>
    </group>
  );
}

function FloatingObjects() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollVal = smoothScroll.get();

    if (group1Ref.current) {
      group1Ref.current.position.y = scrollVal * 8; // Move up as user scrolls
    }

    if (group2Ref.current) {
      group2Ref.current.position.y = -8 + scrollVal * 12; 
    }
  });

  return (
    <>
      {/* Deep, rich lighting for dark theme */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#FF1E8C" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00E5FF" />
      
      {/* Removed Environment to stop washing out the dark theme, using strong colored lights instead */}

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={group1Ref} position={[isMobile ? 0 : 3, 0, -5]}>
           <ScienceAtom />
        </group>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <group ref={group2Ref} position={[isMobile ? 0 : -4, -8, -8]}>
           <ScienceMolecule />
        </group>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <FloatingObjects />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
