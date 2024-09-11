<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
  import { extractYouTubeId } from "$lib/utils";

  export let billboard;
  export let title: string = "Cartelera";

  // const videoId = extractYouTubeId(billboard.images.url);
  let reloadVideo = {};

  // Function to reload the video
  function reloadVideoComponent(dialogId) {
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
    class={`${
      billboard.length > 2 ? "columns-2 md:columns-3" : "columns-1 md:columns-2"
    } gap-4`}
  >
    {#each billboard as image, i}
      <div>
        <img
          class="w-full h-auto"
          src={urlForImage(image).width(800).height(1000).url()}
          alt={image.type_of_match}
          title={image.type_of_match}
        />
        <!-- Open the modal using ID.showModal() method -->
        <button
          on:click={() =>
            reloadVideoComponent(
              `my_modal_${image.type_of_match.slice(0, 3)}_${i + 1}`
            )}
          class="btn"
          onclick={`my_modal_${image.type_of_match.slice(0, 3)}_${
            i + 1
          }.showModal()`}>open modal</button
        >
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
              Press ESC key or click the button below to close
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
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    {/each}
  </div>
</section>
