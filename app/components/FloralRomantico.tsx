"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function FloralRomantico() {
  const shouldReduceMotion = useReducedMotion();

  const centerX = 170;
  const centerY = 170;
  const radius = 130;

  const getPosition = (angle: number, distance = radius) => {
    const rad = (angle * Math.PI) / 180;
    const x = centerX + Math.cos(rad) * distance;
    const y = centerY + Math.sin(rad) * distance;
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
  };

  const random = (seed: number) => (Math.sin(seed * 12.9898) * 43758.5453) % 1;

  const flowerPositions = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const seed = i * 17 + 7;
      const r1 = random(seed);
      const r2 = random(seed * 2.3);
      return {
        angle: i * 22.5 + r1 * 40 - 20,
        scale: 0.75 + r1 * 0.55,
        delay: 0.5 + r2 * 2.5,
        petalRotationOffset: r1 * 60 - 30,
      };
    });
  }, []);

  const leafPositionsOnRim = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const seed = i * 23 + 11;
      const r1 = random(seed);
      const r2 = random(seed * 1.8);
      return {
        angle: i * 45 + r1 * 45 - 22.5,
        scale: 0.85 + r1 * 0.45,
        delay: 0.8 + r2 * 2.2,
      };
    });
  }, []);

  const fallingFlowers = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const seed = i * 31 + 13;
      const r1 = random(seed);
      const r2 = random(seed * 1.9);
      const r3 = random(seed * 3.7);
      const r4 = random(seed * 5.1);

      const startAngle = r1 * 360;
      const startDist = radius * (0.55 + r2 * 0.75);
      const startPos = getPosition(startAngle, startDist);

      return {
        index: i,
        startX: startPos.x,
        startY: startPos.y - 140 - r3 * 120,
        sway: (20 + r4 * 45) * (r2 > 0.5 ? 1 : -1),
        duration: 9 + r1 * 10,
        delay: r3 * 5.5,
        scale: 0.55 + r4 * 0.55,
        rotSpeed: r2 > 0.5 ? 720 : -720,
      };
    });
  }, []);

  const fallingLeaves = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => {
      const seed = i * 37 + 19;
      const r1 = random(seed);
      const r2 = random(seed * 2.1);
      const r3 = random(seed * 4.3);

      const startAngle = r1 * 360;
      const startPos = getPosition(startAngle, radius * 0.92);

      return {
        index: i,
        startX: startPos.x,
        startY: startPos.y - 140 - r2 * 100,
        sway: (25 + r3 * 40) * (r1 > 0.5 ? 1 : -1),
        duration: 11 + r1 * 9,
        delay: r2 * 6.5,
        scale: 0.65 + r3 * 0.55,
      };
    });
  }, []);

  if (shouldReduceMotion) {
    return (
      <div className="flex justify-center items-center my-16 md:my-24">
        <svg
          width="360"
          height="360"
          viewBox="0 0 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 h-72 md:w-96 md:h-96 text-accent drop-shadow-xl"
        >
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
            opacity={0.7}
          />
          {flowerPositions.map((pos, i) => {
            const { x, y } = getPosition(pos.angle);
            return <circle key={i} cx={x} cy={y} r={6} fill="currentColor" />;
          })}
        </svg>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex justify-center items-center my-16 md:my-24">
        <svg
          width="380"
          height="380"
          viewBox="0 0 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-80 h-80 md:w-[26rem] md:h-[26rem] text-accent drop-shadow-2xl"
        >
          {/* Aro principal com pulsar leve */}
          <m.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="currentColor"
            strokeWidth="1.6"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.03, 1],
            }}
            transition={{
              pathLength: { duration: 4, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
              opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Círculo interno */}
          <m.circle
            cx={centerX}
            cy={centerY}
            r={radius - 20}
            stroke="currentColor"
            strokeWidth="0.9"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 5.5, delay: 1.5, ease: "easeOut" }}
          />

          {/* Centro exato como na referência: Y & G com linhas diagonais e folhas nos cantos */}
          {/* Centro clean: Y & G ainda menores, & bem menor que as iniciais */}
<m.g
  initial={{ opacity: 0, scale: 0.7 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 3.2,
    delay: 2.0,
    type: "spring",
    stiffness: 120,
    damping: 14,
  }}
>
  <g transform={`translate(${centerX}, ${centerY})`}>
    {/* Y à esquerda – menor ainda */}
    <text
      x="-32"
      y="12"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="54"
      fontWeight="bold"
      fill="currentColor"
      opacity={0.94}
    >
      Y
    </text>

    {/* & central – bem menor que Y e G */}
    <text
      x="0"
      y="18"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="38"
      fontWeight="400"
      fill="currentColor"
      opacity={0.88}
    >
      &
    </text>

    {/* G à direita – menor ainda */}
    <text
      x="32"
      y="12"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="54"
      fontWeight="bold"
      fill="currentColor"
      opacity={0.94}
    >
      G
    </text>
  </g>
</m.g>

          {/* Flores principais - mantidas iguais */}
          {flowerPositions.map((pos, i) => {
            const { x, y } = getPosition(pos.angle);
            const rotOffset = pos.petalRotationOffset;

            return (
              <m.g
                key={i}
                initial={{ opacity: 0, scale: 0.3, rotate: -15 + rotOffset }}
                animate={{
                  opacity: 1,
                  scale: pos.scale,
                  rotate: rotOffset / 2.5,
                }}
                transition={{
                  duration: 2.8 + i * 0.08,
                  delay: pos.delay,
                  type: "spring",
                  stiffness: 140,
                  damping: 12,
                }}
              >
                <circle cx={x} cy={y} r={6.5 + (i % 4)} fill="currentColor" />

                {[-75, -45, -15, 15, 45, 75, 105, 135].map((rot, j) => (
                  <m.ellipse
                    key={`type1-${j}`}
                    cx={x}
                    cy={y}
                    rx={11.5 - j * 0.8}
                    ry={5.5 + (i % 4) * 0.6}
                    fill="currentColor"
                    opacity={0.92 - j * 0.06}
                    transform={`rotate(${rot + pos.angle * 0.35 + rotOffset} ${x} ${y}) translate(0, -12)`}
                  />
                ))}

                {[-60, -30, 0, 30, 60, 90].map((rot, j) => (
                  <m.path
                    key={`type2-${j}`}
                    d="M0,-14 L -4,-2 Q -8,4 -3,12 Q0,16 3,12 Q8,4 4,-2 Z"
                    fill="currentColor"
                    opacity={0.85 - j * 0.08}
                    transform={`translate(${x},${y}) rotate(${rot + pos.angle * 0.5 + rotOffset + 180}) scale(1.1)`}
                  />
                ))}

                {[-90, -50, 10, 50, 100].map((rot, j) => (
                  <m.ellipse
                    key={`type3-${j}`}
                    cx={x}
                    cy={y}
                    rx={9 + (j % 3) * 1.2}
                    ry={4.2 + Math.sin(j) * 1.5}
                    fill="currentColor"
                    opacity={0.8 - j * 0.09}
                    transform={`rotate(${rot + pos.angle * 0.4 + rotOffset + 30} ${x} ${y}) translate(0, -10) skewX(15)`}
                  />
                ))}

                <m.circle cx={x} cy={y} r={3.8} fill="currentColor" opacity={0.65} />
              </m.g>
            );
          })}

          {/* Folhas no aro */}
          {leafPositionsOnRim.map((pos, i) => {
            const { x, y } = getPosition(pos.angle);
            return (
              <m.g
                key={`leaf-rim-${i}`}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: pos.scale }}
                transition={{
                  duration: 2.4 + i * 0.12,
                  delay: pos.delay,
                  type: "spring",
                  stiffness: 160,
                  damping: 13,
                }}
              >
                <path
                  d="M0,-14 Q -9,-7 -11,4 Q -13,15 -6,20 Q0,23 6,20 Q13,15 11,4 Q9,-7 0,-14 Z"
                  fill="currentColor"
                  opacity={0.78}
                  transform={`translate(${x}, ${y}) rotate(${pos.angle + 90}) scale(${pos.scale * 1.1})`}
                />
              </m.g>
            );
          })}

          {/* Flores caindo */}
          {fallingFlowers.map((f) => (
            <m.g
              key={`fall-f-${f.index}`}
              initial={{ opacity: 0, scale: 0.2, x: f.startX, y: f.startY }}
              animate={{
                opacity: [0, 0.95, 0.78, 0.45, 0],
                scale: f.scale,
                x: [f.startX, f.startX + f.sway, f.startX + f.sway * 0.4],
                y: [f.startY, centerY + radius + 160],
                rotate: [0, f.rotSpeed],
              }}
              transition={{
                duration: f.duration,
                delay: f.delay + 1.8,
                ease: "easeInOut",
                times: [0, 0.12, 0.5, 0.88, 1],
                repeat: Infinity,
                repeatDelay: 2 + (f.delay % 5),
              }}
            >
              <circle cx={0} cy={0} r={5.2} fill="currentColor" />
              {[-50, -15, 20, 55].map((rot, j) => (
                <ellipse
                  key={j}
                  cx={0}
                  cy={0}
                  rx={10 - j * 1.3}
                  ry={4.8}
                  fill="currentColor"
                  opacity={0.85 - j * 0.12}
                  transform={`rotate(${rot} 0 0) translate(0, -10)`}
                />
              ))}
            </m.g>
          ))}

          {/* Folhas caindo */}
          {fallingLeaves.map((l) => (
            <m.path
              key={`fall-leaf-${l.index}`}
              d="M0,-14 Q -9,-7 -11,4 Q -13,15 -6,20 Q0,23 6,20 Q13,15 11,4 Q9,-7 0,-14 Z"
              fill="currentColor"
              opacity={0.78}
              initial={{ opacity: 0, scale: 0.25, x: l.startX, y: l.startY, rotate: 0 }}
              animate={{
                opacity: [0, 0.92, 0.68, 0.3, 0],
                scale: l.scale,
                x: [l.startX, l.startX + l.sway, l.startX + l.sway * 0.3],
                y: [l.startY, centerY + radius + 160],
                rotate: [0, 900 * (l.sway > 0 ? 1 : -1)],
              }}
              transition={{
                duration: l.duration,
                delay: l.delay + 1.5,
                ease: "easeInOut",
                times: [0, 0.15, 0.55, 0.9, 1],
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          ))}
        </svg>
      </div>
    </LazyMotion>
  );
}