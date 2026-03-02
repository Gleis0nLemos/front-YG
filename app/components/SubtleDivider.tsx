"use client";

import { motion, Variants } from "framer-motion";

const dividerVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.9, 
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

export function SubtleDivider() {
  return (
    <div className="relative mx-auto my-8 w-3/4 max-w-xs md:max-w-sm"> 
      <motion.svg
        className="w-full h-6 text-accent" 
        viewBox="0 0 400 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        animate="visible"
      >
        
        <motion.path
          variants={dividerVariants}
          d="M 20 20 H 380"
        />

        
        <motion.g variants={dividerVariants}>
          <motion.path d="M 20 20 Q 10 15, 5 20 Q 10 25, 20 20" />
          <motion.path d="M 12 18 Q 5 12, 0 15" />
          <motion.path d="M 12 22 Q 5 28, 0 25" />
        </motion.g>

        
        <motion.g variants={dividerVariants}>
          <motion.path d="M 380 20 Q 390 15, 395 20 Q 390 25, 380 20" />
          <motion.path d="M 388 18 Q 395 12, 400 15" />
          <motion.path d="M 388 22 Q 395 28, 400 25" />
        </motion.g>
      </motion.svg>
    </div>
  );
}