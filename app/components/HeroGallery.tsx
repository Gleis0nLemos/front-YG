// HeroGallery.tsx (versão com tamanho levemente reduzido)
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import photo1 from "@/app/assets/yg1.jpeg";
import photo2 from "@/app/assets/yg2.png";
import photo3 from "@/app/assets/yg3.png";
import photo4 from "@/app/assets/yg4.png";

const photos = [photo1, photo2, photo3, photo4];

export function HeroGallery() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLg(width >= 1024 && width < 1280);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [paused]);

  const getPosition = (i: number) => {
    const diff = (i - index + photos.length) % photos.length;
    if (isMobile) return diff === 0 ? "center" : "hidden";
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === photos.length - 1) return "left";
    return "hidden";
  };

  return (
    <div
      className="relative w-full 
                 aspect-[4/5.2] sm:aspect-[3/4.1] lg:aspect-[3/4] 
                 max-h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 8000)}
    >
      {photos.map((photo, i) => {
        const pos = getPosition(i);

        if (pos === "hidden") return null;

        const centerScale = isLg ? 0.98 : 1;
        const sideScale = isMobile ? 0.94 : isLg ? 0.75 : 0.84;
        const sideX = isLg ? "-20%" : "-30%";
        const sideXRight = isLg ? "20%" : "30%";

        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              scale: pos === "center" ? centerScale : sideScale,
              x: pos === "center" ? "0%" : pos === "left" ? sideX : sideXRight,
              opacity: pos === "center" ? 1 : 0.92,
              filter: pos === "center" ? "brightness(1) saturate(1)" : "brightness(0.92) saturate(0.95)",
              zIndex: pos === "center" ? 20 : 10,
            }}
            transition={{ duration: 1, ease: [0.34, 0.69, 0.1, 0.99] }}
          >
            <div
              className="
                relative 
                w-full 
                h-full 
                rounded-none lg:rounded-3xl
                overflow-hidden 
                shadow-none lg:shadow-2xl shadow-black/25
                ring-0 lg:ring-1 ring-black/5
              "
            >
              <Image
                src={photo}
                alt={`Foto ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0 || pos === "center"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
              />
            </div>
          </motion.div>
        );
      })}

      {/* Setas de navegação – ajustadas para o novo tamanho */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + photos.length) % photos.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 
                   bg-black/40 hover:bg-black/55 text-white rounded-full 
                   transition-all backdrop-blur-md shadow-lg hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % photos.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 
                   bg-black/40 hover:bg-black/55 text-white rounded-full 
                   transition-all backdrop-blur-md shadow-lg hover:scale-110"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots – um pouco mais discretos */}
      <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-400 ${
              i === index
                ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                : "bg-white/65 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}