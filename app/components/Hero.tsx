// Hero.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { HeroGallery } from "./HeroGallery";
import { Great_Vibes } from "next/font/google";
import { MapPin, Gift, CheckCircle2 } from "lucide-react";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

const Countdown = dynamic(
  () => import("./Countdown").then((mod) => mod.Countdown),
  { ssr: false }
);

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-soft pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-350 px-5 sm:px-6 lg:px-8 min-h-screen grid content-center">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 
            gap-0 lg:gap-10 xl:gap-16 
            items-center 
            min-h-[80vh] lg:min-h-screen
            py-12 lg:py-0
            -mx-5 sm:-mx-6 lg:mx-0
            bg-white lg:bg-transparent
            rounded-3xl lg:rounded-none
            shadow-2xl lg:shadow-none
            overflow-hidden lg:overflow-visible
          "
        >
          {/* Coluna de texto */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1 px-5 sm:px-6 lg:px-0">
            <motion.div
              className="w-full max-w-xl text-center lg:text-left"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={item}
                className="text-sm uppercase tracking-[0.35em] text-secondary font-medium"
              >
                Você está convidado(a)
              </motion.p>

              <motion.h1
                variants={item}
                className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-serif font-light"
              >
                Casamento
              </motion.h1>

              <motion.p
                variants={item}
                className={`${greatVibes.className} mt-5 text-5xl sm:text-6xl text-neutral-700 leading-tight`}
              >
                Gleison <span className="mx-5">&</span> Yasmim
              </motion.p>

              <motion.div variants={item} className="flex items-center justify-center lg:justify-start my-10">
                <div className="h-px w-24 sm:w-32 bg-border flex-1 max-w-[140px]" />
                <span className="mx-5 text-2xl text-[#6B7D5C]">♥</span>
                <div className="h-px w-24 sm:w-32 bg-border flex-1 max-w-[140px]" />
              </motion.div>

              <motion.div variants={item} className="text-secondary text-lg sm:text-xl mb-8">
                <p>25 de Abril • 16h</p>
              </motion.div>

              <motion.div variants={item} className="mb-10">
                <Countdown />
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                variants={item}
                className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto lg:mx-0"
              >
                {[
                  { icon: MapPin, label: "Localização", href: "#localizacao" },
                  { icon: Gift, label: "Lista de presentes", href: "#presentes" },
                  { icon: CheckCircle2, label: "Confirmar presença", href: "#confirmacao" },
                ].map((btn, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 sm:gap-3">
                    <a
                      href={btn.href}
                      className="
                        group flex items-center justify-center
                        rounded-full border-2 border-accent/60
                        h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20
                        text-accent hover:text-white
                        hover:bg-accent hover:border-accent
                        transition-all duration-300
                        shadow-sm hover:shadow-xl hover:scale-105
                      "
                    >
                      <btn.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                    </a>
                    <span
                      className="
                        text-xs sm:text-sm uppercase tracking-wider
                        text-secondary/90 font-medium text-center
                        leading-tight
                      "
                    >
                      {btn.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Coluna da galeria */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
            <div className="w-full lg:max-w-[520px] xl:max-w-[580px]">
              <HeroGallery />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}