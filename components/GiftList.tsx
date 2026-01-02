"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GiftConfirmModal } from "./GiftConfirmModal";

type Gift = {
  id: number;
  name: string;
  available: boolean;
  reservedBy?: string;
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function GiftList() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "amor2025";

  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: "Jogo de pratos", available: true },
    { id: 2, name: "Liquidificador", available: false, reservedBy: "Maria" },
    { id: 3, name: "Conjunto de copos", available: true },
  ]);

  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  function handleSelectGift(id: number) {
    setSelectedGiftId(id);
    setModalOpen(true);
  }

  function handleConfirm(data: { name: string; whatsapp: string }) {
    setGifts((prev) =>
      prev.map((gift) =>
        gift.id === selectedGiftId
          ? {
              ...gift,
              available: false,
              reservedBy: data.name,
            }
          : gift
      )
    );

    setModalOpen(false);
    setToast(true);

    setTimeout(() => setToast(false), 3000);
  }

  const currentGift = gifts.find((g) => g.id === selectedGiftId);

  return (
    <>
      <section
        id="presentes"
        className="py-32 px-6 bg-background text-foreground"
      >
        <motion.div
          className="mx-auto max-w-5xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={item} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              Lista de presentes
            </p>

            <div className="mx-auto my-8 h-px w-16 bg-border opacity-60" />

            <p className="font-serif text-secondary max-w-xl mx-auto">
              Cada presente pode ser escolhido apenas uma vez.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={container}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {gifts.map((gift) => (
              <motion.div
                key={gift.id}
                variants={item}
                className={`
                  rounded-2xl border p-6 transition
                  ${
                    gift.available
                      ? "bg-background hover:shadow-lg"
                      : "bg-soft opacity-60"
                  }
                `}
              >
                <h3 className="font-serif text-lg mb-4">
                  {gift.name}
                </h3>

                {gift.available ? (
  <button
    onClick={() => handleSelectGift(gift.id)}
    className="
      w-full rounded-full px-4 py-2
      text-xs uppercase tracking-widest
      border border-accent
      text-accent
      transition
      hover:bg-accent hover:text-background
    "
  >
    Escolher presente
  </button>
) : (
  <button
    disabled
    className="
      w-full rounded-full px-4 py-2
      text-xs uppercase tracking-widest
      border border-border
      text-secondary
      cursor-default
    "
  >
    {isAdmin
      ? `Reservado por ${gift.reservedBy}`
      : "Já escolhido"}
  </button>
)}

              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Modal */}
      <GiftConfirmModal
        open={modalOpen}
        giftName={currentGift?.name ?? null}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="
              fixed bottom-6 left-1/2 -translate-x-1/2
              bg-black text-white
              px-6 py-3 rounded-full
              text-xs tracking-wide
              shadow-lg
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Presente reservado com carinho 💛
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
