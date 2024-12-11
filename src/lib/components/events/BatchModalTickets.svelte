<script lang="ts">
  import { onMount } from "svelte";
  import type { Event } from "$lib/types";
  import { calculatePrice } from "$lib/utils/eventUtils";


  export let nextEvent: Event;
  export let disclaimerEvent: any;

  let selectedTickets: any;
  let remainingTickets: number;
  let optionsCount: number;

  onMount(() => {
    selectedTickets = "";
    remainingTickets = nextEvent.total_tickets - nextEvent.tickets_sold;
    optionsCount = Math.min(remainingTickets, 10);
  });

  let selectedTicketsTotalPrice = 0;
  $: formattedFinalPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(selectedTicketsTotalPrice);
  const hangleChange = () => {
    let obj = calculatePrice(selectedTickets, nextEvent.ticket);
    selectedTicketsTotalPrice = obj.totalCost;
  };
</script>

<button
  disabled={!$disclaimerEvent}
  class="mt-4 btn grow w-full rounded-none btn-primary cursor-pointer text-black no-underline"
  onclick="my_modal_5.showModal()"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
    />
  </svg>
  ¡Quiero ir!</button
>
{#if !$disclaimerEvent}
  <p class="text-xs text-error text-center mt-2">
    Debes aceptar el código de conducta
  </p>
{/if}