<script lang="ts">
  import { timeline, inView, animate, stagger } from "motion";
  import { onMount } from "svelte";

  type Info = {
    title: string;
    description: string;
    image: string;
  };

  export let info: Info;
  export let containerClass: string = "min-h-svh lg:min-h-[800px]";
  export let titleClass: string = "text-7xl md:text-[150px]";
  export let descriptionClass: string = "text-lg";
  export let cta: boolean = false;

  const sequence = [
    ["section", { opacity: 1 }],
    // This will start 0.5 from the start of the whole timeline:
    ["title", { x: 100 }, { at: 0.5 }],
  ];
  onMount(() => {
    const boxes = document.querySelectorAll(".animate");
    const hero = document.querySelectorAll(".hero");
    inView(boxes, (info) => {
      animate(
        info.target,
        { opacity: 1, transform: "none" },
        { delay: stagger(1), duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
      );
    });
    inView(hero, (info) => {
      animate(
        info.target,
        { opacity: 0.6, transform: "none" },
        { delay: 0, duration: 1, easing: [0.17, 0.55, 0.55, 1] }
      );
    });
  });
</script>

<section class={`mx-auto ${containerClass} relative`}>
  <div
    class="container absolute px-4 z-10 h-full flex flex-col justify-end items-center text-center bottom-20 md:bottom-0 md:justify-center left-[50%] -translate-x-[50%]"
  >
    <span
      class={`text-primary font-[AtomicMarker] ${titleClass} z-10 mix-blend-plus-lighter opacity-0 -translate-y-16 animate`}
    >
      {info.title}
    </span>

    <p class={`text-white pt-8 max-w-xl z-10 ${descriptionClass} opacity-0 -translate-y-2 animate`}>
      {info.description}
    </p>
    {#if cta}
      <a href="#events" class="btn btn-primary mt-4">¡Quiero ir!</a>
    {/if}
  </div>
  <img
    src={info.image}
    alt="Portada"
    class="object-cover md:object-cover absolute w-full h-full maskImages z-0 md:opacity-60 hero opacity-0 translate-y-20"
  />
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
