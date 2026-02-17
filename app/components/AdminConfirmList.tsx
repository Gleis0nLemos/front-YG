"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useConfirmations } from "@/app/context/ConfirmContext";
import { exportCSV } from "@/app/utils/exportCsv";

function exitAdminMode() {
  const url = new URL(window.location.href);
  url.searchParams.delete("admin");
  window.location.href = url.toString();
}

export function AdminConfirmList() {
  const {
    confirmations,
    removeConfirmation,
    updateConfirmation,
  } = useConfirmations();

  const going = confirmations.filter((c) => c.going);
  const notGoing = confirmations.filter((c) => !c.going);

  const totalAdults = going.reduce((s, c) => s + c.adults, 0);
  const totalKids = going.reduce((s, c) => s + c.kids, 0);

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-secondary">
            Visão admin
          </h3>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => exportCSV(confirmations)}
              className="
                rounded-full px-5 py-2
                text-xs uppercase tracking-widest
                border border-accent
                text-accent
                hover:bg-accent hover:text-background
                transition
              "
            >
              Exportar confirmações
            </button>

            <button
              onClick={exitAdminMode}
              className="
                rounded-full px-5 py-2
                text-xs uppercase tracking-widest
                border border-border
                text-secondary
                hover:bg-muted
                transition
              "
            >
              Sair do modo admin
            </button>
          </div>
        </div>

        {/* Totais */}
        <div className="flex justify-center gap-8 text-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-secondary">
              Adultos
            </p>
            <p className="text-3xl font-serif">{totalAdults}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-secondary">
              Crianças
            </p>
            <p className="text-3xl font-serif">{totalKids}</p>
          </div>
        </div>

        {/* Confirmados */}
        <div>
          <h3 className="mb-6 text-sm uppercase tracking-widest text-secondary">
            Confirmados
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {going.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4 bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-secondary mt-1">
                      Adultos: {c.adults} • Crianças: {c.kids}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={c.adults}
                      onChange={(e) =>
                        updateConfirmation(c.id, {
                          adults: +e.target.value,
                        })
                      }
                      className="w-14 rounded border px-2 py-1 text-xs"
                    />
                    <input
                      type="number"
                      min={0}
                      value={c.kids}
                      onChange={(e) =>
                        updateConfirmation(c.id, {
                          kids: +e.target.value,
                        })
                      }
                      className="w-14 rounded border px-2 py-1 text-xs"
                    />

                    <button
                      onClick={() => removeConfirmation(c.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Não irão */}
        {notGoing.length > 0 && (
          <div className="opacity-60">
            <h3 className="mb-4 text-xs uppercase tracking-widest">
              Não poderão ir
            </h3>

            <ul className="space-y-2 text-sm">
              {notGoing.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between"
                >
                  <span>✖ {c.name}</span>

                  <button
                    onClick={() => removeConfirmation(c.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
