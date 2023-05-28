<script lang="ts">
  export let status: Number;
  export let error: any;
</script>

<main class="relative isolate min-h-screen flex items-center">
  <div class="prose mx-auto">
    <img
      src="https://res.cloudinary.com/dtj5xnlou/image/upload/v1671485780/5LC/ultimo.jpg"
      alt="Bóveda Secreta"
      class=" opacity-20 min-w-[100%] absolute inset-0 -z-10 h-full w-full object-cover object-top"
    />
    <div class="mx-auto max-w-7xl text-center items-center container px-4">
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl"
      >
        Ups! error {status} <span class="not-italic">😬</span>
      </h1>
      <p class="text-lg prose mt-2 text-white">
        Alguna caga quedo y esperamos que el espiritu de Bovedin nos ayude a
        solucionar prontamente este error, lamentamos la situación 😥
      </p>
      <div class="alert alert-error rounded-none">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{error?.message}</span>
        </div>
      </div>
      <div class="mt-10 flex justify-center">
        <a
          href="/"
          class="btn btn-primary cursor-pointer text-black no-underline"
          >Volver al home</a
        >
      </div>
    </div>
  </div>
</main>
