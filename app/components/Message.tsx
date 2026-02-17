"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

export function Message() {
  return (
    <section className="py-32 px-6 bg-background">
      <motion.div
        className="mx-auto max-w-xl text-center text-foreground"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose">
          Com alegria no coração e a certeza
          <br />
          de que estamos vivendo os planos de Deus,
          <br />
          decidimos unir nossas vidas em uma só caminhada.
        </motion.p>

        <div className="my-10" />

        <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose">
          Entre sonhos compartilhados, aprendizados
          <br />
          e momentos vividos, edificamos um amor
          <br />
          firmado no respeito e na parceria.
        </motion.p>

        <div className="my-10" />

        <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose">
          Cremos que o amor é o alicerce de tudo,
          <br />
          é ele que nos fortalece, nos ensina
          <br />
          e nos aproxima a cada dia.
        </motion.p>

        <div className="my-10" />

        <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose">
          “Acima de tudo, porém, revistam-se do amor,
          <br />
          que é o elo perfeito.”
          <br />
          <span className="text-sm text-secondary">
            Colossenses 3:14
          </span>
        </motion.p>

        <div className="mx-auto my-14 h-px w-16 bg-border opacity-50" />

        <motion.p variants={fade} className="text-xs uppercase tracking-[0.4em] text-secondary">
          Gleison & Yasmim
        </motion.p>
      </motion.div>
    </section>
  );
}
