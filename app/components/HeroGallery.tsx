"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import photo1 from "@/app/assets/yg1.jpeg";
import photo2 from "@/app/assets/yg2.png";
import photo3 from "@/app/assets/yg3.png";
import photo4 from "@/app/assets/yg4.png";

const photos = [photo1, photo2, photo3, photo4];

export function HeroGallery() {
  const [index, setIndex] = useState(0);

  // 🔥 troca automática
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 25000); // tempo (5s)

    return () => clearInterval(interval);
  }, []);

  const getPosition = (i: number) => {
    const diff = (i - index + photos.length) % photos.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === photos.length - 1) return "left";

    return "hidden";
  };

  return (
<div className="relative flex items-center justify-center w-full h-[clamp(520px,75vh,880px)]">
  {photos.map((photo, i) => {
        const position = getPosition(i);

        return (
          <motion.div
            key={i}
            className="absolute"
            animate={{
scale:
  position === "center"
    ? 1
    : position === "hidden"
    ? 0.4
    : 0.7,

x:
  position === "center"
    ? 0
    : position === "left"
    ? "-65%"
    : position === "right"
    ? "65%"
    : 0,

  opacity: position === "hidden" ? 0 : 1,
  zIndex: position === "center" ? 3 : 2,
}}

            transition={{ duration: 0.6 }}
          >
<Image
  src={photo}
  alt=""
className="
  rounded-3xl shadow-2xl object-cover
  w-[clamp(260px,32vw,620px)]
  h-auto
"
  priority
/>
          </motion.div>
        );
      })}
    </div>
  );
}
