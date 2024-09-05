<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";

  export let sponsors;
  export let title: string;
</script>

<section class="py-12">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-ibm italic text-white text-center mb-4">
      {title}
    </h2>
    <div
      class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16"
    >
      {#each sponsors as sponsor, index}
        <a href={sponsor.sponsor_url} target="_blank" class="flex flex-col items-center">
          <img
            src={urlForImage(sponsor).url()}
            alt="{sponsor.name} logo"
            class="w-40 h-40 object-contain"
            width="160"
            height="160"
          />
        </a>
      {/each}
    </div>
  </div>
</section>
