<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import CardStaff from "$lib/components/CardStaff.svelte";
  import "@splidejs/svelte-splide/css/skyblue";

  import type { Staff } from "$lib/types";

  export let allStaff: Staff[] = [];

  const lastCard = {
    title: "Ver más"
  }
</script>

<div class="mx-auto container min-h-fit">
  <Splide
    hasTrack={false}
    options={{
      rewind: true,

      pagination: false,
      gap: "1rem",
      perPage: 2,
      focus: 0,
      omitEnd: true,
      mediaQuery: "min",
      breakpoints: {
        640: {
          perPage: 2,
        },
        768: {
          perPage: 4,
        },
        1024: {
          perPage: 5,
        },
      },
    }}
  >
    <SplideTrack>
      {#each allStaff as staff}
        <SplideSlide>
          {#if staff.staffType === "wrestler"}
          <a href={`/equipo/luchadores/${staff.slug}`}>
            <CardStaff {staff} />
          </a>
          {:else if staff.staffType === "referee"}
          <a href={`/equipo/arbitros/${staff.slug}`}>
            <CardStaff {staff} />
          </a>
          {:else if staff.staffType === "annonceurs"}
          <a href={`/equipo/presentadores/${staff.slug}`}>
            <CardStaff {staff} />
          </a>
          {/if}
        </SplideSlide>
      {/each}
      <SplideSlide>
        <a href={`/equipo`}>
          <div
              class="transition-all h-full"
            >
              <div
                class="h-full w-full transition-all group border-black border lg:hover:border-primary active:border-primary flex justify-center items-center"
              >

                <div>
                  <p
                    class="text-center text-xs md:text-md uppercase tracking-wider md:tracking-widest text-gray-300 mt-4 px-2 pt-0 truncate"
                  >
                    Revisa otros
                  </p>
                  <h3
                    class="text-center text-primary font-ibm font-black text-2xl italic md:text-4xl px-2 pb-2 pt-0 truncate"
                  >
                    Perfiles
                  </h3>
                </div>
              </div>
            </div>
        </a>
      </SplideSlide>
    
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-circle-arrow-right-filled"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z"
            stroke-width="0"
            fill="#facc15"
          />
        </svg>
      </button>
      <button class="splide__arrow splide__arrow--next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-circle-arrow-right-filled"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z"
            stroke-width="0"
            fill="#facc15"
          />
        </svg>
      </button>
    </div>
  </Splide>
</div>
