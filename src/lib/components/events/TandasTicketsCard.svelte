<script lang="ts">
  import { Tickets } from "lucide-svelte";
  interface Ticket {
    index: number;
    amount: number;
    price: number;
    type: string;
    active: boolean;
  }

  export let ticket: Ticket;
  export let dicountPercentage: number | undefined;

  let ticketPrice = ticket.price;
  let priceBeforeDiscount = ticket.price;

  if (dicountPercentage) {
    ticketPrice = ticket.price - (ticket.price * dicountPercentage) / 100;
  }

  let formatedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(ticketPrice);
</script>

<div
  class:opacity-50={!ticket.active}
  class={`w-full border-2 p-2 indicator flex flex-col justify-center items-center pt-2 ${ticket.active ? 'border-primary min-h-36' : 'border-white min-h-20'} rounded-sm`}
>
  <span
    class="indicator-item indicator-center badge bg-[#0d0d0d] text-xl tracking-widest uppercase"
    >{ticket.type === "firsts_tickets"
      ? "Preventa"
      : ticket?.type === "seconds_tickets"
      ? "Regular"
      : "Últimas entradas"}</span
  >
  <div class="text-sm">
    {#if ticket.amount !== 0}
      <div class="text-center">
        <span class="text-sm line-through text-error"
          >{dicountPercentage ? `$${priceBeforeDiscount}` : ""}</span
        >
        <span class="text-2xl font-ibm text-primary"
          >{formatedPrice || 0}.-</span
        >
      </div>
      {#if ticket.amount <= 15}
        <span class={`flex items-center gap-2 tracking-widest uppercase`}>
          <Tickets />
          {ticket.amount > 1 ? `Últimas ${ticket.amount} entradas` : "Última entrada"}
        </span>
      {/if}
      {#if !ticket.active && ticket.amount > 0}
        <span class="tracking-widest uppercase">Proximamente</span>
      {/if}
    {:else}
      <p class="text-2xl font-ibm text-primary">{formatedPrice || 0}</p>
      <span class="tracking-widest uppercase">Agotada</span>
    {/if}
  </div>
</div>
