<script>
  import { page } from "$app/stores";
  import Error from "$lib/components/Error.svelte";

  let { status, error } = $page;
</script>

<svelte:head>
  <title>Tenemos un problema</title>
</svelte:head>

<Error {status} {error} />
