<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import type { Event } from "$lib/dto/events";

  export let eventDate: Event["date"];
  export let nextEvent: Event;

  let isCheckboxChecked = false;

  $: canSubmitForm = isCheckboxChecked;

  const toggleCheckbox = () => {
    isCheckboxChecked = !isCheckboxChecked;
  };

  let selectedTickets: any;
  let remainingTickets: number;
  let optionsCount: number;

  onMount(() => {
    selectedTickets = "";
    remainingTickets = nextEvent.total_tickets - nextEvent.tickets_sold;
    optionsCount = Math.min(remainingTickets, 10);
  });
</script>

<!-- Open the modal using ID.showModal() method -->
<button
  class="btn grow w-full rounded-none btn-primary cursor-pointer text-black no-underline"
  onclick="my_modal_5.showModal()">¡Quiero ir!</button
>
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
    <h3 class="font-bold text-lg text-primary">
      Adhesión para el evento {nextEvent.title}
    </h3>
    <p class="py-4 text-gray-400 text-sm ">
      Estamos felices que quieras asistir este {eventDate}, pero primero,
      necesitamos que leas y estes de acuerdo a nuestro
      <a class="anchor" href="/conducta">código de conducta</a>.
    </p>

    <form action="?/pay" method="POST" use:enhance class="space-y-4">
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
      <!-- <input
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      id="phone"
                      name="phone"
                      class="input input-bordered input-primary w-full max-w-xs"
                    /> -->
      <div class="form-control w-full">
        <label class="label" for="tickets">
          <span class="label-text">¿Cuántas entradas?</span>
          <!-- <span class="label-text-alt">Top Right label</span> -->
        </label>
        <select
          bind:value={selectedTickets}
          name="tickets"
          id="tickets"
          required
          class="select select-bordered w-full outline-none ring-0"
        >
          {#each Array(optionsCount)
            .fill()
            .map((_, i) => i + 1) as ticket}
            <option value={ticket}>{ticket}</option>
          {/each}
        </select>
        <!-- <label class="label">
                        <span class="label-text-alt">Bottom Left label</span>
                        <span class="label-text-alt">Bottom Right label</span>
                      </label> -->
      </div>
      <div class="form-control">
        <label class="cursor-pointer label flex gap-4 justify-start" for="code">
          <input
            type="checkbox"
            bind:checked={isCheckboxChecked}
            id="code"
            class="checkbox checkbox-warning"
          />
          <span class="label-text"
            >Estoy de acuerdo con el código de conducta</span
          >
        </label>
      </div>

      <button
        on:click={toggleCheckbox}
        disabled={!canSubmitForm}
        type="submit"
        class="flex grow w-full items-center rounded-none btn btn-primary cursor-pointer text-black no-underline col-span-2"
        >Comprar</button
      >
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
