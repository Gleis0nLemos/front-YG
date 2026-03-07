"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-90px 0px -40px 0px", // dispara mais cedo no mobile
    amount: 0.1,
  });

  return (
    <div ref={ref} className="flex justify-center my-10 md:my-6">
      <svg
        viewBox="0 0 420 60"
        className="w-[min(420px,92vw)] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Linha principal */}
        <motion.path
          d="M 0 30 Q 60 18, 120 32 Q 180 45, 240 28 Q 300 15, 360 30 Q 390 38, 420 29"
          stroke="#6b7e66"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />

        {/* Linha secundária */}
        <motion.path
          d="M 0 34 Q 70 24, 130 38 Q 190 50, 250 33 Q 310 20, 370 35 L 420 34"
          stroke="#5a6d55"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.35 } : false}
          transition={{ duration: 2.6, delay: 0.3, ease: "easeOut" }}
        />

        {/* Elementos decorativos */}
        <motion.g>
          {/* Folhinha esquerda */}
          <motion.path
            d="M 148 24 Q 158 12, 172 22 Q 165 30, 148 24 Z"
            fill="#7a8f78"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.9 } : false}
            style={{ transformOrigin: "160px 22px" }}
            transition={{ delay: 1.1, duration: 0.7, type: "spring", stiffness: 180 }}
          />

          {/* Folhinha direita */}
          <motion.path
            d="M 268 36 Q 280 26, 292 38 Q 282 46, 268 36 Z"
            fill="#6b7e66"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.85 } : false}
            style={{ transformOrigin: "280px 36px" }}
            transition={{ delay: 1.4, duration: 0.7, type: "spring", stiffness: 160 }}
          />

          {/* Traços decorativos */}
          <motion.path
            d="M 312 22 L 328 18 M 322 26 L 336 30"
            stroke="#7a8f78"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.8 } : false}
            transition={{ delay: 1.6, duration: 0.9 }}
          />
        </motion.g>

        {/* Pontinhos finais */}
        <motion.circle
          cx="398"
          cy="28"
          r="2.2"
          fill="#8a9f88"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : false}
          transition={{ delay: 2.1, duration: 0.5, type: "spring" }}
        />
        <motion.circle
          cx="410"
          cy="34"
          r="1.4"
          fill="#7a8f78"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : false}
          transition={{ delay: 2.3, duration: 0.5, type: "spring" }}
        />
      </svg>
    </div>
  );
}