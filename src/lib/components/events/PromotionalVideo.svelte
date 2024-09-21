<script lang="ts">
  import { Play } from "lucide-svelte";
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
  import { extractYouTubeId } from "$lib/utils";
  export let url: string;

  const videoId = extractYouTubeId(url);

  let reloadVideo: { [key: string]: boolean } = {};

  // Function to reload the video
  function reloadVideoComponent(dialogId: string) {
    reloadVideo[dialogId] = false;
    setTimeout(() => {
      reloadVideo[dialogId] = true;
    }, 0);
  }
</script>

<div class="w-full flex justify-center mt-4">
  <button
    on:click={() => reloadVideoComponent(`modal_promotional_video`)}
    onclick="modal_promotional_video.showModal()"
    class="flex gap-2 items-center btn btn-primary btn-outline w-full md:w-fit"
  >
    <span class="uppercase"> Ver video promocional</span>
    <Play class="text-primary" />
  </button>
</div>

<dialog
  on:close={() => reloadVideoComponent(`modal_promotional_video`)}
  id={`modal_promotional_video`}
  class="modal modal-bottom sm:modal-middle bg-black/75"
>
  <div class="modal-box">
    <form method="dialog">
      <button
        class="btn btn-sm btn-circle btn-primary absolute right-4 top-2 z-20"
        >✕</button
      >
    </form>

    {#if reloadVideo[`modal_promotional_video`]}
      <Youtube
        id={videoId}
        animations={false}
        --title-color="transparent"
        --title-shadow-color="transparent"
      >
        <button class="bg-black/50 rounded-full p-4"
          ><YTIcon class="stroke-primary w-10 h-10" /></button
        >
      </Youtube>
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
