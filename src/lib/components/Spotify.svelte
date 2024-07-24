<script lang="ts">
  export let src: string;
</script>

<div class="mx-auto container flex flex-col lg:flex-row justify-between  px-4 mt-10 gap-4 lg:gap-20">
  <iframe
  class="lg:order-1 order-2 w-full h-[400px] lg:w-3/5"
    title="Spotify Playlist"
    style="border-radius:12px"
    src={src}
    
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />

  <div class="lg:w-2/5 self-center text-pretty lg:order-2 order-1">
    <h2
      class="mt-2 text-3xl font-bold leading-8 text-primary sm:text-4xl font-ibm"
    >
      Los temitas que se gozaron
    </h2>
    <p class="mt-4 text-lg leading-8 text-white ">
      Esta fue la playlist que sonó ese día en la Bóveda, con la cúal movimos el esqueleto.
    </p>
  </div>
</div>

