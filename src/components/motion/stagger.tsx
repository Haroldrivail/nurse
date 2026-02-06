"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  stagger?: number;
  from?: "up" | "down" | "left" | "right";
  distance?: number;
  alternate?: boolean;
};

export default function Stagger({
  children,
  className,
  once = true,
  stagger = 0.18,
  from = "down",
  distance = 18,
  alternate = false,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  const offset = reduceMotion ? 0 : distance;
  const baseAxis = from === "left" ? "x" : from === "right" ? "x" : "y";
  const baseSign =
    from === "left" ? -1 : from === "right" ? 1 : from === "down" ? 1 : -1;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
      },
    },
  };

  const item: Variants = {
    hidden: (index: number) => {
      const sign = alternate ? (index % 2 === 0 ? -1 : 1) : baseSign;
      const axisOffset = sign * offset;

      return {
        opacity: 0,
        x: baseAxis === "x" ? axisOffset : 0,
        y: baseAxis === "y" ? axisOffset : 0,
      };
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item} custom={index}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
