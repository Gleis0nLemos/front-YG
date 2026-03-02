// HeroGallery.tsx
"use client";

import { useEffect, useState, useRef } from "react";
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
  const [showControls, setShowControls] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const CONTROLS_VISIBLE_TIME = 4000; // 4 segundos

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

  const showControlsTemporarily = () => {
    setShowControls(true);
    setPaused(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setPaused(false);
    }, CONTROLS_VISIBLE_TIME);
  };

  const handleInteraction = () => {
    showControlsTemporarily();
  };

  const handleLeave = () => {
    // Não limpamos o timeout aqui → deixamos os 4s rodarem normalmente
    // Só pausamos o auto-avanço se quiser, mas aqui já está sendo controlado no timeout
  };

  const getPosition = (i: number) => {
    const diff = (i - index + photos.length) % photos.length;
    if (isMobile) return diff === 0 ? "center" : "hidden";
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === photos.length - 1) return "left";
    return "hidden";
  };

  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full 
                 aspect-[4/5.2] sm:aspect-[3/4.1] lg:aspect-[3/4] 
                 max-h-[680px] group"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleLeave}
      onTouchStart={handleInteraction}
      
      onTouchEnd={() => {
        
      }}
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
              filter:
                pos === "center"
                  ? "brightness(1) saturate(1)"
                  : "brightness(0.92) saturate(0.95)",
              zIndex: pos === "center" ? 20 : 10,
            }}
            transition={{ duration: 1, ease: [0.34, 0.69, 0.1, 0.99] }}
          >
            <div
              className="
                relative w-full h-full 
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

      {/* arrows */}
      <button
        onClick={() => {
          setIndex((prev) => (prev - 1 + photos.length) % photos.length);
          showControlsTemporarily(); // ← reinicia os 4s
        }}
        className={`
          absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 p-1 lg:p-1.5
          bg-black/40 hover:bg-black/55 text-white rounded-full
          transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110
          ${showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={() => {
          setIndex((prev) => (prev + 1) % photos.length);
          showControlsTemporarily(); // ← reinicia os 4s
        }}
        className={`
          absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 p-1 lg:p-1.5
          bg-black/40 hover:bg-black/55 text-white rounded-full
          transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110
          ${showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots –  */}
      <div
        className={`
          absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:gap-2 lg:gap-2.5 z-30
          transition-all duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              showControlsTemporarily();
            }}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-400 ${
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