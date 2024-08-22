<script lang="ts">
  const faq = [
    {
      question: "¿Qué debo presentar para ingresar a un evento?",
      answer:
        " El ingreso a nuestros shows se gestiona mediante una lista en el acceso el día del evento. Allí, te solicitarán tu nombre, RUT o el correo electrónico utilizado para comprar las entradas. El ingreso se realiza por orden de llegada y no se permite reservar espacios.",
    },
    {
      question: "¿A que hora comienzan los eventos de 5 Luchas?",
      answer:
        "Salvo casos particulares, los shows comienzan a las 20:00 hrs. El ingreso comienza a las 19:15 hrs.",
    },
    {
      question: "¿Pueden ingresar menores a los shows de 5 Luchas?",
      answer:
        "El ingreso de menores de hasta 15 años de edad a nuestros shows es siempre en compañía de un adulto. El espectáculo está pensado para público adulto, por lo que siempre se recomienda discreción.",
    },
    {
      question: "¿Cómo se quién participará en cada show?",
      answer:
        "La cartelera y los participantes de cada espectáculo se develarán en los días cercanos a la fecha. Esta información siempre quedará sujeta a modificaciones.",
    },
    {
      question: "¿Puedo ingresar comida y bebestibles a la Bóveda?",
      answer:
        "No, disponemos de una variada gama de bebidas y refrigerios para tu deleite, incluyendo opciones vegetarianas. Apoyándonos consumiendo lo que ofrecemos en cada espectáculo, nos ayudas a seguir brindándote la mejor experiencia de Lucha Libre.",
    },
    {
      question: "¿Que pasa si compre mi entrada y no puedo ir?",
      answer:
        "En caso de imprevistos que te impidan asistir, puedes contactarnos a hola@5luchas.cl para solicitar el reembolso de tu entrada. También tienes la opción de venderla a otra persona interesada en asistir al evento. Estos trámites deben realizarse antes de la fecha del show correspondiente.",
    },
  ];

  let indexSelected: number = 0;

  function handleChange(index: number) {
    indexSelected = index;
  }
</script>

<section class="container mx-auto space-y-2 max-w-2xl mb-20 mt-40">
  <h3
    class="text-4xl font-bold text-white mask font-ibm italic mb-4 text-center"
  >
    Preguntas Frecuentes
  </h3>
  {#each faq as { question, answer }, index}
    <div class="collapse rounded-none collapse-arrow">
      <input type="checkbox" class="peer" checked={index === indexSelected} />
      <button
        on:click={() => {
          handleChange(index);
        }}
        class="collapse-title bg-transparent text-white peer-checked:bg-primary peer-checked:text-black text-left mask font-ibm italic text-lg"
      >
        {question}
      </button>
      <div
        class="collapse-content text-primary-content peer-checked:border peer-checked:border-primary peer-checked:bg-black/50 peer-checked:text-white pt-2"
      >
        <p>{answer}</p>
      </div>
    </div>
  {/each}
</section>
