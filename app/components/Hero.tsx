"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { HeroGallery } from "./HeroGallery";
import { Great_Vibes } from "next/font/google";

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
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
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
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground mt-40 md:pt-0">
      
      <div className="absolute inset-0 bg-gradient-to-b from-background to-soft " />

      {/* 🔥 Layout responsivo */}
<div className="
  relative z-10
  grid min-h-screen
  lg:grid-cols-[minmax(420px,520px)_1fr]
  xl:grid-cols-[minmax(550px,580px)_1fr]
  md:grid-cols-1
">

        {/* COLUNA TEXTO */}
        <div className="
  flex items-center justify-center
  lg:pr-16
  lg:justify-end
">
          <motion.div
            className="max-w-3xl text-center md:mt-[-40px] lg:mt-0"
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
              className="mt-2 text-4xl md:text-6xl font-serif"
            >
              Casamento
            </motion.h1>

<motion.p
  variants={item}
  className={`
    ${greatVibes.className}
    mt-6
    text-4xl md:text-5xl
    leading-none
    text-neutral-700
  `}
>
  Gleison <span className="mx-4">&</span> Yasmim
</motion.p>

            <motion.div
  variants={item}
  className="flex items-center justify-center my-10"
>
  <div className="h-px w-28 md:w-36 bg-border" />

  <span className="mx-4 text-[18px] text-[#6B7D5C]">
    ♥
  </span>

  <div className="h-px w-28 md:w-36 bg-border" />
</motion.div>

            <motion.div variants={item} className="space-y-1 text-secondary">
              <p>25 de Abril • 16h</p>
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
                hover:text-soft
                hover:bg-accent
                transition
                hover:shadow-[0_8px_30px_-10px_var(--accent)]
              "
            >
              Ver lista de presentes
            </motion.a>
          </motion.div>
        </div>

        {/* COLUNA FOTO (somente desktop) */}
        {/* COLUNA FOTO (somente desktop) */}
<div className="
  flex items-center justify-center
  lg:justify-center
  lg:pl-10 xl:pl-16
  lg:order-2
">
  <div className="w-full max-w-[520px] xl:max-w-[580px]">

  <HeroGallery />
  </div>
</div>

      </div>
    </section>
  );
}
