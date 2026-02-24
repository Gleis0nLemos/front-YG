"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GiftConfirmModal } from "./GiftConfirmModal";
import { Eye } from "lucide-react";
import { AddGiftButton } from "./AddGiftButton";
import { useAdminGate } from "../utils/useAdminGate";
import Image from "next/image";
import ColorPalette from "./ColorPalette";
import AnimatedDivider from "./AnimatedDivider";

type Gift = {
  id: number;
  name: string;
  link?: string;
  image?: string;
  available: boolean;
  reservedBy?: string;
};

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariants: Variants = {
  available: { opacity: 1, scale: 1, y: 0 },
  reserved: { opacity: 0.6, scale: 0.98, y: 4, transition: { duration: 0.3 } },
};

export function GiftList() {
  const { isAdmin } = useAdminGate();
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: "Jogo de pratos", available: true },
    { id: 2, name: "Liquidificador", available: false, reservedBy: "Maria" },
    { id: 3, name: "Conjunto de copos", available: true },
    { id: 4, name: "Cadeira", available: true },
    { id: 5, name: "Cadeira", available: true },
    { id: 6, name: "Cadeira", available: true },
    { id: 7, name: "Cadeira", available: true },
  ]);

  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSelectGift = (id: number) => {
    setSelectedGiftId(id);
    setModalOpen(true);
  };

  const handleConfirm = (data: { name: string; whatsapp: string }) => {
    setGifts((prev) =>
      prev.map((g) => (g.id === selectedGiftId ? { ...g, available: false, reservedBy: data.name } : g))
    );
    setModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleAddGift = (data: { name: string; link: string; image: string }) => {
    setGifts((prev) => [
      ...prev,
      { id: Date.now(), name: data.name, link: data.link || undefined, image: data.image || undefined, available: true },
    ]);
  };

  const currentGift = gifts.find((g) => g.id === selectedGiftId);

  return (
    <>
      <section id="presentes" className="py-20 lg:py-2 px-2 md:px-8 lg:px-4 xl:px-2 bg-background text-foreground">
        <motion.div className="mx-auto max-w-7xl" variants={container} initial="hidden" animate="visible">
          {/* Header compacto */}
          <motion.div variants={item} className="text-center mb-2">
            <h2 className="text-xs uppercase tracking-[0.4em] pb-4 text-secondary/80">
              LISTA DE PRESENTES
            </h2>
          <p className="text-base text-foreground/90 font-light mb-3 text-center leading-relaxed tracking-wide">
            Estamos muito felizes em celebrar esse momento com vocês!<br />
            Criamos essa lista com itens que irão nos ajudar a iniciar nossa vida juntos.
          </p>
            <AnimatedDivider />
          </motion.div>

          <ColorPalette />

          <motion.div>
            <p className="text-sm pb-4 px-2 text-center text-secondary/80 font-light">
              *Cada presente pode ser escolhido apenas uma vez!
            </p>
          </motion.div>
          {isAdmin && (
            <motion.div variants={item} className="flex justify-center mb-8">
              <AddGiftButton onAdd={handleAddGift} />
            </motion.div>
          )}

          <motion.div variants={container} className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {gifts.map((gift) => (
              <motion.div key={gift.id} variants={item}>
                <motion.div
                  variants={cardVariants}
                  animate={gift.available ? "available" : "reserved"}
                  className={`relative rounded-2xl border p-4 transition-shadow ${
                    gift.available ? "bg-background hover:shadow-lg" : "bg-soft"
                  }`}
                >
                  {isAdmin && (
                    <div className="absolute top-4 right-4 group">
                      <Eye size={16} className="text-secondary opacity-60 group-hover:opacity-100 transition" />
                      <span className="absolute right-0 mt-2 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] uppercase text-white opacity-0 group-hover:opacity-100 transition">
                        visão admin
                      </span>
                    </div>
                  )}

                  <h3 className="font-serif text-lg mb-3 text-center">{gift.name}</h3>

                  {gift.image && (
                    <div className="mb-4 aspect-square bg-white rounded-xl border border-border flex items-center justify-center overflow-hidden p-3">
                      <Image
                        src={gift.image}
                        alt={gift.name}
                        width={280}
                        height={280}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                  )}

                  {gift.link && (
                    <a href={gift.link} target="_blank" className="text-xs text-accent underline block mb-4 text-center">
                      Ver modelo
                    </a>
                  )}

                  {gift.available ? (
                    <button
                      onClick={() => handleSelectGift(gift.id)}
                      className="w-full rounded-full px-4 py-2 text-xs uppercase tracking-widest border border-accent text-accent hover:bg-accent hover:text-background transition"
                    >
                      Escolher
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full rounded-full px-4 py-2 text-xs uppercase tracking-widest border border-border text-secondary cursor-default"
                    >
                      {isAdmin ? `Por ${gift.reservedBy}` : "Escolhido"}
                    </button>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GiftConfirmModal
        open={modalOpen}
        giftName={currentGift?.name ?? null}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-xs shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Reservado com carinho ♥
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}