"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfirmations } from "@/app/context/ConfirmContext";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

import flor from "@/app/assets/flor.png";

export function ConfirmSection() {
  const { addConfirmation } = useConfirmations();

  const [name, setName] = useState("");
  const [going, setGoing] = useState<"yes" | "no" | null>(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  const total = adults + kids;
  const canSubmit =
    name.trim().length >= 2 &&
    going !== null &&
    (going === "no" || total >= 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    addConfirmation({
      name: name.trim(),
      going: going === "yes",
      adults: going === "yes" ? adults : 0,
      kids: going === "yes" ? kids : 0,
    });

    setName("");
    setGoing(null);
    setAdults(1);
    setKids(0);
  };

  const adjust = (type: "adults" | "kids", delta: number) => {
    if (type === "adults") setAdults((v) => Math.max(0, v + delta));
    else setKids((v) => Math.max(0, v + delta));
  };

  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 bg-background">
      <div className="max-w-lg mx-auto">
        {/* Título com a flor ao lado ou acima */}
        <div className="flex items-center justify-center mb-6 flex-wrap">
          <h2 className="text-center font-serif text-2xl md:text-3xl">
            Confirmar presença
          </h2>
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src={flor}
              alt="Flor decorativa"
              fill
              className="object-contain drop-shadow-sm"
              priority={false}
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div> 
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
            required
            minLength={2}
          />

          {/* Vou / Não vou */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGoing("yes")}
              className={`py-3 rounded-lg text-sm font-medium transition ${
                going === "yes"
                  ? "bg-accent text-white shadow-sm"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Vou comparecer
            </button>

            <button
              type="button"
              onClick={() => setGoing("no")}
              className={`py-3 rounded-lg text-sm font-medium transition ${
                going === "no"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-sm"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Não poderei ir
            </button>
          </div>

          {/* Adultos e Crianças */}
          <AnimatePresence>
            {going === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-3"
              >
                <div className="grid grid-cols-2 gap-x-6">
                  {(["adults", "kids"] as const).map((type) => {
                    const label = type === "adults" ? "Adultos" : "Crianças";
                    const value = type === "adults" ? adults : kids;

                    return (
                      <div
                        key={type}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {label}
                        </span>

                        <div className="flex justify-center items-center gap-1">
                          <button
                            type="button"
                            onClick={() => adjust(type, -1)}
                            disabled={value <= 0}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition text-gray-700"
                          >
                            <Minus size={16} strokeWidth={2.5} />
                          </button>

                          <span className="w-8 text-center text-base font-semibold tabular-nums text-gray-800">
                            {value}
                          </span>

                          <button
                            type="button"
                            onClick={() => adjust(type, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                          >
                            <Plus size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {total === 0 && (
                  <p className="text-xs text-amber-700 text-center mt-3">
                    Selecione pelo menos 1 pessoa
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3.5 rounded-lg font-medium transition mt-4 ${
              canSubmit
                ? "bg-black text-white hover:bg-gray-900 active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </form>
      </div>
    </section>
  );
}