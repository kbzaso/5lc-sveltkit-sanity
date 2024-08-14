<script lang="ts">

  type Info = {
    title: string;
    description: string;
    image: string;
  }

  export let info: Info;
  export let containerClass: string = 'min-h-svh lg:min-h-[800px]';
  export let titleClass: string = 'text-7xl md:text-[150px]';
  export let descriptionClass: string = 'text-lg';
  export let cta: boolean = false;
</script>

  <section
    class={`mx-auto ${containerClass} relative`}
  >
    <div
      class="container absolute px-4 z-10 h-full flex flex-col justify-end items-center text-center bottom-20 md:bottom-0 md:justify-center left-[50%] -translate-x-[50%]"
    >
      <span class={`uppercase tracking-widest text-primary font-[AtomicMarker] drop-shadow-md -rotate-6 ${titleClass}`}>
        {info.title}
      </span>

      <p class={`text-white pt-8 max-w-xl z-10 ${descriptionClass}`}>
        {info.description}
      </p>
      {#if cta}
        <a href="#events" class="btn btn-primary mt-4">¡Quiero ir!</a>
      {/if}
    </div>
    <img src={info.image} alt="Portada" class="object-cover md:object-cover absolute w-full h-full maskImages md:opacity-50">
  </section>


  <style>
/* .neon-flicker {
    color: #fff;
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #facc15,
      0 0 80px #facc15,
      0 0 90px #facc15,
      0 0 100px #facc15,
      0 0 110px #facc15;
    animation: neon-flicker 1.5s infinite alternate;
  }

  @keyframes neon-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 40px #facc15,
        0 0 80px #facc15,
        0 0 90px #facc15,
        0 0 100px #facc15,
        0 0 110px #facc15;
    }
    20%, 24%, 55% {
      text-shadow: none;
    }
  } */
  </style>