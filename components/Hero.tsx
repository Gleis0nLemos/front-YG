"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";

const Countdown = dynamic(
  () => import("./Countdown").then((mod) => mod.Countdown),
  { ssr: false }
);


const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-soft" />

      <motion.div
        className="relative z-10 max-w-3xl text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Você está convidado(a)
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl md:text-6xl font-serif"
        >
          Chá de Cozinha
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 text-lg md:text-xl text-secondary"
        >
          Gleison <span className="mx-2">&</span> Yasmim
        </motion.p>

        <motion.div
          variants={item}
          className="mx-auto my-8 h-px w-20 bg-border"
        />

        <motion.div variants={item} className="space-y-1 text-secondary">
          <p>28 de Fevereiro • 16h</p>
          <p>Rua Exemplo, 123 — Centro</p>
        </motion.div>

        <motion.div variants={item}>
          <Countdown />
        </motion.div>

        <motion.a
          variants={item}
          href="#presentes"
          className="
            inline-block mt-12 rounded-full
            border border-accent
            px-8 py-3 text-sm uppercase tracking-widest
            text-accent
            transition
            hover:shadow-[0_8px_30px_-10px_var(--accent)]
          "
        >
          Ver lista de presentes
        </motion.a>
      </motion.div>
    </section>
  );
}

