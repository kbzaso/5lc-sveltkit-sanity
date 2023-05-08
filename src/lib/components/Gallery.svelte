<script lang="ts">
  import { onMount } from "svelte";
  import { urlForImage } from "$lib/config/sanity";

  import BiggerPicture from "bigger-picture/svelte";
  import "bigger-picture/css";

  export let images;

  const galleryImages = images.map((image: any) => {
    if (!image.vertical) {
      return {
        src: urlForImage(image).height(750).width(1000).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 750,
        width: 1000,
      };
    } else if (image.vertical) {
      return {
        src: urlForImage(image).height(1000).width(750).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 1000,
        width: 750,
      };
    }
  });

  let MacyComponent: typeof import("svelte-macy").Macy;

	onMount(async () => {
	  MacyComponent = (await import("svelte-macy")).Macy // or .default;
     // initialize
     let bp = BiggerPicture({
      target: document.body,
    });

    // grab image links
    const imageLinks = document.querySelectorAll("#images > a");

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

  let macy: any;

	let options = {
		container: "#images",
    trueOrder: true,
    waitForImages: true,
    margin: 4,
    columns: 3,
    breakAt: {
      1200: 3,
      940: 2,
      520: 2,
    },  
  }
</script>

<section class="lg:w-2/3 w-full mx-auto justify-center">
<svelte:component this="{MacyComponent}" bind:macy options="{options}">
    <div id="images">
      {#each galleryImages as image}
          <a
            class="photo"
            href={image.src}
            data-img={image.src}
            data-thumb={image.thumb}
            data-height={image.height}
            data-width={image.width}
            data-alt={image.alt}
          >
            <img loading="lazy" src={image.thumb} alt={image.alt} />
          </a>
        {/each}
      </div>
    </svelte:component>
</section>