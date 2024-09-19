<script lang="ts">
  import { enhance } from "$app/forms";
  import { onDestroy, onMount } from "svelte";
  import { TicketX, TicketCheck, Ticket } from "lucide-svelte";
  import type { Event } from "$lib/types";
  import { disclaimerEvent } from "$lib/stores";
  import {
    calculatePrice,
    calculateTotalQuantity,
    calculateUbicationPrice,
  } from "$lib/utils/eventUtils";
  import Loading from "../Loading.svelte";
  import { fly, slide } from "svelte/transition";
  export let ticket: any;
  export let sellSystem: any;
  export let discountResponse: any = null;
  export let discountCodeExist: any;
  export let validatedDiscount: any;

  $: discountResponse, (isLoading = false);
  $: discountResponse, handleChange(validatedDiscount);

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

  const handleChange = (validatedDiscountExist?: any): void => {
    if (sellSystem === "ubication") {
      if (selectedTicketsType === "ringside_tickets") {
        selectedTicketsTotalPrice =
          selectedTicketsQuantity * ticket?.ringside_tickets?.price;
        // Si existe un descuento en la url se aplica
        if (validatedDiscountExist?.success) {
          priceBeforeDiscount = selectedTicketsTotalPrice;
          selectedTicketsTotalPrice = applyDiscount(
            selectedTicketsTotalPrice,
            validatedDiscountExist?.percentage
          );
        }
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
        // Si existe un descuento en la url se aplica
        if (validatedDiscountExist?.success) {
          priceBeforeDiscount = selectedTicketsTotalPrice;
          selectedTicketsTotalPrice = applyDiscount(
            selectedTicketsTotalPrice,
            validatedDiscountExist?.percentage
          );
        }
        if (discountResponse?.success) {
          priceBeforeDiscount = selectedTicketsTotalPrice;
          selectedTicketsTotalPrice = applyDiscount(
            selectedTicketsTotalPrice,
            discountResponse?.percentage
          );
        }
      }
    } else {
      // BATCH
      let obj = calculatePrice(selectedTicketsQuantity, ticket);
      selectedTicketsTotalPrice = obj.totalCost;

      // Si existe un descuento en la url se aplica
      if (validatedDiscountExist?.success) {
        priceBeforeDiscount = selectedTicketsTotalPrice;
        selectedTicketsTotalPrice = applyDiscount(
          selectedTicketsTotalPrice,
          validatedDiscountExist?.percentage
        );
        return;
      }

      // Si se valida un descuento se aplica
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
    handleChange(validatedDiscount);
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
      selectedTicketsType = "general_tickets";
    } else if (
      ticketsWithZeroAmount.general &&
      !ticketsWithZeroAmount.ringside
    ) {
      selectedTicketsType = "ringside_tickets";
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
  class="mt-4 btn grow w-full rounded-none btn-primary cursor-pointer text-black no-underline disabled:bg-primary disabled:text-black btn-lg"
  onclick="my_modal_5.showModal()"
>
<Ticket />
  ¡Quiero ir!</button
>
{#if !$disclaimerEvent}
  <p class="mt-2 badge badge-error w-full rounded-none">
    Debes aceptar el código de conducta
  </p>
{/if}
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle bg-black/75">
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
          <span class="label-text text-primary">¿Cuál es tu nombre?</span>
        </label>
        <input
          type="name"
          name="name"
          id="name"
          required
          placeholder="Pimpinela Escarlata..."
          class="input input-bordered w-full input-primary input-lg"
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="rut">
          <span class="label-text text-primary">¿Cuál es tu RUT?</span>
        </label>
        <input
          id="rut"
          name="rut"
          required
          placeholder="12345678-9"
          class="input input-bordered w-full input-primary input-lg"
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="email">
          <span class="label-text text-primary">¿Cuál es tu correo?</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="micorreo@correo.cl"
          class="input input-bordered w-full input-primary input-lg"
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="phone">
          <span class="label-text text-primary">¿Cuál es tu teléfono?</span>
        </label>
        <input
          type="tel"
          placeholder="+56 9 1234 5678"
          id="phone"
          name="phone"
          class="input input-bordered w-full input-primary input-lg"
        />
      </div>
      <div class="form-control w-full">
        <label class="label" for="tickets">
          <span class="label-text text-primary">¿Cuántas entradas?</span>
        </label>
        <select
          bind:value={selectedTicketsQuantity}
          disabled={isLoading}
          name="tickets"
          id="tickets"
          required
          class="select select-bordered w-full outline-none ring-0 select-primary select-lg"
          on:change={() => handleChange(validatedDiscount)}
        >
          {#each options as option (option)}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </div>
      {#if sellSystem === "ubication"}
        <div>
          <span class="label-text text-primary">Ubicación</span>
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
                  handleChange(validatedDiscount);
                }}
              />
              <span
                class="label-text"
                class:line-through={isCheckboxDisabled("ringside")}
                >RINGSIDE
              </span>
              {#if isCheckboxDisabled("ringside")}
                <div class="badge badge-error">Agotado</div>
              {/if}
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
                  handleChange(validatedDiscount);
                }}
              />
              <span
                class="label-text"
                class:line-through={isCheckboxDisabled("general")}
                >GENERAL
              </span>
              {#if isCheckboxDisabled("general")}
                <div class="badge badge-error">Agotado</div>
              {/if}
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

      {#if discountCodeExist && !discountResponse?.success && !validatedDiscount.success}
        <div class="form-control" out:slide>
          <label class="cursor-pointer label flex justify-start gap-2">
            <input
              disabled={isLoading}
              type="checkbox"
              class="checkbox checkbox-primary"
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
                  class="input input-bordered w-full input-primary"
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
                  <TicketX class="min-w-6" />
                  {discountResponse?.message}
                </p>
              {/if}
            </div>
          </form>
        {/if}
      {/if}

      {#if discountResponse?.success}
        <p class="mt-2 text-success flex gap-2" in:fly={{ y: 20 }}>
          {discountResponse?.message}
        </p>
      {/if}

      <!-- Envio el codigo al servidor -->
      {#if discountResponse?.success || validatedDiscount?.success}
        <input
          type="hidden"
          name="discountCode"
          id="discountCode"
          value={discountResponse?.code || validatedDiscount?.code}
        />
      {/if}

      {#if validatedDiscount?.success}
        <p class="mt-2 text-success flex gap-2" in:fly={{ y: 20 }}>
          <TicketCheck class="min-w-6" />
          {validatedDiscount?.message}
        </p>
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
        class="flex grow w-full items-center rounded-none btn btn-primary cursor-pointer text-black no-underline col-span-2 btn-lg"
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
