"use client";

import { motion, Variants } from "framer-motion";
import { SubtleDivider } from "./SubtleDivider";

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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function EventDetails() {
  return (
    <section className="py-16 px-6 md:py-32 lg:py-40 xl:pr-80 text-foreground bg-background">
      <motion.div
        className="mx-auto max-w-md text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.4em] text-secondary/80"
        >
          detalhes do evento
        </motion.p>

<SubtleDivider />

        <motion.p
          variants={item}
          className="font-serif text-4xl md:text-5xl leading-tight"
        >
          25 de abril
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 text-xl text-secondary"
        >
          às 16h
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 space-y-1.5 text-secondary/90"
        >
          <div className="text-2xl pb-2 lg:pb-4 font-medium text-foreground"> {/* ← troque <p> por <div> */}
            vila clemente
            <div className="text-sm">
              - espaço de eventos -
            </div>
          </div>
          <div className="text-sm leading-relaxed tracking-wide"> {/* ← troque <p> por <div> */}
            rua sebastião de castro e silva<br />
            banguê i, pacajus – ceará<br />
            próximo à rodoviária de pacajus
          </div>
        </motion.div>

        <motion.a
          variants={item}
          href="https://maps.app.goo.gl/i5onZK6MesYPGJFs7"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            mt-12
            rounded-full
            border border-accent/70
            bg-accent/90
            px-10 py-3
            text-xs uppercase tracking-[0.25em]
            text-background
            transition-all
            hover:text-background/80 hover:border-background
          "
        >
          ver no mapa
        </motion.a>
      </motion.div>
    </section>
  );
}