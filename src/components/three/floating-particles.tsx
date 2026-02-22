"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

function generatePositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return arr;
}

function Particles({ count = 180, color = "#6366f1" }) {
  const mesh = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    setPositions(generatePositions(count));
  }, [count]);

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      mouse.current.set(
        (e.point.x / viewport.width) * 2,
        (e.point.y / viewport.height) * 2
      );
    },
    [viewport]
  );

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.04;
    mesh.current.rotation.x += delta * 0.02;
    // Mouse influence
    mesh.current.rotation.y +=
      (mouse.current.x * 0.3 - mesh.current.rotation.y) * delta * 0.5;
    mesh.current.rotation.x +=
      (-mouse.current.y * 0.2 - mesh.current.rotation.x) * delta * 0.5;
    // Shimmer
    const material = mesh.current.material as THREE.PointsMaterial;
    material.size = 0.06 + Math.sin(state.clock.elapsedTime * 2) * 0.015;
  });

  if (!positions) return null;

  return (
    <group>
      <mesh visible={false} onPointerMove={handlePointerMove}>
        <planeGeometry args={[50, 50]} />
      </mesh>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

type FloatingParticlesProps = {
  className?: string;
  count?: number;
  color?: string;
};

export default function FloatingParticles({
  className = "",
  count = 180,
  color = "#6366f1",
}: FloatingParticlesProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={count} color={color} />
      </Canvas>
    </div>
  );
}
