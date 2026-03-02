"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, RefreshCw } from "lucide-react";
import { useConfirmations, Confirmation } from "@/app/context/ConfirmContext";
import { exportCSV } from "@/app/utils/exportCsv";

function exitAdminMode() {
  localStorage.removeItem("isAdmin");
  const url = new URL(window.location.href);
  url.searchParams.delete("admin");
  window.location.href = url.toString();
}

export function AdminConfirmList() {
  const {
    confirmations,
    isLoading,
    error,
    updateConfirmation,
    removeConfirmation,
    refreshConfirmations,
  } = useConfirmations();

  const going = confirmations.filter((c) => c.attending === true);
  const notGoing = confirmations.filter((c) => c.attending === false);

  const totalAdults = going.reduce((sum, c) => sum + (c.adults ?? 0), 0);
  const totalKids = going.reduce((sum, c) => sum + (c.children ?? 0), 0);

  // Modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingConfirmation, setEditingConfirmation] = useState<Confirmation | null>(null);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAttending, setEditAttending] = useState(true);
  const [editAdults, setEditAdults] = useState(1);
  const [editChildren, setEditChildren] = useState(0);

  const openEdit = (confirmation: Confirmation) => {
    setEditingConfirmation(confirmation);
    setEditName(confirmation.name || "");
    setEditPhone(confirmation.phone || "");
    setEditAttending(confirmation.attending ?? true);
    setEditAdults(confirmation.adults ?? 1);
    setEditChildren(confirmation.children ?? 0);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingConfirmation) return;
    try {
      await updateConfirmation(editingConfirmation.id, {
        name: editName.trim(),
        phone: editPhone.trim(),
        attending: editAttending,
        adults: Number(editAdults),
        children: Number(editChildren),
      });
      setEditModalOpen(false);
    } catch {
      alert("Erro ao salvar alterações.");
    }
  };

  const handleDelete = async () => {
    if (!editingConfirmation) return;
    if (!confirm(`Tem certeza que deseja deletar a confirmação de "${editingConfirmation.name}"?\n\nEssa ação é irreversível!`)) return;

    try {
      await removeConfirmation(editingConfirmation.id);
      setEditModalOpen(false);
    } catch {
      alert("Erro ao deletar a confirmação.");
    }
  };

  const formatPhone = (phone?: string) => (phone || "").replace(/\D/g, "");

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-secondary">Visão admin</h3>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => exportCSV(confirmations)}
              className="rounded-full px-5 py-2 text-xs uppercase tracking-widest border border-accent text-accent hover:bg-accent hover:text-background transition"
            >
              Exportar CSV
            </button>

            <button
              onClick={refreshConfirmations}
              disabled={isLoading}
              className="rounded-full px-5 py-2 text-xs uppercase tracking-widest border border-accent text-accent hover:bg-accent hover:text-background transition disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              Atualizar
            </button>

            <button
              onClick={exitAdminMode}
              className="rounded-full px-5 py-2 text-xs uppercase tracking-widest border border-border text-secondary hover:bg-muted transition"
            >
              Sair do modo admin
            </button>
          </div>
        </div>

        {isLoading && <div className="text-center py-8 text-secondary">Carregando confirmações...</div>}
        {error && (
          <div className="text-center py-6 text-red-600 bg-red-50/50 rounded-xl">
            {error}
            <button onClick={refreshConfirmations} className="ml-3 underline hover:text-red-800">
              Tentar novamente
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Totais */}
            <div className="flex justify-center gap-12 md:gap-16 text-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-secondary mb-1">Adultos</p>
                <p className="text-4xl md:text-5xl font-serif">{totalAdults}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-secondary mb-1">Crianças</p>
                <p className="text-4xl md:text-5xl font-serif">{totalKids}</p>
              </div>
            </div>

            {/* Confirmados */}
            <div>
              <h3 className="mb-6 text-sm uppercase tracking-widest text-secondary">
                Confirmados ({going.length})
              </h3>

              {going.length === 0 ? (
                <p className="text-center text-secondary py-8">Ainda não há confirmações de presença</p>
              ) : (
                <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {going.map((c, index) => (
                    <motion.div
                      key={c.id || `going-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border bg-card p-5 shadow-sm relative"
                    >
                      <button
                        onClick={() => openEdit(c)}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-accent/10 transition"
                      >
                        <Pencil size={18} className="text-secondary opacity-70 hover:opacity-100" />
                      </button>

                      <div className="space-y-1">
                        <p className="font-medium text-lg">{c.name}</p>
                        <p className="text-sm text-secondary">
                          Telefone:{" "}
                          <a
                            href={`https://wa.me/${formatPhone(c.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {c.phone}
                          </a>
                        </p>
                        <p className="text-sm text-secondary">
                          Adultos: {c.adults} • Crianças: {c.children}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Não irão */}
            {notGoing.length > 0 && (
              <div className="opacity-70 pt-8">
                <h3 className="mb-4 text-xs uppercase tracking-widest text-secondary">
                  Não poderão comparecer ({notGoing.length})
                </h3>
                <ul className="space-y-2 text-sm">
                  {notGoing.map((c, index) => (
                    <li
                      key={c.id || `notgoing-${index}`}
                      className="flex items-center justify-between py-1 border-b border-border last:border-none"
                    >
                      <span>
                        ✖ {c.name} —{" "}
                        <a
                          href={`https://wa.me/${formatPhone(c.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {c.phone}
                        </a>
                      </span>
                      <button onClick={() => openEdit(c)} className="text-secondary hover:text-accent transition">
                        <Pencil size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* edit mode */}
      <AnimatePresence>
        {editModalOpen && editingConfirmation && (
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
              <h3 className="font-serif text-xl text-center mb-6">Editar Confirmação</h3>

              <div className="space-y-4">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full rounded-lg border px-4 py-2 text-sm"
                />
                <input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Telefone (WhatsApp)"
                  className="w-full rounded-lg border px-4 py-2 text-sm"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="attending"
                    checked={editAttending}
                    onChange={(e) => setEditAttending(e.target.checked)}
                  />
                  <label htmlFor="attending" className="text-sm cursor-pointer">
                    Vai comparecer
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-secondary mb-1">Adultos</p>
                    <input
                      type="number"
                      min={0}
                      value={editAdults}
                      onChange={(e) => setEditAdults(Number(e.target.value))}
                      className="w-full rounded-lg border px-4 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-secondary mb-1">Crianças</p>
                    <input
                      type="number"
                      min={0}
                      value={editChildren}
                      onChange={(e) => setEditChildren(Number(e.target.value))}
                      className="w-full rounded-lg border px-4 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 rounded-full border py-3 text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-full bg-red-500 py-3 text-sm text-white hover:bg-red-600 transition"
                >
                  Deletar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 rounded-full bg-accent py-3 text-sm text-white hover:bg-accent/90 transition"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}