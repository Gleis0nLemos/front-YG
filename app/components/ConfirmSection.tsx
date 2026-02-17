"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useConfirmations } from "@/app/context/ConfirmContext";

export function ConfirmSection() {
  const { addConfirmation } = useConfirmations();

  const [name, setName] = useState("");
  const [going, setGoing] = useState<"yes" | "no" | null>(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const options = ["yes", "no"] as const;

  const disabled =
    !name.trim() ||
    going === null ||
    (going === "yes" && adults + kids === 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addConfirmation({
      name,
      going: going === "yes",
      adults: going === "yes" ? adults : 0,
      kids: going === "yes" ? kids : 0,
    });

    setName("");
    setGoing(null);
    setAdults(1);
    setKids(0);
  }

  return (
    <section className="py-32 px-6 bg-background">
      <h2 className="text-center font-serif text-2xl mb-10">
        Confirmar presença
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-6"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full rounded-xl border px-4 py-3 bg-transparent"
        />

        <div className="flex gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setGoing(opt)}
              className={`flex-1 rounded-full border px-4 py-2 text-xs uppercase tracking-widest
                ${
                  going === opt
                    ? "bg-accent text-background"
                    : "text-secondary"
                }`}
            >
              {opt === "yes"
                ? "Vou comparecer"
                : "Não poderei ir"}
            </button>
          ))}
        </div>

        {going === "yes" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <input
              type="number"
              min={0}
              value={adults}
              onChange={(e) => setAdults(+e.target.value)}
              className="rounded-xl border px-4 py-3"
              placeholder="Adultos"
            />
            <input
              type="number"
              min={0}
              value={kids}
              onChange={(e) => setKids(+e.target.value)}
              className="rounded-xl border px-4 py-3"
              placeholder="Crianças"
            />
          </motion.div>
        )}

        <button
          disabled={disabled}
          className="w-full rounded-full bg-black text-white py-3 disabled:opacity-30"
        >
          Confirmar presença
        </button>
      </form>
    </section>
  );
}
