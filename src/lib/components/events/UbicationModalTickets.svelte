<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import type { Event } from "$lib/types";
  import {
    calculatePrice,
    calculateUbicationPrice,
  } from "$lib/utils/eventUtils";
  export let ticket: any;
  export let disclaimerEvent: any;

  // ringside or general

  $: selectedTicketsType = "ringside_tickets";
  $: selectedTicketsQuantity = 1;

  let selectedTicketsTotalPrice = 0;

  $: formattedFinalPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(selectedTicketsTotalPrice);

  const hangleChange = () => {
    if (selectedTicketsType === "ringside_tickets") {
      selectedTicketsTotalPrice =
        selectedTicketsQuantity * ticket.ringside_tickets.price;
    } else if (selectedTicketsType === "general_tickets") {
      selectedTicketsTotalPrice =
        selectedTicketsQuantity * ticket.general_tickets.price;
    }
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
<dialog
  id="my_modal_5"
  class="modal modal-bottom sm:modal-middle bg-gray-700/75"
>
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
        >✕</button
      >
    </form>
    <form action="?/ubication" method="POST" use:enhance class="space-y-4">
      <div class="form-control w-full">
        <label class="label" for="name">
          <span class="label-text">¿Cuál es tu nombre?</span>
        </label>
        <input
          type="name"
          name="name"
          id="name"
          required
          placeholder="Escribe tú nombre"
          class="input input-bordered w-full "
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="rut">
            <span class="label-text">¿Cuál es tu RUT?</span>
          </label>
          <input
            id="rut"
            name="rut"
            class="input input-bordered w-full"
          />
      </div>
      <div class="form-control w-full">
        <label class="label" for="email">
          <span class="label-text">¿Cuál es tu correo?</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Escribe tú correo"
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="phone">
            <span class="label-text">¿Cuál es tu teléfono?</span>
          </label>
          <input
            type="tel"
            placeholder="+56 9 1234 5678"
            id="phone"
            name="phone"
            class="input input-bordered w-full"
          />
      </div>
      <div class="form-control w-full">
        <label class="label" for="tickets">
          <span class="label-text">¿Cuántas entradas?</span>
        </label>
        <select
          bind:value={selectedTicketsQuantity}
          name="tickets"
          id="tickets"
          required
          class="select select-bordered w-full outline-none ring-0"
          on:change={() => hangleChange()}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div>
        <span class="label-text">Ubicación</span>
        <div class="flex flex-col">
          <label
            class="label cursor-pointer flex justify-start gap-4"
            for="ringside_tickets"
          >
            <input
              type="radio"
              id="ringside_tickets"
              name="ringside_tickets"
              value="ringside_tickets"
              class="radio radio-primary"
              checked={selectedTicketsType === "ringside_tickets"}
              on:click={() => {
                selectedTicketsType = "ringside_tickets";
                hangleChange();
              }}
            />
            <span class="label-text"> RINGSIDE </span>
          </label>

          <label
            class="label cursor-pointer flex justify-start gap-4"
            for="general_tickets"
          >
            <input
              type="radio"
              id="general_tickets"
              name="general_tickets"
              value="general_tickets"
              class="radio radio-primary"
              checked={selectedTicketsType === "general_tickets"}
              on:click={() => {
                selectedTicketsType = "general_tickets";
                hangleChange();
              }}
            />
            <span class="label-text"> GENERAL </span>
          </label>
        </div>
      </div>
      <input
        type="hidden"
        name="totalPrice"
        bind:value={selectedTicketsTotalPrice}
      />
      <input type="hidden" name="ticketsType" id="ticketsType" bind:value={selectedTicketsType}>
      <button
        type="submit"
        class="flex grow w-full items-center rounded-none btn btn-primary cursor-pointer text-black no-underline col-span-2"
        >{formattedFinalPrice} - Comprar</button
      >
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
