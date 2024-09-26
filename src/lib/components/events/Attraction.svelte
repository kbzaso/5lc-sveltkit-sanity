<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { convertNewlinesToBreaks } from "$lib/utils/index";

export let attractions;
export let alone: boolean;

</script>

<article id="attractions" class={`w-full ${alone ? 'col-span-2' : ''}`}>
  <h5 class="text-4xl font-ibm italic mask text-white mb-4">
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >H</span
    >
    Servicios y Facilidades
  </h5>
  <div class="grid grid-cols-2 gap-4">
    {#each attractions.item as attraction, index}
      <button
        onclick={`modal_${index}.showModal()`}
        class={`w-full h-full overflow-hidden min-h-60 rounded-sm hover:scale-105 transition-transform ${
          index === attractions.item.length - 1 && attractions.item.length % 2 !== 0
            ? "col-span-2"
            : ""
        }`}
      >
        <div class="relative h-full">
          <img
            src={urlForImage(attraction.asset).url()}
            alt="Person in a pink striped sweater"
            class="absolute inset-0 w-full min-h-96 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          />
          <div class="absolute bottom-4 left-4 right-4">
            <h2
              class={`text-2xl break-words font-ibm italic mask text-white mix-blend-lighten ${
                index % 2 === 0 ? "text-left" : "text-right"
              }`}
            >
              {attraction.title}
            </h2>
          </div>
        </div>
      </button>

      <dialog
        id={`modal_${index}`}
        class="modal modal-bottom sm:modal-middle bg-black/75"
      >
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
              >✕</button
            >
          </form>
          <h3 class="text-2xl font-ibm italic text-primary text-pretty">
            {attraction.title}
          </h3>
          <p class="py-4 text-white">
            {@html convertNewlinesToBreaks(attraction.description)}
          </p>
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
    {/each}
  </div>
</article>
