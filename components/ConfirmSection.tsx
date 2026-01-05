"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Counter({
  label,
  value,
  setValue,
  disabled,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-full border px-4 py-3 transition
        ${disabled ? "opacity-40 pointer-events-none" : "border-border"}
      `}
    >
      <span className="text-sm text-secondary">{label}</span>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setValue(Math.max(0, value - 1))}
          className="h-8 w-8 rounded-full border text-sm hover:bg-muted"
        >
          −
        </button>

        <span className="w-4 text-center text-sm">{value}</span>

        <button
          type="button"
          onClick={() => setValue(value + 1)}
          className="h-8 w-8 rounded-full border text-sm hover:bg-muted"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function ConfirmSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"" | "yes" | "no">("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  const going = status === "yes";
  const disabledSubmit =
    !name ||
    !status ||
    (going && adults === 0 && kids === 0);

  function handleStatusChange(value: "yes" | "no") {
    setStatus(value);

    if (value === "no") {
      setAdults(0);
      setKids(0);
    }

    if (value === "yes" && adults === 0 && kids === 0) {
      setAdults(1);
    }
  }

  return (
    <section className="py-32 px-6 bg-background">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            Confirmação de presença
          </p>
          <div className="mx-auto my-8 h-px w-16 bg-border opacity-60" />
        </div>

        <form className="rounded-2xl border border-border bg-card p-8 space-y-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-full border px-4 py-3 text-sm outline-none"
          />

          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value as "yes" | "no")
            }
            className="w-full rounded-full border px-4 py-3 text-sm outline-none"
          >
            <option value="">Você poderá comparecer?</option>
            <option value="yes">Vou comparecer 💛</option>
            <option value="no">Não poderei ir</option>
          </select>

          {/* Contadores animados */}
          <AnimatePresence>
            {going && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                <Counter
                  label="Adultos"
                  value={adults}
                  setValue={setAdults}
                  disabled={!going}
                />
                <Counter
                  label="Crianças"
                  value={kids}
                  setValue={setKids}
                  disabled={!going}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            placeholder="Mensagem (opcional)"
            className="w-full rounded-2xl border px-4 py-3 text-sm resize-none"
            rows={4}
          />

          <button
            disabled={disabledSubmit}
            className={`w-full rounded-full px-4 py-3 text-xs uppercase tracking-widest transition
              ${
                disabledSubmit
                  ? "opacity-40 pointer-events-none"
                  : "border border-accent text-accent hover:bg-accent hover:text-background"
              }
            `}
          >
            Confirmar presença
          </button>
        </form>
      </div>
    </section>
  );
}
