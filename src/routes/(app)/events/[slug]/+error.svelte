<script>
  import { page } from "$app/stores";
  import Error from "$lib/components/Error.svelte";

  let { status, error } = $page;
  let gif = 'https://media3.giphy.com/media/3o75269cVD7heeSOgE/giphy.gif?cid=6c09b952d8d16da9f1d32eaf4ed40ecd7dd89347a8da1b2b&rid=giphy.gif&ct=g'
</script>

<svelte:head>
  <title>Tenemos un problema</title>
</svelte:head>

<Error {status} {error} {gif}/>
