<script lang="ts">
  import { page } from "$app/stores";
  import { imageBuilder } from "$lib/config/sanity";

  const info = {
    title: "Catarsis",
    description: "¡Ven a vivir la experiencia de 5 Luchas Clandestino! Acompañanos en la búsqueda de la liberación del estrés y la rutina diaria a través de la Lucha Libre. ",
    image: "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/u69g3iwicq5jtlvyonwp",
  };
</script>

  <header
    id="header"
    class={`mx-auto min-h-svh`}
  >
    <div
      class="container absolute px-4 z-10 h-full flex flex-col justify-end items-center text-center bottom-20 md:bottom-0 md:justify-center left-[50%] -translate-x-[50%]"
    >
      <h1 class="uppercase tracking-widest text-primary font-[AtomicMarker] text-7xl md:text-[150px] -rotate-3 drop-shadow-md neon-flicker">
        {info.title}
      </h1>

      <p class="text-lg text-white pt-4 max-w-xl z-10">
        {info.description}
      </p>
    </div>
    <img src={info.image} alt="Portada" class="object-cover md:object-cover absolute w-full h-full maskImages md:opacity-50">
  </header>


  <style>
.neon-flicker {
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
  }
  </style>