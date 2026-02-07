"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function generateNetwork(nodeCount: number) {
  const ns: THREE.Vector3[] = [];
  for (let i = 0; i < nodeCount; i++) {
    ns.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 2,
      ),
    );
  }
  const es: [number, number][] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (ns[i].distanceTo(ns[j]) < 2.0) {
        es.push([i, j]);
      }
    }
  }
  const lineArr: number[] = [];
  es.forEach(([a, b]) => {
    lineArr.push(ns[a].x, ns[a].y, ns[a].z);
    lineArr.push(ns[b].x, ns[b].y, ns[b].z);
  });
  return { nodes: ns, linePositions: new Float32Array(lineArr) };
}

function Network({ color = "#6366f1", nodeCount = 24 }) {
  const groupRef = useRef<THREE.Group>(null);
  const [data, setData] = useState<{
    nodes: THREE.Vector3[];
    linePositions: Float32Array;
  } | null>(null);
  const mouse = useRef(new THREE.Vector3(999, 999, 0));
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    setData(generateNetwork(nodeCount));
  }, [nodeCount]);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    mouse.current.copy(e.point);
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current || !data) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x += delta * 0.015;

    // Highlight nodes near the cursor
    nodeRefs.current.forEach((mesh) => {
      if (!mesh) return;
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);
      const dist = worldPos.distanceTo(mouse.current);
      const targetScale = dist < 1.5 ? 2.5 : 1;
      const currentScale = mesh.scale.x;
      const newScale = THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        delta * 5,
      );
      mesh.scale.setScalar(newScale);

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = dist < 1.5 ? 0.8 : 0.15;
    });
  });

  if (!data) return null;

  return (
    <group>
      <mesh visible={false} onPointerMove={handlePointerMove}>
        <planeGeometry args={[30, 30]} />
      </mesh>
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={groupRef}>
          {data.nodes.map((pos, idx) => (
            <mesh
              key={idx}
              position={pos}
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
            >
              <sphereGeometry args={[0.06, 14, 14]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.8}
                emissive={color}
                emissiveIntensity={0.15}
              />
            </mesh>
          ))}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[data.linePositions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.3} />
          </lineSegments>
        </group>
      </Float>
    </group>
  );
}

type NetworkGraphProps = {
  className?: string;
  color?: string;
  nodeCount?: number;
};

export default function NetworkGraph({
  className = "",
  color = "#6366f1",
  nodeCount = 24,
}: NetworkGraphProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#fff" />
        <Network color={color} nodeCount={nodeCount} />
      </Canvas>
    </div>
  );
}
