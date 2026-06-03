"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, ContactShadows, Sphere, Cylinder, Torus } from "@react-three/drei";
import { useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

// Reusable Glass Material
const GlassMaterial = ({ color, transmission = 0.9 }: { color: string, transmission?: number }) => (
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
    transmission={transmission}
    roughness={0.1}
    clearcoat={1}
  />
);

function ScienceAtom() {
  const atomRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (atomRef.current) {
      atomRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      atomRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group ref={atomRef} scale={1}>
      {/* Nucleus */}
      <Sphere args={[0.3, 32, 32]}>
        <GlassMaterial color="#FF1E8C" />
      </Sphere>
      
      {/* Electron Orbits */}
      <Torus args={[1, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FF1E8C" emissive="#FF1E8C" emissiveIntensity={1} />
      </Torus>
      <Torus args={[1, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#FF1E8C" emissive="#FF1E8C" emissiveIntensity={1} transparent opacity={0.6} />
      </Torus>
      <Torus args={[1, 0.02, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
      </Torus>
    </group>
  );
}

function ScienceMolecule() {
  const molRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (molRef.current) {
      molRef.current.rotation.x = state.clock.elapsedTime * -0.2;
      molRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={molRef} scale={0.7}>
      <Sphere args={[0.4, 32, 32]}>
         <GlassMaterial color="#0A2463" />
      </Sphere>
      
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 0.75, 0]}>
           <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
        </Cylinder>
        <Sphere args={[0.25, 32, 32]} position={[0, 1.5, 0]}>
           <GlassMaterial color="#00E5FF" />
        </Sphere>
      </group>

      <group rotation={[-Math.PI / 3, Math.PI / 3, 0]}>
        <Cylinder args={[0.05, 0.05, 1.5]} position={[0, 0.75, 0]}>
           <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
        </Cylinder>
        <Sphere args={[0.2, 32, 32]} position={[0, 1.5, 0]}>
           <GlassMaterial color="#FF1E8C" />
        </Sphere>
      </group>
    </group>
  );
}

function PagesStack({ isLeft }: { isLeft: boolean }) {
  const numPages = 25; // 25 individual pages for high realism
  return (
    <>
      {Array.from({ length: numPages }).map((_, i) => {
        const progress = i / (numPages - 1);
        
        // Pages fan out slightly upwards
        const rotZ = isLeft ? -(progress * 0.15) : (progress * 0.15); 
        
        // Stack them vertically from the cover base
        const yOffset = 0.06 + progress * 0.22; 
        
        // Top pages are slightly narrower to create a realistic page curve
        const width = 2.3 - (progress * 0.15); 
        const xPos = isLeft ? -(width / 2) - 0.05 : (width / 2) + 0.05;

        // Add slight pseudo-random rotation to X for imperfect paper stacking (using Math.sin to keep component pure)
        const randomRotX = Math.sin(i * 12.34) * 0.0025;

        return (
          <group key={i} position={[0, yOffset, 0]} rotation={[randomRotX, 0, rotZ]}>
            <mesh position={[xPos, 0, 0]}>
              <boxGeometry args={[width, 0.012, 3.35]} />
              {/* Alternate page colors slightly for texture */}
              <meshStandardMaterial color={i % 3 === 0 ? "#ffffff" : "#f4ecd8"} roughness={1} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function BookOfKnowledge() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Group>(null);
  const rightCoverRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const scroll = smoothScroll.get();
    
    // Position: Right (at 0) -> Left -> Right -> Left
    // 3 complete cycles for standard landing page length
    const xAmplitude = isMobile ? 1.5 : 4;
    const xPos = Math.cos(scroll * Math.PI * 3) * xAmplitude; 
    
    // Y stays slightly floating
    const yPos = Math.sin(scroll * Math.PI * 6) * 0.3;

    if (groupRef.current) {
      groupRef.current.position.x = xPos;
      groupRef.current.position.y = yPos;
      
      // Tilt towards center slightly based on position
      const targetRotY = (xPos / xAmplitude) * -0.5; 
      groupRef.current.rotation.y = targetRotY;
      groupRef.current.rotation.x = 0.6; // Always tilted slightly towards camera to see inside
    }

    // Book Opening/Closing Animation
    // Open wide at edges (x is near amplitude), close slightly in middle
    const edgeFactor = Math.abs(Math.cos(scroll * Math.PI * 3));
    // When edgeFactor is 1 (sides), angle is smaller (flatter). When 0 (middle), angle is larger (closing)
    const coverAngle = THREE.MathUtils.lerp(Math.PI / 2.5, Math.PI / 8, edgeFactor); 
    
    if (leftCoverRef.current) leftCoverRef.current.rotation.z = -coverAngle;
    if (rightCoverRef.current) rightCoverRef.current.rotation.z = coverAngle;

    // Content scaling/floating
    if (contentRef.current) {
       // Scale up content when book is open at edges
       const targetScale = THREE.MathUtils.lerp(0.3, 1.2, edgeFactor);
       contentRef.current.scale.setScalar(targetScale);
       
       // Float content up when open
       contentRef.current.position.y = THREE.MathUtils.lerp(-0.5, 1.5, edgeFactor);
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.6 : 1} position={[0, -1, 0]}>
       {/* Book Content (Science objects emitting from book) */}
       <group ref={contentRef}>
          <ScienceAtom />
          <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[1, 1, 0]}>
             <ScienceMolecule />
          </Float>
       </group>

       {/* Book Geometry (Realistic Style) */}
       <group position={[0, -0.5, 0]}>
         {/* Spine */}
         <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[0.25, 0.25, 3.6, 32]} />
           <meshStandardMaterial color="#1a1a24" roughness={0.9} />
         </mesh>
         {/* Spine Gold Bands */}
         <mesh position={[0, 0, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[0.26, 0.26, 0.1, 32]} />
           <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
         </mesh>
         <mesh position={[0, 0, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[0.26, 0.26, 0.1, 32]} />
           <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
         </mesh>

         {/* Left Cover */}
         <group ref={leftCoverRef} position={[-0.15, 0, 0]}>
            {/* Dark Leather Cover */}
            <mesh position={[-1.25, 0, 0]}>
               <boxGeometry args={[2.5, 0.1, 3.6]} />
               <meshStandardMaterial color="#1a1a24" roughness={0.9} />
            </mesh>
            {/* Gold Trim */}
            <mesh position={[-1.25, 0.051, 0]}>
               <boxGeometry args={[2.3, 0.01, 3.4]} />
               <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Individual Realistic Pages */}
            <PagesStack isLeft={true} />
         </group>

         {/* Right Cover */}
         <group ref={rightCoverRef} position={[0.15, 0, 0]}>
            {/* Dark Leather Cover */}
            <mesh position={[1.25, 0, 0]}>
               <boxGeometry args={[2.5, 0.1, 3.6]} />
               <meshStandardMaterial color="#1a1a24" roughness={0.9} />
            </mesh>
            {/* Gold Trim */}
            <mesh position={[1.25, 0.051, 0]}>
               <boxGeometry args={[2.3, 0.01, 3.4]} />
               <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Individual Realistic Pages */}
            <PagesStack isLeft={false} />
         </group>
       </group>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Dramatic Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#FF1E8C" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#00E5FF" />
        
        <BookOfKnowledge />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={15} blur={2} far={6} color="#0A2463" />
      </Canvas>
    </div>
  );
}
