<script lang="ts">
  import { enhance } from "$app/forms";
  import { onDestroy, onMount } from "svelte";
  import { TicketX, TicketCheck } from "lucide-svelte";
  import type { Event } from "$lib/types";
  import {
    calculatePrice,
    calculateTotalQuantity,
    calculateUbicationPrice,
  } from "$lib/utils/eventUtils";
  import Loading from "../Loading.svelte";
  import { fly, slide } from "svelte/transition";
  export let ticket: any;
  export let sellSystem: any;
  export let disclaimerEvent: any;
  export let discountResponse: any = null;
  export let discountCodeExist: any;

  $: discountResponse, (isLoading = false);
  $: discountResponse, handleChange();

  let isLoading = false;
  let isSubmitting = false;
  let haveDiscount = false;
  let priceBeforeDiscount = 0;

  // ringside or general
  $: selectedTicketsType = "ringside_tickets";
  $: selectedTicketsQuantity = 1;

  $: selectedTicketsTotalPrice = 0;

  // options for select
  $: selectedTicketsTotalQuantity = calculateTotalQuantity(ticket);
  $: options = Array.from(
    { length: Math.min(selectedTicketsTotalQuantity, 10) },
    (_, i) => i + 1
  );

  function applyDiscount(total: number, percentage: number) {
    return total - total * (percentage / 100);
  }

  const handleChange = () => {
    if (sellSystem === "ubication") {
      if (selectedTicketsType === "ringside_tickets") {
        selectedTicketsTotalPrice =
          selectedTicketsQuantity * ticket?.ringside_tickets?.price;
        // Si existe un descuento se aplica
        if (discountResponse?.success) {
          priceBeforeDiscount = selectedTicketsTotalPrice;
          selectedTicketsTotalPrice = applyDiscount(
            selectedTicketsTotalPrice,
            discountResponse?.percentage
          );
        }
      } else if (selectedTicketsType === "general_tickets") {
        selectedTicketsTotalPrice =
          selectedTicketsQuantity * ticket.general_tickets.price;
        if (discountResponse?.success) {
          priceBeforeDiscount = selectedTicketsTotalPrice;
          selectedTicketsTotalPrice = applyDiscount(
            selectedTicketsTotalPrice,
            discountResponse?.percentage
          );
        }
      }
    } else {
      let obj = calculatePrice(selectedTicketsQuantity, ticket);
      selectedTicketsTotalPrice = obj.totalCost;

      // Si existe un descuento se aplica
      if (discountResponse?.success) {
        priceBeforeDiscount = obj.totalCost;
        selectedTicketsTotalPrice = applyDiscount(
          selectedTicketsTotalPrice,
          discountResponse?.percentage
        );
      }
    }
  };

  onMount(() => {
    handleChange();
  });

  function toggleDiscount() {
    haveDiscount = !haveDiscount;
  }

  // Reactive statement to identify ticket type with amount 0
  $: ticketsWithZeroAmount = {
    ringside: ticket?.ringside_tickets?.amount === 0,
    general: ticket?.general_tickets?.amount === 0,
  };

  // Function to disable checkbox based on ticket type with amount 0
  function isCheckboxDisabled(ticketType: keyof typeof ticketsWithZeroAmount) {
    return ticketsWithZeroAmount[ticketType];
  }

  $: {
    if (ticketsWithZeroAmount.ringside && !ticketsWithZeroAmount.general) {
      selectedTicketsType = 'general_tickets';
    } else if (ticketsWithZeroAmount.general && !ticketsWithZeroAmount.ringside) {
      selectedTicketsType = 'ringside_tickets';
    }
  }

  onDestroy(() => {
    selectedTicketsType = "ringside_tickets";
    selectedTicketsQuantity = 1;
    selectedTicketsTotalPrice = 0;
    isLoading = false;
    isSubmitting = false;
    haveDiscount = false;
    priceBeforeDiscount = 0;
  });
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
    <form
      action={`?/${sellSystem}`}
      method="POST"
      use:enhance
      class="space-y-4"
      on:submit={() => {
        isSubmitting = true;
      }}
    >
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
          required
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
          disabled={isLoading}
          name="tickets"
          id="tickets"
          required
          class="select select-bordered w-full outline-none ring-0"
          on:change={() => handleChange()}
        >
          {#each options as option (option)}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </div>
      {#if sellSystem === "ubication"}
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
                disabled={isCheckboxDisabled("ringside") || isLoading}
                bind:group={selectedTicketsType}
                checked={selectedTicketsType === "ringside_tickets"}
                on:click={() => {
                  selectedTicketsType = "ringside_tickets";
                  handleChange();
                }}
              />
              <span class="label-text">RINGSIDE </span>
            </label>

            <label
              class="label cursor-pointer flex justify-start gap-4"
              for="general_tickets"
            >
              <input
                disabled={isCheckboxDisabled("general") || isLoading}
                bind:group={selectedTicketsType}
                type="radio"
                id="general_tickets"
                name="general_tickets"
                value="general_tickets"
                class="radio radio-primary"
                checked={selectedTicketsType === "general_tickets"}
                on:click={() => {
                  selectedTicketsType = "general_tickets";
                  handleChange();
                }}
              />
              <span class="label-text">GENERAL </span>
            </label>
          </div>
        </div>
      {/if}
      <input
        type="hidden"
        name="totalPrice"
        bind:value={selectedTicketsTotalPrice}
      />
      <input
        type="hidden"
        name="ticketsType"
        id="ticketsType"
        bind:value={selectedTicketsType}
      />

      {#if discountCodeExist && !discountResponse?.success}
        <div class="form-control" out:slide>
          <label class="cursor-pointer label flex justify-start gap-2">
            <input
              disabled={isLoading}
              type="checkbox"
              class="checkbox checkbox-warning"
              on:click={toggleDiscount}
            />
            <span class="label-text">¿Tienes un código de descuento?</span>
          </label>
        </div>
        {#if isLoading}
          <div class="flex gap-2" in:fly={{ y: 20 }} out:slide>
            <Loading /> Validando código...
          </div>
        {:else if haveDiscount}
          <form
            action="?/validate"
            method="POST"
            in:fly={{ y: 20 }}
            out:slide
            use:enhance
            on:submit={() => {
              isLoading = true;
              handleChange();
            }}
          >
            <div class="form-control w-full">
              <label class="label" for="discount">
                <span class="label-text">¡Amig@ dale!, agrega tú código</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  class="input input-bordered w-full"
                />
                <button class="btn btn-outline btn-primary hover:text-black"
                  >Validar</button
                >
              </div>
              {#if !discountResponse?.success && discountResponse?.success !== undefined}
                <p
                  class="text-error mt-2 flex gap-2
                "
                >
                  <TicketX />
                  {discountResponse?.message}
                </p>
              {/if}
            </div>
          </form>
        {/if}
      {/if}

      {#if discountResponse?.success}
        <p class="mt-2 text-success flex gap-2" in:fly={{ y: 20 }}>
          <TicketCheck />
          {discountResponse?.message}
        </p>
      {/if}

      <!-- Envio el codigo al servidor -->
      {#if discountResponse?.success}
        <input
          type="hidden"
          name="discountCode"
          id="discountCode"
          value={discountResponse?.code}
        />
      {/if}

      <div class="divider divider-neutral text-white">Total</div>

      <p class="text-center">
        <span class="line-through text-error" in:fly={{ y: 20 }}
          >{priceBeforeDiscount
            ? new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(priceBeforeDiscount)
            : ""}</span
        >
        <span class="text-2xl text-primary"
          >{new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(selectedTicketsTotalPrice)}</span
        >
      </p>

      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        class="flex grow w-full items-center rounded-none btn btn-primary cursor-pointer text-black no-underline col-span-2"
      >
      {#if isSubmitting}
        <Loading /> Comprando...
      {:else}
        Comprar
      {/if}
      </button>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
