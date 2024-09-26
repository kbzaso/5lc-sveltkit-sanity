<script lang="ts">
  import { Sparkle, ClockIcon, MapPinIcon } from "lucide-svelte";
  import { quintOut } from "svelte/easing";
  import { fade, slide } from "svelte/transition";

  export let agenda;
  export let alone: boolean;

  const agendaItems = agenda.schedule;

  const attractions = [
    {
      title: "Foodtracks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.",
      image:
        "https://img.freepik.com/free-photo/medium-shot-woman-working_23-2148896942.jpg?t=st=1727203070~exp=1727206670~hmac=ef7a54b1c888a4c9f64be5d966e906122895d37118ce1743626228632b243223&w=826",
    },
    {
      title: "Zona de fumadores",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.",
      image:
        "https://img.freepik.com/free-photo/selective-closeup-shot-female-lighting-up-cigarette-with-lighter_181624-17164.jpg?t=st=1727203156~exp=1727206756~hmac=75f3cf73320bc774390a4adb4f099eafc339da49e6d07f9987e66c592b57feb2&w=826",
    },
    {
      title: "Merch oficial",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.",
      image:
        "https://cdn.sanity.io/images/izngoptr/development/4bdcce63c5793562615b5b1a119a6eea92347568-1080x1350.jpg?w=800&h=1000&fit=max&auto=format",
    },
    {
      title: "Aparcamientos gratis",
      description: "200 aparcamientos de libre uso para asistentes al evento.",
      image:
        "https://img.freepik.com/free-photo/car-car-park_1150-8889.jpg?t=st=1727203217~exp=1727206817~hmac=b6b6288d73ada6a521363ea340203dc324489e78a1cceb1a213d8fb739643553&w=826",
    },
  ];

  let showAllAgendaItems = false;

  function toggleShowAll() {
    showAllAgendaItems = !showAllAgendaItems;
  }

  function convertNewlinesToBreaks(text) {
    return text.replace(/\n/g, "<br>");
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
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-ibm-sans text-gray-100">
              {item.title}
            </h3>
          </div>
          <span
            class="bg-success text-black px-2 py-1 rounded-full text-xs flex items-center"
          >
            <ClockIcon class="mr-1 h-3 w-3" />
            {item.activity_date}
          </span>
        </div>
        <div class="mt-2 flex items-center text-sm text-primary">
          {#if item.description}
            <Sparkle class="mr-1 h-4 w-4 text-primary" />
            {@html convertNewlinesToBreaks(item.description)}
          {/if}
        </div>
      </li>
    {/each}
  </ul>
  {#if agendaItems.length > 5}
    <button
      class="mt-4 text-white text-center w-full hover:underline hover:text-primary"
      on:click={toggleShowAll}
    >
      {showAllAgendaItems ? "Mostrar menos" : "Mostrar más"}
    </button>
  {/if}
</article>
