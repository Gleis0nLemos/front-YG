"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GiftConfirmModal } from "./GiftConfirmModal";
import { Pencil } from "lucide-react";
import { AddGiftButton } from "./AddGiftButton";
import { useAdminGate } from "../utils/useAdminGate";
import ColorPalette from "./ColorPalette";
import AnimatedDivider from "./AnimatedDivider";
import { useGifts, type Gift } from "@/app/context/GiftContext";
import { memo } from "react";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const giftItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

function isValidUrl(string: string | undefined): boolean {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// ✅ Componente memoizado para itens individuais (evita re-render se props não mudam)
const GiftItem = memo(function GiftItem({
  gift,
  isAdmin,
  onSelect,
  openEdit,
  failedImageIds,
  setFailedImageIds,
}: {
  gift: Gift;
  isAdmin: boolean;
  onSelect: (id: string) => void;
  openEdit: (id: string) => void;
  failedImageIds: Set<string>;
  setFailedImageIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  return (
    <motion.div variants={giftItemVariants} layout> {/* ← layout para transições suaves */}
      <div
        className={`relative rounded-2xl border p-3 transition-shadow ${
          !gift.reserved ? "bg-background hover:shadow-lg" : "bg-soft"
        }`}
      >
        {isAdmin && (
          <button
            onClick={() => openEdit(gift._id)}
            className="absolute top-3 right-3 group p-1 rounded-full hover:bg-accent/10 transition"
          >
            <Pencil size={16} className="text-secondary opacity-70 group-hover:opacity-100 transition" />
            <span className="absolute right-0 mt-2 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] uppercase text-white opacity-0 group-hover:opacity-100 transition">
              Editar / Deletar
            </span>
          </button>
        )}

        <div className={`mb-2 flex items-center justify-between gap-2 ${isAdmin ? 'pr-8' : ''}`}>
          <span className="font-serif text-base line-clamp-2">{gift.name}</span>
          {gift.productUrl && (
            <a
              href={gift.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent underline"
            >
              Ver 
            </a>
          )}
        </div>

        {gift.imageUrl && isValidUrl(gift.imageUrl) && !failedImageIds.has(gift._id) && (
          <div className="mb-2 aspect-square bg-white rounded-xl border border-border flex items-center justify-center overflow-hidden p-2">
            <img
              src={gift.imageUrl}
              alt={gift.name}
              className="w-full h-full object-contain"
              loading="lazy"
              onError={() => {
                setFailedImageIds((prev) => new Set([...prev, gift._id]));
              }}
            />
          </div>
        )}

        {!gift.reserved ? (
          <button
            onClick={() => onSelect(gift._id)}
            className="w-full rounded-full px-3 py-1.5 text-xs uppercase tracking-widest border border-accent text-accent hover:bg-accent hover:text-background transition"
          >
            Escolher
          </button>
        ) : (
          <button
            disabled
            className="w-full rounded-full px-3 py-1.5 text-xs uppercase tracking-widest border border-border text-secondary cursor-default"
          >
            {isAdmin
              ? `Por ${gift.reservedByName || "alguém"} • ${gift.reservedByPhone || ""}`
              : "Escolhido"}
          </button>
        )}
      </div>
    </motion.div>
  );
});

export function GiftList() {
  const { isAdmin } = useAdminGate();
  const { gifts, loading, error, addGift, reserveGift, updateGift, deleteGift, currentPage, setCurrentPage, totalPages, paginatedGifts } = useGifts();

  // Reserva normal
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  // Edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null); // ✅ tipagem correta

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editProductUrl, setEditProductUrl] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editReserved, setEditReserved] = useState(false);
  const [editReservedByName, setEditReservedByName] = useState("");
  const [editReservedByPhone, setEditReservedByPhone] = useState("");

  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  // ✅ Agora populamos os campos DIRETO no clique (sem useEffect)
  const openEdit = (id: string) => {
    const gift = gifts.find((g) => g._id === id);
    if (!gift) return;

    setEditingGift(gift);
    setEditName(gift.name || "");
    setEditDescription(gift.description || "");
    setEditProductUrl(gift.productUrl || "");
    setEditImageUrl(gift.imageUrl || "");
    setEditReserved(gift.reserved || false);
    setEditReservedByName(gift.reservedByName || "");
    setEditReservedByPhone(gift.reservedByPhone || "");
    setEditModalOpen(true);
  };

  const handleConfirm = async (data: { name: string; whatsapp: string }) => {
    if (!selectedGiftId) return;
    try {
      await reserveGift(selectedGiftId, data.name, data.whatsapp);
      setModalOpen(false);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch {
      alert("Erro ao reservar. Tente novamente.");
    }
  };

  const handleAddGift = async (data: {
    name: string;
    description: string;
    productUrl: string;
    imageUrl: string;
  }) => {
    try {
      await addGift(data);
    } catch {
      alert("Não foi possível adicionar o presente.");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingGift) return;
    try {
      await updateGift(editingGift._id, {
        name: editName.trim(),
        description: editDescription.trim() || undefined,
        productUrl: editProductUrl.trim() || undefined,
        imageUrl: editImageUrl.trim() || undefined,
        reserved: editReserved,
        reservedByName: editReservedByName.trim() || undefined,
        reservedByPhone: editReservedByPhone.trim() || undefined,
      });
      setEditModalOpen(false);
    } catch {
      alert("Erro ao salvar alterações.");
    }
  };

  const handleDelete = async () => {
    if (!editingGift) return;
    if (!confirm(`Tem certeza que deseja deletar "${editingGift.name}"?\n\nEssa ação é irreversível!`)) return;

    try {
      await deleteGift(editingGift._id);
      setEditModalOpen(false);
    } catch {
      alert("Erro ao deletar o presente.");
    }
  };

  const currentGift = gifts.find((g) => g._id === selectedGiftId);

  const handleSelect = (id: string) => {
    setSelectedGiftId(id);
    setModalOpen(true);
  };

  return (
    <>
      <section id="presentes" className="py-20 lg:pb-2 lg:pt-12 px-2 md:px-8 lg:px-4 xl:px-2 bg-background text-foreground">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div variants={container} initial="hidden" animate="visible" className="text-center mb-2">
            <h2 className="text-xs uppercase tracking-[0.4em] pb-4 text-secondary/80">LISTA DE PRESENTES</h2>
            <p className="text-base text-foreground/90 font-light mb-3 text-center leading-relaxed tracking-wide">
              Estamos muito felizes em celebrar esse momento com vocês!<br />
              Criamos essa lista com itens que irão nos ajudar a iniciar nossa vida juntos.
            </p>
            <AnimatedDivider />
          </motion.div>

          <ColorPalette />

          <div>
            <p className="text-sm pb-2 px-2 text-center text-secondary/80 font-light">
              *Cada presente pode ser escolhido apenas uma vez!
            </p>
            <p className="text-sm pb-4 px-2 text-center text-secondary/80 font-light">
              *Adicionamos fotos/links para modelos inspirativos de presentes.
            </p>
          </div>

          {loading && <p className="text-center py-8 text-secondary">Carregando presentes...</p>}
          {error && <p className="text-center py-8 text-red-500">{error}</p>}

          {isAdmin && (
            <div className="flex justify-center mb-8">
              <AddGiftButton onAdd={handleAddGift} />
            </div>
          )}

          {!loading && (
            <motion.div
              className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              variants={container}
              initial="hidden"
              animate="visible"
              key={currentPage}
            >
              <AnimatePresence initial={false}>
                {paginatedGifts.map((gift) => (
                  <GiftItem
                    key={gift._id}
                    gift={gift}
                    isAdmin={isAdmin}
                    onSelect={handleSelect}
                    openEdit={openEdit}
                    failedImageIds={failedImageIds}
                    setFailedImageIds={setFailedImageIds}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentPage === index + 1
                      ? "bg-accent text-white"
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <GiftConfirmModal
        open={modalOpen}
        giftName={currentGift?.name ?? null}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />

      {/* edit modal */}
      <AnimatePresence>
        {editModalOpen && editingGift && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl"
            >
              <h3 className="font-serif text-xl text-center mb-6">Editar Presente</h3>

              <div className="space-y-4">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nome do presente *" className="w-full rounded-lg border px-4 py-2 text-sm" />
                <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Descrição (opcional)" className="w-full rounded-lg border px-4 py-2 text-sm" />
                <input value={editProductUrl} onChange={(e) => setEditProductUrl(e.target.value)} placeholder="Link do produto" className="w-full rounded-lg border px-4 py-2 text-sm" />
                <input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} placeholder="URL da foto" className="w-full rounded-lg border px-4 py-2 text-sm" />

                {editImageUrl && <img src={editImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg border" />}

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="reserved" checked={editReserved} onChange={(e) => setEditReserved(e.target.checked)} />
                  <label htmlFor="reserved" className="text-sm">Marcar como reservado</label>
                </div>

                {editReserved && (
                  <>
                    <input value={editReservedByName} onChange={(e) => setEditReservedByName(e.target.value)} placeholder="Nome de quem reservou" className="w-full rounded-lg border px-4 py-2 text-sm" />
                    <input value={editReservedByPhone} onChange={(e) => setEditReservedByPhone(e.target.value)} placeholder="Telefone (WhatsApp)" className="w-full rounded-lg border px-4 py-2 text-sm" />
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setEditModalOpen(false)} className="flex-1 rounded-full border py-3 text-sm">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 rounded-full bg-red-500 py-3 text-sm text-white hover:bg-red-600 transition">Deletar</button>
                <button onClick={handleSaveEdit} className="flex-1 rounded-full bg-accent py-3 text-sm text-white hover:bg-accent/90 transition">Salvar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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