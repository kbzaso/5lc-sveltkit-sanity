<script lang="ts">
  import { onMount } from "svelte";
  import { urlForImage } from "$lib/config/sanity";

  import BiggerPicture from "bigger-picture/svelte";
  import "bigger-picture/css";

  export let images;
  export let id: string;

  let galleryImages = images.map((image: any) => {
    if (!image.vertical) {
      return {
        src: urlForImage(image).height(750).width(1000).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 750,
        width: 1000,
        photographer: image.photographer?.name,
        photographerUrl: image.photographer?.imageUrl,
      };
    } else if (image.vertical) {
      return {
        src: urlForImage(image).height(1000).width(750).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 1000,
        width: 750,
        photographer: image.photographer?.name,
        photographerUrl: image.photographer?.imageUrl,
      };
    }
  });

  onMount(() => {
    // initialize
    let bp = BiggerPicture({
      target: document.body,
    });

    // grab image links
    let imageLinks = document.querySelectorAll(`a.${id}`);
    // add click listener to open BiggerPicture
    for (let link of imageLinks) {
      link.addEventListener("click", openGallery);
    }

    // open BiggerPicture
    function openGallery(e: Event) {
      e.preventDefault();
      bp.open({
        items: imageLinks,
        el: e.currentTarget!,
      });
    }
  });
</script>

<section class="w-full mx-auto">
  <div
    id="images"
    class="columns-2 sm:columns-3 md:columns-4 lg:columns-4 xl:columns-5"
  >
    {#each galleryImages as image}
      <a
        class={id}
        href={image?.src}
        data-img={image?.src}
        data-thumb={image?.thumb}
        data-height={image?.height}
        data-width={image?.width}
        data-alt={image?.alt}
        data-caption={`Fotografía de ${image?.photographer} (<a class="underline" target="_blank" href=${image?.photographerUrl}>Instagram</a>)`}
      >
        <img
          class="mb-2 rounded-sm"
          loading="lazy"
          width="400"
          src={image?.thumb}
          alt={image?.alt}
        />
      </a>
    {/each}
  </div>
</section>
