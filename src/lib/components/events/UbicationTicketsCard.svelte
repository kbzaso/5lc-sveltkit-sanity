<script lang="ts">
  interface Ticket {
    index: number;
    amount: number;
    price: number;
    type: string;
    name: string;
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

<!-- <div
  class:opacity-25={ticket.amount === 0}
  class={`w-full border p-2 indicator flex flex-col justify-center items-center pt-2 max-w-sm min-h-16 ${
    ticket.type === "ringside_tickets" ? "border-success" : "border-info"
  }`}
>
  <span
    class="indicator-item indicator-center badge bg-black tracking-widest uppercase"
    >{ticket.name}</span
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
</div> -->

<div class:opacity-30={ticket.amount === 0} class="w-full">
  <div class="relative bg-white p-6 text-black h-full" >

    <div
        class="absolute inset-0 opacity-90"
        style="background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crumpled-paper-KLaPwXItbh5Sj09tzbCcSbD7qsWJBN.webp'); background-size: cover; background-position: center; mix-blend-mode: multiply;"
      ></div>

    <!-- Notches -->
    <div class="absolute left-0 top-16 w-4 h-4 bg-black" />
    <div class="absolute right-0 top-16 w-4 h-4 bg-black" />

    <h2 class="text-3xl font-ibm italic mb-2 text-center pb-2">{ticket.name}</h2>
    <div class="w-full border border-black/30 border-b-0 border-dashed"></div>
    <div class="flex justify-center gap-4 items-center mt-4">
      {#if dicountPercentage}
      <p class="text-2xl font-bold text-center line-through opacity-50">
        {dicountPercentage ? `$${priceBeforeDiscount}` : ""}
      </p>
      {/if}
      <p class="text-3xl text-center">{formatedPrice || 0}</p>
    </div>
    {#if ticket.amount <= 15}
    <p
      class={`mt-2 font-semibold tracking-widest uppercase text-sm text-center`}
    >
      {ticket.amount > 1
        ? `Últimas ${ticket.amount} entradas`
        : "Agotado"}
    </p>
    {/if}
  </div>
</div>
