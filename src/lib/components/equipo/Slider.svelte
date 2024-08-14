<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  export let reverse: boolean;
  export let items;
</script>

<section class="container mx-auto mt-20 max-w-6xl">
  <div
    class="slider"
    style={`
      --height: 406px;
      --width: 250px;
      --quantity: ${items.length};
      --animation-speed: 100s;
      `}
    data-reverse={reverse}
  >
    <div class="list">
      {#each items as staff, index}
        <div class="item" style={`--position: ${index + 1}`}>
          <a href={`/equipo/luchadores/${staff.slug.current}`}>
            <figure>
              <img
              class="hover:scale-105 transition-all"
                height="334"
                width="250"
                loading="lazy"
                src={urlForImage(staff?.staffImage)
                  .height(334)
                  .width(250)
                  .quality(100)
                  .url()}
                alt={staff.title}
              />
            </figure>
          </a>
            <div class="flex flex-col text-center">
              <span
                class="text-sm md:text-md uppercase tracking-wider md:tracking-widest text-white mt-4 px-2 pt-0 truncate"
              >
                {staff?.pseudonym ? staff?.pseudonym : ""}
              </span>
              <span class="font-[AtomicMarker] text-3xl text-primary truncate">
                {staff.title}
              </span>
            </div>
          
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .slider {
    min-height: 450px;
    width: 100%;
    height: var(--height);
    position: relative;
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 10% 90%,
      transparent
    );
  }

  .slider .list {
    display: flex;
    gap: 10px;
    height: 100%;
    min-width: calc(var(--width) * var(--quantity));
  }

  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 40s linear infinite;
    animation-delay: calc((40s / var(--quantity)) * (var(--position) * -1)) !important;
    transition: filter 0.5s;
  }

  .slider .list .item a {
    width: 100%;
  }

  @keyframes autoRun {
    from {
      left: 2500px;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  .slider:hover .item {
    filter: grayscale(1);
  }
  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[data-reverse="true"] .item{
    animation: reversePlay 40s linear infinite;
  }
  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 2500px;
    }
  }
</style>
