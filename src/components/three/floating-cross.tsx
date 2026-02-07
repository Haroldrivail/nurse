"use client";

import { useRef, useCallback } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Cross({ color = "#6366f1" }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      mouse.current.set(
        (e.point.x / viewport.width) * 2,
        (e.point.y / viewport.height) * 2,
      );
    },
    [viewport],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smooth mouse tracking
    targetRotation.current.set(mouse.current.y * 0.4, mouse.current.x * 0.6);
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * delta * 2;
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * delta * 2;
    // Gentle glow pulsation on children
    groupRef.current.children.forEach((child) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity =
          0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    });
  });

  const barMaterial = (
    <meshStandardMaterial
      color={color}
      transparent
      opacity={0.6}
      roughness={0.3}
      metalness={0.2}
      emissive={color}
      emissiveIntensity={0.2}
    />
  );

  return (
    <group>
      <mesh visible={false} onPointerMove={handlePointerMove}>
        <planeGeometry args={[20, 20]} />
      </mesh>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Vertical bar */}
          <mesh>
            <boxGeometry args={[0.4, 1.6, 0.18]} />
            {barMaterial}
          </mesh>
          {/* Horizontal bar */}
          <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[1.1, 0.4, 0.18]} />
            {barMaterial}
          </mesh>
          {/* Glow halo */}
          <mesh>
            <ringGeometry args={[1.2, 1.35, 48]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

type FloatingCrossProps = {
  className?: string;
  color?: string;
};

export default function FloatingCross({
  className = "",
  color = "#6366f1",
}: FloatingCrossProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.5} />
        <pointLight position={[-2, -1, 2]} intensity={0.3} color={color} />
        <Cross color={color} />
      </Canvas>
    </div>
  );
}
