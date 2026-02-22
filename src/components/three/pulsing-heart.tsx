"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Heart({ color = "#e11d48" }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const clickTime = useRef(0);

  const handleClick = useCallback(() => {
    setClicked(true);
    clickTime.current = performance.now();
    setTimeout(() => setClicked(false), 600);
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !matRef.current) return;
    const t = state.clock.elapsedTime;

    // Heartbeat: double-pulse when clicked, gentle pulse otherwise
    let scale: number;
    if (clicked) {
      const elapsed = (performance.now() - clickTime.current) / 1000;
      const beat =
        Math.sin(elapsed * Math.PI * 6) * 0.15 * Math.max(0, 1 - elapsed * 1.8);
      scale = 1.05 + beat;
    } else {
      scale = 1 + Math.sin(t * 1.8) * 0.08;
    }
    groupRef.current.scale.set(scale, scale, scale);

    // Float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.2;

    // Emissive glow
    matRef.current.emissiveIntensity = hovered
      ? 0.5 + Math.sin(t * 3) * 0.15
      : 0.2 + Math.sin(t * 1.5) * 0.08;
    matRef.current.opacity = hovered ? 0.75 : 0.55;
  });

  const heartShape = new THREE.Shape();
  const x = 0,
    y = 0;
  heartShape.moveTo(x, y + 0.5);
  heartShape.bezierCurveTo(x, y + 0.5, x - 0.06, y + 0.38, x - 0.3, y + 0.38);
  heartShape.bezierCurveTo(
    x - 0.7,
    y + 0.38,
    x - 0.7,
    y + 0.75,
    x - 0.7,
    y + 0.75,
  );
  heartShape.bezierCurveTo(x - 0.7, y + 1.0, x - 0.5, y + 1.25, x, y + 1.6);
  heartShape.bezierCurveTo(
    x + 0.5,
    y + 1.25,
    x + 0.7,
    y + 1.0,
    x + 0.7,
    y + 0.75,
  );
  heartShape.bezierCurveTo(
    x + 0.7,
    y + 0.75,
    x + 0.7,
    y + 0.38,
    x + 0.3,
    y + 0.38,
  );
  heartShape.bezierCurveTo(x + 0.06, y + 0.38, x, y + 0.5, x, y + 0.5);

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={[0, -0.55, 0]}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh>
          <extrudeGeometry
            args={[
              heartShape,
              {
                depth: 0.25,
                bevelEnabled: true,
                bevelThickness: 0.08,
                bevelSize: 0.06,
                bevelSegments: 4,
              },
            ]}
          />
          <meshStandardMaterial
            ref={matRef}
            color={color}
            transparent
            opacity={0.55}
            roughness={0.3}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Outer glow ring */}
        <mesh position={[0, 0.55, 0.12]}>
          <ringGeometry args={[0.9, 1.05, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}

type PulsingHeartProps = {
  className?: string;
  color?: string;
};

export default function PulsingHeart({
  className = "",
  color = "#e11d48",
}: PulsingHeartProps) {
  return (
    <div className={className} style={{ cursor: "pointer" }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 3]} intensity={0.6} />
        <pointLight position={[-2, 0, 2]} intensity={0.4} color={color} />
        <Heart color={color} />
      </Canvas>
    </div>
  );
}
