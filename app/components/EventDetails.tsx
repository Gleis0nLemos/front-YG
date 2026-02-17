"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // equivalente ao easeOut
    },
  },
};

export function EventDetails() {
  return (
    <section className="py-28 px-6 bg-soft text-foreground">
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.35em] text-secondary"
        >
          Detalhes do evento
        </motion.p>

        <motion.div
          variants={item}
          className="mx-auto my-10 h-px w-14 bg-border opacity-60"
        />

        <motion.p
          variants={item}
          className="font-serif text-3xl md:text-4xl leading-none"
        >
          25 de Abril
        </motion.p>

        <motion.p
          variants={item}
          className="mt-3 text-lg md:text-xl text-secondary"
        >
          às 16h
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 text-secondary leading-relaxed"
        >
          <span className="text-2xl">Vila Clemente</span> <br/>
          Espaço de Eventos
        </motion.p>

        <motion.a
          variants={item}
          href="https://maps.app.goo.gl/i5onZK6MesYPGJFs7"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block mt-10
            rounded-full
            border border-accent
            px-6 py-2
            text-xs uppercase tracking-widest
            text-accent
            transition
            hover:bg-accent hover:text-background
          "
        >
          Ver no mapa
        </motion.a>
      </motion.div>
    </section>
  );
}
