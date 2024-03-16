<script lang="ts">
  interface Ticket {
    index: number;
    amount: number;
    price: number;
    type: string;
  }

  export let ticket: Ticket;

  let ticketPrice = ticket.price;

  let formatedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(ticketPrice);
</script>

<div
  class:opacity-25={ticket.amount === 0}
  class={`w-full border p-2 indicator flex flex-col justify-center items-center pt-2 max-w-xs min-h-16 ${
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
          🎟️ Últimas {ticket.amount || 0}
        </span>
      {/if}
      <p class="text-lg">{formatedPrice || 0}</p>
    {:else}
      <span
        class="indicator-item indicator-bottom indicator-center badge badge-success rounded-none tracking-widest uppercase"
        >Agotada</span
      >
      <p class="text-lg">{formatedPrice || 0}</p>
    {/if}
  </div>
</div>
