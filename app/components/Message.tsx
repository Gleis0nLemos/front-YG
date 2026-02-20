"use client";

import { motion, Variants } from "framer-motion";
import { FloralRomantico } from "@/app/components/FloralRomantico";

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
    <section className="pl-6 py-12 lg:py-24 bg-background flex items-center justify-center">
      <motion.div
        className="mx-auto w-full max-w-5xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Empilha em mobile → lado a lado em lg+ */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-8">
          {/* Floral sempre centralizado horizontalmente */}
          <motion.div
            variants={fade}
            className="mb-10 lg:mb-0 flex justify-center w-full lg:w-auto lg:flex-1"
          >
            <FloralRomantico />
          </motion.div>

          {/* Texto sempre centralizado (mesmo em desktop) */}
          <div className="flex flex-col lg:flex-1 text-foreground/80 items-center mt-12 text-center">
            {/* Textos principais */}
            <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose mb-6 max-w-prose">
              Com alegria no coração e a certeza
              <br />
              de que estamos vivendo os planos de Deus,
              <br />
              decidimos unir nossas vidas em uma só caminhada.
            </motion.p>

            <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose mb-6 max-w-prose">
              Entre sonhos compartilhados, aprendizados
              <br />
              e momentos vividos, edificamos um amor
              <br />
              firmado no respeito e na parceria.
            </motion.p>

            <motion.p variants={fade} className="font-serif text-lg md:text-xl leading-loose mb-8 lg:mb-10 max-w-prose">
              Cremos que o amor é o alicerce de tudo,
              <br />
              é ele que nos fortalece, nos ensina
              <br />
              e nos aproxima a cada dia.
            </motion.p>

            {/* Versículo */}
            <motion.p
              variants={fade}
              className="font-serif text-xl leading-relaxed italic text-gray-700 mb-3 max-w-prose"
            >
              “Acima de tudo, porém, revistam-se do amor,
              <br />
              que é o elo perfeito.”
            </motion.p>

            <motion.p variants={fade} className="text-base md:text-lg text-secondary mb-8 lg:mb-0">
              Colossenses 3:14
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}