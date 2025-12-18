"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-background text-foreground">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-soft" />

      <motion.div
        className="relative z-10 max-w-3xl text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Você está convidado(a)
        </motion.p>

        {/* Título */}
        <motion.h1
          variants={item}
          className="mt-6 text-4xl md:text-6xl font-serif leading-tight"
        >
          Chá de Cozinha
        </motion.h1>

        {/* Nomes */}
        <motion.p
          variants={item}
          className="mt-6 text-lg md:text-xl tracking-wide text-secondary"
        >
          Gleison <span className="mx-2">&</span> Yasmim
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          className="mx-auto my-8 h-px w-20 bg-border"
        />

        {/* Data / Local */}
        <motion.div
          variants={item}
          className="space-y-1 text-secondary"
        >
          <p>10 de Maio • 16h</p>
          <p>Rua Exemplo, 123 — Centro</p>
        </motion.div>

        {/* CTA */}
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

      {/* Scroll hint */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-xs tracking-widest text-secondary"
      >
        role para baixo
      </motion.span>
    </section>
  );
}

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
