"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  from?: "up" | "down" | "left" | "right";
  distance?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  from = "down",
  distance = 22,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset = reduceMotion ? 0 : distance;
  const axisOffset =
    from === "left"
      ? { x: -offset, y: 0 }
      : from === "right"
        ? { x: offset, y: 0 }
        : from === "down"
          ? { x: 0, y: offset }
          : { x: 0, y: -offset };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: axisOffset.x,
      y: axisOffset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
