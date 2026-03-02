"use client";

import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onAdd: (data: {
    name: string;
    description: string;
    productUrl: string;
    imageUrl: string;
  }) => void;
};

export function AddGiftButton({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  function handleSubmit() {
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      description: description.trim(),
      productUrl: productUrl.trim(),
      imageUrl: imageUrl.trim(),
    });

    // clean form
    setName("");
    setDescription("");
    setProductUrl("");
    setImageUrl("");

    setOpen(false);
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="
          mx-auto mb-12
          flex items-center justify-center
          rounded-full border border-accent
          px-6 py-2
          text-xs uppercase tracking-widest
          text-accent
          transition
          hover:bg-accent hover:text-background
        "
      >
        + Adicionar presente
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl space-y-4"
            >
              <h3 className="text-center font-serif text-lg">
                Novo presente
              </h3>

              <input
                value={name}
                onChange={handleInputChange(setName)}
                placeholder="Nome do presente *"
                className="
                  w-full rounded-lg border px-4 py-2
                  text-sm outline-none
                  focus:ring-1 focus:ring-accent
                "
              />

              <input
                value={description}
                onChange={handleInputChange(setDescription)}
                placeholder="Descrição (opcional)"
                className="
                  w-full rounded-lg border px-4 py-2
                  text-sm outline-none
                  focus:ring-1 focus:ring-accent
                "
              />

              <input
                value={productUrl}
                onChange={handleInputChange(setProductUrl)}
                placeholder="Link do produto (ex: Magazine Luiza)"
                className="
                  w-full rounded-lg border px-4 py-2
                  text-sm outline-none
                  focus:ring-1 focus:ring-accent
                "
              />

              <input
                value={imageUrl}
                onChange={handleInputChange(setImageUrl)}
                placeholder="URL da foto do produto (opcional)"
                className="
                  w-full rounded-lg border px-4 py-2
                  text-sm outline-none
                  focus:ring-1 focus:ring-accent
                "
              />

              {imageUrl && (
                <div className="pt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="rounded-lg w-full h-32 object-cover border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-full rounded-full border px-4 py-2
                    text-xs uppercase tracking-widest
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                    w-full rounded-full bg-accent px-4 py-2
                    text-xs uppercase tracking-widest text-background
                  "
                >
                  Adicionar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}