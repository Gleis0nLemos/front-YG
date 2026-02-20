"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function HeraEntrelaçada() {
  const centerX = 160;
  const centerY = 160;
  const radius = 125;

  // Arredondamento mais forte (1 casa decimal) para coordenadas e ângulos
  const round = (num: number, decimals = 1) => Number(num.toFixed(decimals));

  const getPosition = (angle: number, distance = radius) => {
    const rad = (angle * Math.PI) / 180;
    const x = centerX + Math.cos(rad) * distance;
    const y = centerY + Math.sin(rad) * distance;
    return {
      x: round(x, 1),
      y: round(y, 1),
    };
  };

  const vinePositions = [
    { angle: 0,   length: 1.05, delay: 0.8 },
    { angle: 45,  length: 0.95, delay: 1.0 },
    { angle: 90,  length: 1.10, delay: 0.6 },
    { angle: 135, length: 0.98, delay: 1.2 },
    { angle: 180, length: 1.08, delay: 0.4 },
    { angle: 225, length: 0.92, delay: 1.1 },
    { angle: 270, length: 1.12, delay: 0.7 },
    { angle: 315, length: 1.00, delay: 0.9 },
  ];

  const extraLeaves = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const seedOffset = i * 17;
      const angleExtra = Math.sin(seedOffset) * 7.5 + Math.cos(seedOffset * 1.3) * 7.5;
      const distExtra = Math.sin(seedOffset * 2.1) * 0.2 + Math.cos(seedOffset * 3.4) * 0.2;
      const scaleExtra = Math.sin(seedOffset * 0.8) * 0.3 + Math.cos(seedOffset * 1.7) * 0.3;
      const rotExtra = Math.sin(seedOffset * 4.2) * 20 + Math.cos(seedOffset * 5.1) * 20;

      return {
        angle: i * 30 + angleExtra,
        distFactor: 0.75 + distExtra,
        scale: round(0.5 + scaleExtra, 2),
        extraRotation: round(rotExtra, 1),
      };
    });
  }, []);

  const leafScaleVariations = useMemo(() => {
    return Array.from({ length: 7 }).map((_, j) => {
      const seed = j * 13 + 7;
      return round(0.7 + (Math.sin(seed) * 0.25 + Math.cos(seed * 2.3) * 0.25), 2);
    });
  }, []);

  const fallingPetals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const seed = i * 23 + 11;
      const pseudoRandom = (Math.sin(seed) * 43758.5453) % 1;
      const pseudoRandom2 = (Math.sin(seed * 1.7) * 43758.5453) % 1;
      const pseudoRandom3 = (Math.sin(seed * 3.1) * 43758.5453) % 1;
      const pseudoRandom4 = (Math.sin(seed * 4.9) * 43758.5453) % 1;

      const startAngle = pseudoRandom * 360;
      const startDist = radius * (0.8 + pseudoRandom2 * 0.4);
      const startPos = getPosition(startAngle, startDist);

      return {
        index: i,
        startX: startPos.x,
        startY: startPos.y - 40 - pseudoRandom * 60,
        sway: round((10 + pseudoRandom3 * 20) * (pseudoRandom2 > 0.5 ? 1 : -1), 1),
        duration: 8 + pseudoRandom4 * 6,
        delay: pseudoRandom * 4,
        scale: round(0.4 + pseudoRandom3 * 0.5, 2),
        rotationStart: round(pseudoRandom4 * 180 - 90, 1),
      };
    });
  }, []);

  return (
    <div className="flex justify-center items-center my-16 md:my-24">
      <svg
        width="360"
        height="360"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-72 h-72 md:w-96 md:h-96 text-emerald-600 drop-shadow-2xl"
      >
        {/* Aro principal */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="currentColor"
          strokeWidth="1.4"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 5, ease: "easeOut", delay: 0.5 }}
        />

        {/* Aro interno sutil */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius - 22}
          stroke="currentColor"
          strokeWidth="0.7"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 6, delay: 2.2, ease: "easeOut" }}
        />

        {/* Videiras de hera */}
        {vinePositions.map((pos, i) => {
          const startAngle = pos.angle - 12;
          const endAngle = pos.angle + 12 * pos.length;
          const start = getPosition(startAngle, radius * 0.88);
          const end = getPosition(endAngle, radius * pos.length);

          const cp1 = getPosition(pos.angle - 5, radius * 1.05);
          const cp2 = getPosition(pos.angle + 8, radius * 1.02);

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: pos.delay + i * 0.15, ease: "easeOut" }}
            >
              <motion.path
                d={`M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  pathLength: { duration: 3.2 + i * 0.2, ease: "easeOut", delay: pos.delay },
                  opacity: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                }}
              />

              {/* Folhas ao longo da videira */}
              {Array.from({ length: 7 }).map((_, j) => {
                const t = (j + 1) / 8;
                const leafAngle = pos.angle + (j - 3) * 12 + Math.sin(j) * 15;
                const scale = leafScaleVariations[j];
                const offset = 8 + Math.sin(j * 2) * 4;

                const leafX = start.x + (end.x - start.x) * t + Math.cos((leafAngle * Math.PI) / 180) * offset;
                const leafY = start.y + (end.y - start.y) * t + Math.sin((leafAngle * Math.PI) / 180) * offset;

                const roundedX = round(leafX, 1);
                const roundedY = round(leafY, 1);
                const roundedAngle = round(leafAngle + 90, 1);

                return (
                  <motion.g
                    key={j}
                    initial={{ scale: 0, rotate: round(-30 + j * 12, 1) }}
                    animate={{
                      scale,
                      rotate: [round(-30 + j * 12, 1), round(-10 + j * 8, 1)],
                    }}
                    transition={{
                      duration: 2.4 + j * 0.15,
                      delay: pos.delay + 0.6 + j * 0.18,
                      type: "spring",
                      stiffness: 140,
                      damping: 10,
                    }}
                  >
                    <motion.path
                      d="M0,-10 Q -6,-4 -8,2 Q -10,8 -6,12 Q 0,14 6,12 Q 10,8 8,2 Q 6,-4 0,-10 Z"
                      fill="currentColor"
                      opacity={0.9 - j * 0.05}
                      transform={`translate(${roundedX}, ${roundedY}) rotate(${roundedAngle}) scale(${round(scale * 1.1, 2)})`}
                    />
                  </motion.g>
                );
              })}
            </motion.g>
          );
        })}

        {/* Folhinhas extras fixas */}
        {extraLeaves.map(({ angle, distFactor, scale, extraRotation }, i) => {
          const dist = radius * distFactor;
          const pos = getPosition(angle, dist);
          const x = pos.x;
          const y = pos.y;
          const rot = round(angle + 90 + extraRotation, 1);

          return (
            <motion.path
              key={`extra-${i}`}
              d="M0,-6 Q -4,-3 -5,1 Q -6,5 -4,8 Q 0,9 4,8 Q 6,5 5,1 Q 4,-3 0,-6 Z"
              fill="currentColor"
              opacity={0.7}
              initial={{ scale: 0, y: -20, opacity: 0 }}
              animate={{
                scale,
                y: 0,
                opacity: 0.8,
              }}
              transition={{
                duration: 2.5 + i * 0.12,
                delay: 1.5 + i * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              transform={`translate(${x}, ${y}) rotate(${rot}) scale(${round(scale, 2)})`}
            />
          );
        })}

        {/* Pétalas caindo */}
        {fallingPetals.map((petal) => {
          const rotStart = round(petal.rotationStart, 1);
          const rotEnd = round(petal.rotationStart + 360 * (petal.sway > 0 ? 1 : -1), 0);

          return (
            <motion.path
              key={`petal-${petal.index}`}
              d="M0,-8 Q -5,-3 -6,2 Q -7,7 -4,10 Q 0,12 4,10 Q 7,7 6,2 Q 5,-3 0,-8 Z"
              fill="currentColor"
              opacity={0.75}
              initial={{
                opacity: 0,
                scale: 0.1,
                x: petal.startX,
                y: petal.startY,
                rotate: rotStart,
              }}
              animate={{
                opacity: [0, 0.9, 0.6, 0],
                scale: petal.scale,
                y: [petal.startY, centerY + radius + 80],
                x: [petal.startX, petal.startX + petal.sway],
                rotate: [rotStart, rotEnd],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay + 1.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 2 + (petal.delay % 3),
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}