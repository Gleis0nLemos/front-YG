"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfirmations } from "@/app/context/ConfirmContext";
import { Minus, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

import flor from "@/app/assets/flor.png";

export function ConfirmSection() {
  const { addConfirmation } = useConfirmations();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [going, setGoing] = useState<"yes" | "no" | null>(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const total = adults + kids; 

  const canSubmit =
    name.trim().length >= 2 &&
    phone.trim().length >= 10 &&
    going !== null &&
    (going === "no" || adults >= 1) &&
    !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addConfirmation({
        name: name.trim(),
        phone: phone.trim(),
        attending: going === "yes",
        adults: going === "yes" ? adults : 0,
        children: going === "yes" ? kids : 0,
      });

      // clean form
      setName("");
      setPhone("");
      setGoing(null);
      setAdults(1);
      setKids(0);

      
      if (going === "yes") {
        setToastMessage("Presença confirmada com sucesso! 🎉");
      } else {
        setToastMessage("Que pena... Sentiremos sua falta! ❤️");
      }

      setTimeout(() => setToastMessage(null), 5000); // disappear before 5 seconds
    } catch (err: unknown) {
      console.error("Erro ao confirmar:", err);

      let errorMessage = "Não foi possível confirmar. Por favor, tente novamente.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = (err as { message: string }).message;
      }

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjust = (type: "adults" | "kids", delta: number) => {
    const min = type === "adults" ? 1 : 0;
    if (type === "adults") setAdults((v) => Math.max(min, v + delta));
    else setKids((v) => Math.max(min, v + delta));
  };

  return (
    <>
      <section id="confirmacao" className="py-16 md:py-24 md:mt-24 px-5 sm:px-8 bg-linear-180 from-background via-background/10 to-soft">
        <div className="max-w-lg mx-auto">
          
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
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
              required
              minLength={2}
              disabled={isSubmitting}
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Seu telefone (com DDD)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
              required
              minLength={10}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGoing("yes")}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                className={`py-3 rounded-lg text-sm font-medium transition ${
                  going === "no"
                    ? "bg-red-50 text-red-800 border border-red-200 shadow-sm"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                Não poderei ir
              </button>
            </div>

            <AnimatePresence>
              {going === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pt-3"
                >
                  <p className="text-sm text-accent mb-4 font-semibold tracking-tight">
                    Quantas pessoas vão comparecer incluindo você?
                  </p>
                  <div className="grid grid-cols-2 md:gap-x-6">
                    {(["adults", "kids"] as const).map((type) => {
                      const label = type === "adults" ? "Adultos (incl. você)" : "Crianças";
                      const value = type === "adults" ? adults : kids;

                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {label}
                          </span>

                          <div className="flex justify-center items-center gap-0">
                            <button
                              type="button"
                              onClick={() => adjust(type, -1)}
                              disabled={value <= (type === "adults" ? 1 : 0) || isSubmitting}
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
                              disabled={isSubmitting}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                            >
                              <Plus size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {adults < 1 && (
                    <p className="text-xs text-amber-700 text-center mt-3">
                      Selecione pelo menos 1 adulto (você)
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-3.5 rounded-lg font-medium transition mt-4 flex items-center justify-center gap-2 ${
                canSubmit
                  ? "bg-zinc-950 text-white hover:bg-zinc-950 active:scale-[0.98]"
                  : "bg-accent/40 text-white cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Confirmando...
                </>
              ) : (
                "Confirmar"
              )}
            </button>

            {submitError && (
              <p className="text-red-600 text-sm text-center mt-2">{submitError}</p>
            )}
          </form>
        </div>
      </section>

      {/* Toast message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-full text-sm shadow-2xl flex items-center justify-center gap-3 z-50 max-w-[90vw] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}