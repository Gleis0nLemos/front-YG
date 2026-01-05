"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GiftConfirmModalProps = {
  open: boolean;
  giftName: string | null;
  onClose: () => void;
  onConfirm: (data: { name: string; whatsapp: string }) => void;
};

export function GiftConfirmModal({
  open,
  giftName,
  onClose,
  onConfirm,
}: GiftConfirmModalProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function handleConfirm() {
    if (!name.trim() || !whatsapp.trim()) return;
    onConfirm({ name, whatsapp });
    setName("");
    setWhatsapp("");
  }

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
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-md rounded-2xl bg-background p-8 text-center shadow-xl">
              <p className="font-serif text-xl mb-2">
                Confirmar presente
              </p>

              <p className="text-secondary mb-6">
                Você escolheu:
                <br />
                <span className="font-medium text-foreground">
                  {giftName}
                </span>
              </p>

              {/* Inputs */}
              <div className="space-y-4 text-left">
                <div>
                  <label className="text-xs uppercase tracking-widest text-secondary">
                    Seu nome
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      mt-1 w-full rounded-md border border-border
                      bg-background px-3 py-2 text-sm
                      focus:outline-none focus:ring-1 focus:ring-accent
                    "
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-secondary">
                    WhatsApp
                  </label>
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="
                      mt-1 w-full rounded-md border border-border
                      bg-background px-3 py-2 text-sm
                      focus:outline-none focus:ring-1 focus:ring-accent
                    "
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-3 justify-center">
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
                  onClick={handleConfirm}
                  disabled={!name || !whatsapp}
                  className="
                    rounded-full px-5 py-2
                    text-xs uppercase tracking-widest
                    bg-accent text-background
                    hover:opacity-90 transition
                    disabled:opacity-40
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
