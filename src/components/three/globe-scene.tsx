"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Globe({ color = "#6366f1" }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
    // Breathing glow
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Wireframe sphere */}
        <Sphere args={[1.6, 36, 36]}>
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.35}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </Sphere>
        {/* Inner glow sphere */}
        <Sphere args={[1.55, 24, 24]} ref={glowRef}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        {/* Equator ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.012, 12, 100]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.5}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Latitude rings */}
        {[0.5, -0.5, 1.0, -1.0].map((tilt, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, tilt]}>
            <torusGeometry args={[1.7, 0.008, 8, 70]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.15 + i * 0.03}
            />
          </mesh>
        ))}
        {/* Longitude arc */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.7, 0.008, 8, 70]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#fff" />
      <pointLight position={[-3, -3, 3]} intensity={0.3} color="#6366f1" />
    </>
  );
}

type GlobeSceneProps = {
  className?: string;
  color?: string;
};

export default function GlobeScene({
  className = "",
  color = "#6366f1",
}: GlobeSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Globe color={color} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
