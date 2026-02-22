"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/* ------------------------------------------------------------------ */
/*  Lazy-loaded 3D scenes — skipped during SSR (Three.js needs DOM).  */
/* ------------------------------------------------------------------ */

type FloatingParticlesProps = {
  className?: string;
  count?: number;
  color?: string;
};
type GlobeSceneProps = { className?: string; color?: string };
type FloatingCrossProps = { className?: string; color?: string };
type PulsingHeartProps = { className?: string; color?: string };
type NetworkGraphProps = {
  className?: string;
  color?: string;
  nodeCount?: number;
};

export const FloatingParticles: ComponentType<FloatingParticlesProps> = dynamic(
  () => import("./floating-particles"),
  { ssr: false },
);

export const GlobeScene: ComponentType<GlobeSceneProps> = dynamic(
  () => import("./globe-scene"),
  { ssr: false },
);

export const FloatingCross: ComponentType<FloatingCrossProps> = dynamic(
  () => import("./floating-cross"),
  { ssr: false },
);

export const PulsingHeart: ComponentType<PulsingHeartProps> = dynamic(
  () => import("./pulsing-heart"),
  { ssr: false },
);

export const NetworkGraph: ComponentType<NetworkGraphProps> = dynamic(
  () => import("./network-graph"),
  { ssr: false },
);
