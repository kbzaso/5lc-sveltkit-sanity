<script>
  import { page } from "$app/stores";
  import Error from "$lib/components/Error.svelte";

  let { status, error } = $page;

  let gif = 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/23/18/asset/buzzfeed-prod-fastlane-02/anigif_sub-buzz-2702-1490308241-1.gif'
</script>

<svelte:head>
  <title>Tenemos un problema</title>
</svelte:head>

<Error {status} {error} {gif} />
