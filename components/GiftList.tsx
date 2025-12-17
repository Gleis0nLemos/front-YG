export function GiftList() {
  const gifts = [
    { id: 1, name: "Jogo de pratos", available: true },
    { id: 2, name: "Liquidificador", available: false },
  ];

  return (
    <section id="presentes" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl text-center mb-12">
        Lista de presentes
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {gifts.map(gift => (
          <div
            key={gift.id}
            className={`p-6 rounded-xl border ${
              gift.available ? "bg-white" : "bg-gray-100 opacity-60"
            }`}
          >
            <h3 className="text-lg font-medium">{gift.name}</h3>

            <button
              disabled={!gift.available}
              className="mt-4 px-4 py-2 rounded bg-black text-white disabled:bg-gray-400"
            >
              {gift.available ? "Escolher presente" : "Já escolhido"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
