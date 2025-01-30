<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { PortableText } from "@portabletext/svelte";
  import CardStaff from "../CardStaff.svelte";
  import { onMount } from "svelte";

  export let billboard: {
    cartelera_description: any;
    referenceStaff: {
      title: string;
      staffType: "wrestler" | "referee" | "annonceurs";
      slug: string;
      staffImage: any;
    }[];
  };
  export let title: string = "Cartelera";

  const url = {
    wrestler: "/equipo/luchadores/",
    referee: "/equipo/arbitros/",
    annonceurs: "/equipo/presentadores/",
  };
</script>

<div>
  <div id="catelera" class="parent relative">
    <article class="flex flex-col sm:flex-row gap-4">
      <div>
        <img
          class={`w-full h-auto`}
          src={urlForImage(billboard).width(800).height(1000).url()}
          alt="Cartelera"
          title="Cartelera"
        />
      </div>
      <div>
        <h3
          class="text-4xl font-bold text-white mask font-ibm italic mb-4 text-left"
        >
          <span
            aria-hidden="true"
            class="font-[AtomicMarkerExtras] text-primary">O</span
          >
          {title}
        </h3>
        <p class="prose text-lg text-white">
          <PortableText
            value={billboard?.cartelera_description}
            components={{}}
          />
        </p>
        {#if billboard?.referenceStaff}
          <p class="my-4">Parte del equipo que estará presente:</p>
          <div class="flex gap-2 mt-4 flex-wrap">
            {#each billboard?.referenceStaff as staff}
              <div class="tooltip tooltip-primary" data-tip={staff?.title}>
                <a
                  href={`${url[staff?.staffType]}${staff?.slug}`}
                  class="rounded-sm h-14 w-14 inline-block"
                >
                  <img
                    src={urlForImage(staff?.staffImage)
                      .width(150)
                      .height(150)
                      .url()}
                    alt=""
                  />
                </a>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </article>
  </div>
</div>
