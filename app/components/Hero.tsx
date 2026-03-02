// Hero.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { HeroGallery } from "./HeroGallery";
import { Great_Vibes } from "next/font/google";
import { MapPin, Gift, CheckCircle2, DollarSign } from "lucide-react";

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
            pb-12 xl:pb-0
            min-h-[80vh] lg:min-h-screen
            -mx-5 sm:-mx-6 lg:mx-0
            shadow-2xl lg:shadow-none
            overflow-hidden lg:overflow-visible
          "
        >
          {/* Text */}
          <div className="flex justify-center order-2 lg:order-1 px-5 sm:px-6 lg:px-0">
            <motion.div
              className="w-full max-w-xl text-center"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={item}
                className="text-xs text-secondary font-medium mt-16 lg:mt-0 tracking-wider"
              >
                &quot;O AMOR SÓ É LINDO QUANDO ENCONTRAMOS<br/>
                ALGUÉM QUE NOS TRANSFORME NO MELHOR<br/>
                QUE PODEMOS SER.&quot;
              </motion.p>

              <motion.p
                variants={item}
                className="text-xs text-secondary italic mb-6"
              >
                (Mário Quintana)
              </motion.p>


              <motion.p
                variants={item}
                className={`${greatVibes.className} text-5xl sm:text-7xl text-foreground leading-tight mb-6`}
              >
                Yasmim <span className="mx-1">e</span> Gleison
              </motion.p>

              <motion.p
                variants={item}
                className="text-base font-sans font-semibold text-secondary mb-0"
              >
                Convidam para a cerimônia de seu
              </motion.p>

              <motion.h1
                variants={item}
                className="text-base font-sans font-semibold text-secondary mb-8"
              >
                casamento a ser realizada em
              </motion.h1>

              <motion.p
                variants={item}
                className="text-2xl text-foreground font-medium tracking-wide font-serif"
              >
                25 de Abril de 2026
              </motion.p>

              <motion.p
                variants={item}
                className="text-xl text-foreground font-medium tracking-wide font-serif mb-4"
              >
                Sábado, às 16:00
              </motion.p>

              <motion.div variants={item} className="flex justify-center mb-10">
                <Countdown />
              </motion.div>

              {/* action buttons */}
              <motion.div
                variants={item}
                className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto"
              >
                {[
                  { icon: MapPin, label: "Localização", href: "#localizacao" },
                  { icon: CheckCircle2, label: "Confirmar presença", href: "#confirmacao" },
                  { icon: DollarSign, label: "PIX", href: "#pix" },
                  { icon: Gift, label: "Lista de presentes", href: "#presentes" },

                ].map((btn, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 sm:gap-2 pb-2">
                    <a
                      href={btn.href}
                      className="
                        group flex items-center justify-center
                        rounded-full border-2 border-accent/60
                        h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
                        text-accent hover:text-white
                        hover:bg-accent hover:border-accent
                        transition-all duration-300
                        shadow-sm hover:shadow-xl hover:scale-105
                      "
                    >
                      <btn.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </a>
                    <span
                      className="
                        text-xs uppercase md:tracking-wider
                        text-secondary/90 font-medium text-center
                        leading-tight
                      "
                    >
                      {btn.label}
                    </span>

                    
                  </div>
                ))}
              </motion.div>
              <span className="text-xs text-gray-500">*interaja com os botãos acima para navegar</span>
            </motion.div>
          </div>

          {/* Gallery */}
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