<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import type { Event } from "$lib/types";
  import { calculatePrice } from "$lib/utils/eventUtils";


  export let nextEvent: Event;
  export let disclaimerEvent: any;

  $: selectedPaymentMethod = "etpay";

  $: formAction = selectedPaymentMethod === "etpay" ? "?/etpay" : "?/payku";

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
    <form action={formAction} method="POST" use:enhance class="space-y-4">
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
        </label>
        <select
          bind:value={selectedTickets}
          name="tickets"
          id="tickets"
          required
          class="select select-bordered w-full outline-none ring-0"
          on:change={() => hangleChange()}
        >
          {#each Array(optionsCount)
            .fill()
            .map((_, i) => i + 1) as ticket}
            <option value={ticket}>{ticket}</option>
          {/each}
        </select>
      </div>
      <div>
        <span class="label-text">Método de pago</span>
        <div class="flex flex-col lg:flex-row justify-center">
          <div class={`form-control border  w-full  px-4 py-1 ${selectedPaymentMethod === "etpay" ? "border-primary" : "border-zinc-700"} tooltip tooltip-primary`} data-tip="Transferencia electrónica">
            <label class="label cursor-pointer flex justify-start gap-4" for="etpay">
              <input
                type="radio"
                id="etpay"
                name="etpay"
                value="etpay"
                class="radio radio-primary"
                checked={selectedPaymentMethod === "etpay"}
                on:click={() => (selectedPaymentMethod = "etpay")}
              />
              <span class="label-text">
                  <svg
                    width="85"
                    height="40"
                    viewBox="0 0 208 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.5"
                      y="1.5"
                      width="204.99"
                      height="84.4594"
                      rx="7.10932"
                      fill="white"
                    />
                    <g clip-path="url(#clip0_512_294)">
                      <path
                        d="M96.4285 45.6078H79.5091C79.8345 50.1619 81.7867 51.9447 86.0361 51.9447C89.2052 51.9447 90.5751 51.1469 91.6162 48.4242L95.9665 50.0197C94.3591 53.9634 90.6239 55.8334 85.9873 55.8334C79.0829 55.8334 74.5992 51.2342 74.5992 44.1447C74.5992 37.0552 79.2358 32.3623 85.7628 32.3623C92.0978 32.3623 96.5001 36.729 96.5001 43.6279C96.4773 44.3385 96.4773 44.7164 96.4285 45.6078ZM79.5482 42.0873H91.652C91.4633 37.769 89.6998 36.125 85.7953 36.125C82.0047 36.125 79.9711 38.0016 79.5482 42.0873Z"
                        fill="#140F33"
                      />
                      <path
                        d="M105.887 37.1099V51.0983H112.069V55.3714H107.355C103.571 55.3714 101.065 52.8844 101.065 49.1281V37.1099H96.2887V32.8401H101.065V25.938H105.887V32.8401H112.792V37.1099H105.887Z"
                        fill="#140F33"
                      />
                      <path
                        d="M138.424 44.1091C138.424 51.1501 134.357 55.843 127.83 55.843C124 55.843 121.163 53.9051 119.601 50.6333V63.3556H114.779V32.8402H119.601V37.6268C121.163 34.2936 124.094 32.3687 127.973 32.3687C134.402 32.3687 138.424 37.0648 138.424 44.1091ZM133.543 44.1091C133.543 39.0867 131.266 36.7386 126.496 36.7386C121.726 36.7386 119.403 39.0867 119.403 44.1091C119.403 49.1314 121.68 51.4795 126.496 51.4795C131.311 51.4795 133.553 49.1282 133.553 44.1091H133.543Z"
                        fill="#140F33"
                      />
                      <path
                        d="M159.94 40.5366V55.3711H155.164V50.3488C153.934 54.0082 151.146 55.8395 147.218 55.8395C142.631 55.8395 139.793 53.4946 139.793 49.551C139.793 44.7063 144.147 42.3679 151.761 42.3679H155.164V40.585C155.164 37.7686 153.602 36.4056 150.339 36.4056C147.456 36.4056 145.234 37.9075 145.279 41.5733L140.695 40.6335C140.789 35.6595 144.619 32.3716 150.436 32.3716C156.439 32.3684 159.94 35.3882 159.94 40.5366ZM155.164 45.4201H151.995C147.739 45.4201 144.713 46.6862 144.713 49.2216C144.713 51.0981 146.037 52.2737 148.686 52.2737C152.138 52.2737 155.164 49.9741 155.164 45.4201Z"
                        fill="#140F33"
                      />
                      <path
                        d="M184.107 32.8403L173.893 58.5626C172.52 61.9895 170.724 63.3525 166.562 63.3525H161.682V59.0794H169.93L170.213 58.1395L170.119 58.2332L160.237 32.8403H165.57L170.486 47.0516L172.097 52.3097L173.799 47.016L178.764 32.8403H184.107Z"
                        fill="#140F33"
                      />
                      <path
                        d="M43.6296 24C40.757 23.997 37.9188 24.6206 35.3157 25.8266C32.7126 27.0325 30.4082 28.7915 28.5654 30.979C26.7227 33.1665 25.3866 35.7292 24.6516 38.4859C23.9167 41.2425 23.8008 44.1258 24.3122 46.9318H62.947C63.1508 45.7963 63.2542 44.6453 63.2561 43.492C63.257 40.9328 62.75 38.3986 61.7641 36.034C60.7782 33.6693 59.3327 31.5207 57.5102 29.7106C55.6876 27.9006 53.5238 26.4646 51.1421 25.4848C48.7605 24.505 46.2077 24.0004 43.6296 24V24ZM31.285 40.1491C32.0233 37.4612 33.6317 35.0889 35.8621 33.3977C38.0925 31.7066 40.8213 30.7904 43.628 30.7904C46.4347 30.7904 49.1635 31.7066 51.3939 33.3977C53.6244 35.0889 55.2327 37.4612 55.971 40.1491H31.285Z"
                        fill="#72DBAA"
                      />
                      <path
                        d="M47.1373 55.6972L47.0299 55.723C46.8086 55.7844 46.5874 55.8393 46.3596 55.8877L46.2555 55.9103C45.9952 55.9652 45.7349 56.0105 45.4681 56.0492L45.2794 56.0718C45.0776 56.1009 44.8727 56.1203 44.6644 56.1364L44.4302 56.1558C44.1731 56.172 43.9161 56.1816 43.6558 56.1816H43.6265C43.3499 56.1816 43.0766 56.1816 42.8033 56.1526H42.6439C42.3868 56.1332 42.133 56.1041 41.8825 56.0718H41.8369C38.8458 55.6522 36.1011 54.1944 34.0898 51.957L28.9912 56.4788C30.833 58.525 33.0893 60.1621 35.6124 61.2831C38.1356 62.404 40.8687 62.9835 43.633 62.9837H43.7957C44.0853 62.9837 44.3716 62.9837 44.6612 62.961C44.749 62.961 44.8336 62.961 44.9215 62.9417C45.1785 62.9255 45.4356 62.9061 45.6926 62.8803L45.8813 62.8577C46.1611 62.8254 46.441 62.7899 46.7175 62.7446L46.8444 62.722C47.1438 62.6736 47.4399 62.6219 47.7327 62.5573L47.827 62.5379C48.1296 62.4701 48.429 62.3991 48.7283 62.3215L48.8227 62.2925C49.1155 62.215 49.4084 62.1278 49.6947 62.0341L49.8216 61.9921C50.0949 61.9017 50.3682 61.808 50.635 61.7046L50.814 61.6368C51.058 61.5399 51.302 61.4398 51.5461 61.3332L51.7836 61.2266C51.9983 61.1297 52.2098 61.0296 52.4181 60.923L52.7434 60.768L53.2705 60.4838L53.6545 60.2641L54.0677 60.0122C54.2206 59.9153 54.3768 59.8184 54.5265 59.7183C54.6241 59.6569 54.7184 59.5891 54.8128 59.5245C54.9994 59.3996 55.1816 59.2704 55.3594 59.1369L55.4831 59.0433C56.4923 58.2841 57.4261 57.4307 58.2715 56.4949L53.1762 51.9732C51.5567 53.7543 49.4634 55.0452 47.1373 55.6972V55.6972Z"
                        fill="#72DBAA"
                      />
                    </g>
                    <rect
                      x="1.5"
                      y="1.5"
                      width="204.99"
                      height="84.4594"
                      rx="7.10932"
                      stroke="#72DBAA"
                      stroke-width="3"
                    />
                    <defs>
                      <clipPath id="clip0_512_294">
                        <rect
                          width="159.99"
                          height="39.4594"
                          fill="white"
                          transform="translate(24 24)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </label
            >
          </div>
          <div class={`form-control border  w-full  px-4 py-1 ${selectedPaymentMethod === "payku" ? "border-primary" : "border-zinc-700"} tooltip tooltip-primary`} data-tip="Tarjetas de debito y crédito">
            <label class="label cursor-pointer flex justify-start gap-4" for="payku">
              <input
                type="radio"
                id="payku"
                name="payku"
                value="payku"
                class="radio radio-primary"
                checked={selectedPaymentMethod === "payku"}
                on:click={() => (selectedPaymentMethod = "payku")}
              />
              <span class="label-text"
                ><img
                class="rounded-sm"
                  src="https://centrodeayuda.kastorsoftware.cl/wp-content/uploads/2022/04/%C2%BFCo%CC%81mo-activar-el-servicio-de-pago-Webpay_-1024x272.png"
                  height="38"
                  style="height: 38px;"
                  alt="D Local go logo"
                />
              </span>
            </label>
          </div>
        </div>
      </div>
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
