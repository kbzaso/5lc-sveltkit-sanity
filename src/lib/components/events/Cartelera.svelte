<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
  import { extractYouTubeId } from "$lib/utils";

  export let billboard;
  export let title: string = "Cartelera";

  // const videoId = extractYouTubeId(billboard.images.url);
  let reloadVideo: { [key: string]: boolean } = {};

  // Function to reload the video
  function reloadVideoComponent(dialogId: string) {
    reloadVideo[dialogId] = false;
    setTimeout(() => {
      reloadVideo[dialogId] = true;
    }, 0);
  }
</script>

<section class="mt-10">
  <h3
    class="text-4xl font-bold text-white mask font-ibm italic mb-4 pl-4 text-center"
  >
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >k</span
    >
    {title}
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >k</span
    >
  </h3>

  <div
    id="catelera"
    class="parent"
  >
    {#each billboard as image, i}
      <article>
        <div>
          <button
            class={`focus:outline-primary wrap ${image.url ? "cursor-pointer border border-primary" : " cursor-default "}`}
            on:click={() =>
              reloadVideoComponent(
                `my_modal_${image.type_of_match.slice(0, 3)}_${i + 1}`
              )}
            onclick={image.url ? `my_modal_${image.type_of_match.slice(0, 3)}_${
              i + 1
            }.showModal()` : ''}
          >
            <img
              class={`w-full h-auto ${image.url ? "maskImages" : ""}`}
              src={urlForImage(image).width(800).height(1000).url()}
              alt={image.type_of_match}
              title={image.type_of_match}
            />
            <!-- Open the modal using ID.showModal() method -->
            {#if image.url}
              <div
                class="badge badge-primary self-end uppercase drop-shadow-md mb-6 rounded-none"
              >
                Ver más
              </div>
            {/if}
          </button>
        </div>
        {#if image.url}
          <dialog
            id={`my_modal_${image.type_of_match.slice(0, 3)}_${i + 1}`}
            class="modal modal-bottom sm:modal-middle bg-black/75"
            on:close={() =>
              reloadVideoComponent(
                `my_modal_${image.type_of_match.slice(0, 3)}_${i + 1}`
              )}
          >
            <div class="modal-box">
              <form method="dialog">
                <button
                  class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
                  >✕</button
                >
              </form>
              <h3 class="text-2xl font-ibm italic text-primary text-pretty">
                {image.type_of_match}
              </h3>
              <p class="py-4 text-white">
              {image.description}
            </p>
              {#if image.url}
                {#await extractYouTubeId(image.url) then youtubeId}
                  {#if reloadVideo[`my_modal_${image.type_of_match.slice(0, 3)}_${i + 1}`]}
                    <Youtube
                      id={youtubeId}
                      animations={false}
                      --title-color={"transparent"}
                    >
                      <button class="bg-black/50 rounded-full p-4"
                        ><YTIcon class="stroke-primary w-10 h-10" /></button
                      >
                    </Youtube>
                  {/if}
                {/await}
              {/if}
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn btn-primary uppercase">Cerrar</button>
                </form>
              </div>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  .wrap {
    display: grid;
    & > * {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .parent article {
    flex: 1 1 200px; /*  Stretching: */
    margin: 5px;
  }
</style>
