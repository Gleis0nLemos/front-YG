export function Message() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="mx-auto max-w-xl text-center text-foreground">

        {/* Texto */}
        <p className="font-serif text-lg md:text-xl leading-loose">
          Estamos começando nossa vida juntos.
          <br />
          Sua presença nesse dia especial
          <br />
          já é um presente para nós.
        </p>

        {/* Espaço poético */}
        <div className="my-10" />

        <p className="font-serif text-lg md:text-xl leading-loose">
          Se desejar nos ajudar a dar
          <br />
          os primeiros passos desse novo capítulo,
          <br />
          preparamos uma lista com carinho.
        </p>

        {/* Divider */}
        <div className="mx-auto my-14 h-px w-16 bg-border opacity-50" />

        {/* Assinatura */}
        <p className="text-xs uppercase tracking-[0.4em] text-secondary">
          Gleison & Yasmim
        </p>

      </div>
    </section>
  );
}
