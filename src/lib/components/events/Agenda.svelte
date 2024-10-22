<script lang="ts">
  import { Sparkle, ClockIcon, ArrowLeft } from "lucide-svelte";
  import { quintOut } from "svelte/easing";
  import { fade, slide } from "svelte/transition";
  import { convertNewlinesToBreaks } from "$lib/utils/index";

  export let agenda;
  export let alone: boolean;

  const agendaItems = agenda.schedule;

  let showAllAgendaItems = false;

  function toggleShowAll() {
    showAllAgendaItems = !showAllAgendaItems;
  }

</script>

<article id="agenda" class={`w-full ${alone ? "col-span-2" : ""}`}>
  <h5 class="text-4xl font-ibm italic mask text-white mb-4">
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >P</span
    >
    Agenda
  </h5>
  <ul class="space-y-4">
    {#each showAllAgendaItems ? agendaItems : agendaItems.slice(0, 5) as item, index}
      <li
        class="border-b border-primary/50 last:border-b-0 pb-4 last:pb-0"
        transition:slide={{ duration: 300, easing: quintOut, axis: "y" }}
      >
        <div class="flex  justify-between items-start gap-4">
            <h3 class="text-lg font-ibm-sans text-gray-100">
              {item.title}
            </h3>
          <span
            class="badge badge-success truncate"
          >
            <ClockIcon class="mr-1 h-3 w-3" />
            {item.activity_date}
          </span>
        </div>
        <div class="mt-2 flex items-start text-sm text-primary">
          {#if item.description}
            {@html convertNewlinesToBreaks(item.description)}
          {/if}
        </div>
      </li>
    {/each}
  </ul>
  {#if agendaItems.length > 5}
    <button
      class="mt-4 text-white w-full hover:underline hover:text-primary flex justify-center hover:bg-zinc-800/50 py-2 transition-colors"
      on:click={toggleShowAll}
    >
      {#if showAllAgendaItems}
        Mostrar menos <ArrowLeft class="rotate-90" />
      {:else}
        Mostrar más
        <ArrowLeft class="-rotate-90" />
      {/if}
    </button>
  {/if}
</article>
