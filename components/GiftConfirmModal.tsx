"use client";

import { motion, AnimatePresence } from "framer-motion";

type GiftConfirmModalProps = {
  open: boolean;
  giftName: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function GiftConfirmModal({
  open,
  giftName,
  onClose,
  onConfirm,
}: GiftConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="
              fixed inset-0 z-50 flex items-center justify-center px-6
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-md rounded-2xl bg-background p-8 text-center shadow-xl">
              <p className="font-serif text-xl mb-4">
                Confirmar presente
              </p>

              <p className="text-secondary mb-8">
                Deseja escolher o presente
                <br />
                <span className="font-medium text-foreground">
                  {giftName}
                </span>
                ?
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="
                    rounded-full px-5 py-2
                    text-xs uppercase tracking-widest
                    border border-border text-secondary
                    hover:bg-soft transition
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={onConfirm}
                  className="
                    rounded-full px-5 py-2
                    text-xs uppercase tracking-widest
                    bg-accent text-background
                    hover:opacity-90 transition
                  "
                >
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
