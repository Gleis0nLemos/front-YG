export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm uppercase tracking-widest text-gray-500">
        Você está convidado(a)
      </p>

      <h1 className="text-4xl md:text-6xl font-serif mt-4">
        Chá de Cozinha
      </h1>

      <p className="mt-4 text-lg">
        Gleison & Yasmim
      </p>

      <p className="mt-2 text-gray-600">
        10 de Maio • 16h
      </p>

      <a
        href="#presentes"
        className="mt-8 px-6 py-3 rounded-full bg-black text-white hover:opacity-90 transition"
      >
        Ver lista de presentes
      </a>
    </section>
  );
}
