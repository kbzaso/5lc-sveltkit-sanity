<script lang="ts">
    import { Carousel } from 'flowbite-svelte'
  let showThumbs=false
  let showCaptions=false

  import { urlForImage } from "$lib/config/sanity";

  export let images: any;

  for (let i = 0; i < images.length; i++) {
    images[i].id = i + 1;
}

$: counter = 1
const handleClickSum = () => {
    if (counter !== images.length) {
        counter++
    } 
}

const handleClickMin = () => {
    if (counter !== 1) {
        counter--
    }
}


</script>
<p>
    
</p>

<div class="relative carousel aspect-square flex max-w-3xl">
    {#each images as image }
        <div id={image.id} class="carousel-item relative w-full">
            <img loading="lazy" src={urlForImage(image).height(800).width(800).quality(100).url()} class="" alt={image.alt}/>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">

                <a on:click={handleClickMin} href={`#${counter}`} class={`transition-all delay-300 btn btn-circle ${counter !== 1 ? 'opacity-100' : 'opacity-0' }`}>❮</a> 

                <a on:click={handleClickSum} href={`#${counter}`} class={`transition-all delay-0 btn btn-circle ${counter !== images.length ? 'opacity-100' : 'opacity-0' }`}>❯</a>
            </div>
        </div> 
    {/each}
  </div>
