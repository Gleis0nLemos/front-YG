"use client";

import { motion, Variants } from "framer-motion";
import { FloralRomantico } from "@/app/components/FloralRomantico";
import { SubtleDivider } from "./SubtleDivider";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.28 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function MessageAndEvent() {
  return (
    <section className="bg-background text-foreground py-12 md:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-350 px-6 sm:px-8 md:px-6 lg:px-2">
        <motion.div
          className="
            grid grid-cols-1 gap-10 md:gap-12 lg:gap-8 xl:gap-10
            md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-12
            items-start lg:items-center
          "
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Floral – menor em lg, cresce em xl+ */}
          <motion.div
            variants={fade}
            className="
              col-span-1 lg:col-span-1 xl:col-span-4 
              flex justify-center md:justify-start lg:justify-center
              order-2 md:order-1
            "
          >
            <div
              className="
                w-full 
                max-w-[260px] sm:max-w-[300px] md:max-w-[340px] 
                lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-[480px]
              "
            >
              <FloralRomantico />
            </div>
          </motion.div>

          {/* Mensagem */}
          <motion.div
            variants={fade}
            className="
              col-span-1 lg:col-span-1 xl:col-span-4
              flex flex-col items-center text-center
              lg:items-center lg:text-center
              order-1 md:order-2
              mx-auto w-full
            "
          >
            <div className="space-y-3 md:space-y-8 text-base sm:text-lg md:text-xl leading-normal md:leading-relaxed font-serif">
              <p>
                Com alegria no coração e a certeza
                <br className="hidden md:inline" />
                de que estamos vivendo os planos de Deus,
                <br className="hidden md:inline" />
                decidimos unir nossas vidas em uma só caminhada.
              </p>

              <p>
                Entre sonhos compartilhados, aprendizados
                <br className="hidden md:inline" />
                e momentos vividos, edificamos um amor
                <br className="hidden md:inline" />
                firmado no respeito e na parceria.
              </p>

              <p>
                Cremos que o amor é o alicerce de tudo,
                <br className="hidden md:inline" />
                é ele que nos fortalece, nos ensina
                <br className="hidden md:inline" />
                e nos aproxima a cada dia.
              </p>

              <p className="italic text-gray-700 mt-6 lg:mt-8 text-lg md:text-xl leading-relaxed">
                “Acima de tudo, porém, revistam-se do amor,
                <br className="hidden md:inline" />
                que é o elo perfeito.”
              </p>

              <p className="text-sm md:text-base lg:text-lg text-secondary font-medium mt-4">
                Colossenses 3:14
              </p>
            </div>
          </motion.div>

          {/* Detalhes do Evento – em lg ocupa toda a linha (col-span-2), em xl volta para 4/12 */}
          <motion.div
            id="localizacao" 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-4
              text-center
              order-3 md:order-3
              mt-14 md:mt-16 lg:mt-12 xl:mt-0
              md:max-w-2xl lg:max-w-3xl xl:max-w-md 2xl:max-w-2xl
              mx-auto lg:mx-auto xl:mx-0
            "
          >
            <motion.p
              variants={item}
              className="text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-secondary/80 mb-4 md:mb-6"
            >
              DETALHES DO EVENTO
            </motion.p>

            <SubtleDivider />

            <motion.p
              variants={item}
              className="mt-8 md:mt-10 font-serif text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight"
            >
              25 de abril
            </motion.p>

            <motion.p variants={item} className="mt-3 md:mt-4 text-lg md:text-xl lg:text-xl xl:text-2xl text-secondary">
              às 16h
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 md:mt-10 space-y-3 md:space-y-4 text-secondary/90 text-base md:text-lg leading-relaxed"
            >
              <div className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium text-foreground">
                vila clemente
                <div className="text-sm md:text-base text-secondary/70 mt-1">
                  — espaço de eventos —
                </div>
              </div>

              <div className="mt-5 md:mt-6 text-sm md:text-base lg:text-base xl:text-lg">
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
                mt-10 md:mt-12 inline-flex items-center justify-center
                rounded-full border border-accent/60 bg-accent/85
                px-7 py-3 md:px-9 md:py-4 lg:px-8 xl:px-10
                text-xs md:text-sm uppercase tracking-wider font-medium
                text-background transition-all duration-300
                hover:bg-accent hover:border-background/80 hover:text-background
              "
            >
              VER NO MAPA
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}