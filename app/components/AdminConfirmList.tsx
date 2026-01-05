"use client";

import { motion } from "framer-motion";

type Confirmation = {
  name: string;
  going: boolean;
  adults: number;
  kids: number;
};

export function AdminConfirmList({
  data,
}: {
  data: Confirmation[];
}) {
  const going = data.filter((p) => p.going);
  const notGoing = data.filter((p) => !p.going);

  const totalAdults = going.reduce((sum, p) => sum + p.adults, 0);
  const totalKids = going.reduce((sum, p) => sum + p.kids, 0);

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

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
            {going.map((p) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4 bg-card"
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-secondary mt-1">
                  Adultos: {p.adults} • Crianças: {p.kids}
                </p>
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
              {notGoing.map((p) => (
                <li key={p.name}>✖ {p.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
