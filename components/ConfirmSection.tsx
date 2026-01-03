"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

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

function Counter({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-full border border-border px-4 py-3">
      <span className="text-sm text-secondary">{label}</span>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setValue(Math.max(0, value - 1))}
          className="h-8 w-8 rounded-full border border-border text-sm transition hover:bg-muted"
        >
          −
        </button>

        <span className="w-4 text-center text-sm">{value}</span>

        <button
          type="button"
          onClick={() => setValue(value + 1)}
          className="h-8 w-8 rounded-full border border-border text-sm transition hover:bg-muted"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function ConfirmSection() {
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  return (
    <section
      id="confirmacao"
      className="py-32 px-6 bg-background text-foreground"
    >
      <motion.div
        className="mx-auto max-w-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            Confirmação de presença
          </p>

          <div className="mx-auto my-8 h-px w-16 bg-border opacity-60" />

          <p className="font-serif text-secondary max-w-md mx-auto">
            Sua presença tornará esse dia ainda mais especial.
          </p>
        </motion.div>

        {/* Card */}
        <motion.form
          variants={item}
          className="rounded-2xl border border-border bg-card p-8 space-y-6"
        >
          <input
            placeholder="Seu nome"
            className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent"
          />

          <select className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent">
            <option value="">Você poderá comparecer?</option>
            <option value="yes">Vou comparecer 💛</option>
            <option value="no">Não poderei ir</option>
          </select>

          {/* Contadores */}
          <div className="space-y-3">
            <Counter label="Adultos" value={adults} setValue={setAdults} />
            <Counter label="Crianças" value={kids} setValue={setKids} />
          </div>

          <textarea
            placeholder="Mensagem para os noivos (opcional)"
            rows={4}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none resize-none transition focus:border-accent"
          />

          <button
            type="submit"
            className="w-full rounded-full px-4 py-3 text-xs uppercase tracking-widest border border-accent text-accent transition hover:bg-accent hover:text-background"
          >
            Confirmar presença
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
