"use client";

import React from "react";
import CountUp from "react-countup";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
};

export default function AnimatedCounter({
  value,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "fr-FR",
  className,
}: AnimatedCounterProps) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  if (prefersReduced) {
    return (
      <span className={className}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    );
  }

  return (
    <CountUp
      className={className}
      end={value}
      duration={duration / 1000}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      useEasing
      enableScrollSpy
      scrollSpyOnce
    />
  );
}
