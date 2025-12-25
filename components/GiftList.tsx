"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { GiftConfirmModal } from "./GiftConfirmModal";

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
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const gifts = [
    { id: 1, name: "Jogo de pratos", available: true },
    { id: 2, name: "Liquidificador", available: false },
    { id: 3, name: "Conjunto de copos", available: true },
  ];

  function handleSelectGift(name: string) {
    setSelectedGift(name);
    setModalOpen(true);
  }

  function handleConfirm() {
    console.log("Presente confirmado:", selectedGift);
    setModalOpen(false);
  }

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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gifts.map((gift) => (
              <motion.div
                key={gift.id}
                variants={item}
                className={`
                  rounded-2xl border p-6
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

                <button
                  disabled={!gift.available}
                  onClick={() => handleSelectGift(gift.name)}
                  className={`
                    w-full rounded-full px-4 py-2
                    text-xs uppercase tracking-widest
                    transition
                    ${
                      gift.available
                        ? "border border-accent text-accent hover:bg-accent hover:text-background"
                        : "border border-border text-secondary cursor-not-allowed"
                    }
                  `}
                >
                  {gift.available ? "Escolher presente" : "Já escolhido"}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Modal */}
      <GiftConfirmModal
        open={modalOpen}
        giftName={selectedGift}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
