<script lang="ts">
  import { DiffCard } from "sanity";

  interface Ticket {
    index: number;
    amount: number;
    price: number;
    type: string;
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
  class:opacity-25={ticket.amount === 0}
  class={`w-full border p-2 indicator flex flex-col justify-center items-center pt-2 min-h-16 ${
    ticket.type === "firsts_tickets"
      ? "border-success"
      : ticket?.type === "seconds_tickets"
      ? "border-info"
      : "border-error"
  }`}
>
  <span
    class="indicator-item indicator-center badge bg-black tracking-widest uppercase"
    >Tanda Nº{ticket.index + 1}</span
  >
  <div class="text-sm">
    {#if ticket.amount !== 0}
      {#if ticket.amount <= 15}
        <span
          class={`indicator-item indicator-bottom indicator-center badge rounded-none font-semibold tracking-widest uppercase ${
            ticket.type === "firsts_tickets"
              ? "badge-success"
              : ticket?.type === "seconds_tickets"
              ? "badge-info"
              : "badge-error"
          }`}
        >
          {ticket.amount > 1 ? `Últimas ${ticket.amount}` : "Última"}
        </span>
      {/if}
      <div class="text-center">
        <span class="text-sm line-through text-error"
          >{dicountPercentage ? `$${priceBeforeDiscount}` : ""}</span
        >
        <span class="text-lg text-primary">{formatedPrice || 0}</span>
      </div>
    {:else}
      <span
        class="indicator-item indicator-bottom indicator-center badge badge-success rounded-none tracking-widest uppercase"
        >Agotada</span
      >
      <p class="text-lg">{formatedPrice || 0}</p>
    {/if}
  </div>
</div>
