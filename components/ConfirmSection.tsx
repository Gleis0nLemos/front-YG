export function ConfirmSection() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <h2 className="text-3xl text-center mb-8">
        Confirmar presença
      </h2>

      <form className="max-w-md mx-auto space-y-4">
        <input
          placeholder="Seu nome"
          className="w-full border p-3 rounded"
        />

        <select className="w-full border p-3 rounded">
          <option>Vou comparecer</option>
          <option>Não poderei ir</option>
        </select>

        <textarea
          placeholder="Mensagem (opcional)"
          className="w-full border p-3 rounded"
        />

        <button className="w-full py-3 bg-black text-white rounded">
          Confirmar
        </button>
      </form>
    </section>
  );
}
