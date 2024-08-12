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
      <h1 class="uppercase tracking-widest text-primary font-[AtomicMarker] text-7xl md:text-[150px] -rotate-3 drop-shadow-md">
        {info.title}
      </h1>

      <p class="text-lg text-white pt-4 max-w-xl">
        {info.description}
      </p>
    </div>
    <img src={info.image} alt="Portada" class="object-cover md:object-cover absolute w-full h-full maskImages md:opacity-50">
  </header>
