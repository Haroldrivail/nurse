"use client";

import { ChevronsUp } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed right-6 bottom-20 z-50">
          {/* Circle progress indicator */}
          <div
            className="relative w-12 h-12 cursor-pointer"
            onClick={scrollToTop}
          >
            {/* Background circle */}
            <svg className="w-12 h-12" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="var(--color-base-200)"
                stroke="var(--color-base-300)"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="var(--color-primary)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>

            {/* Arrow icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronsUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
