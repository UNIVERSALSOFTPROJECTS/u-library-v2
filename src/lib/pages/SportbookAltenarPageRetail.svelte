<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import backend from "../../js/server";

  export let url = "";
  export let user;
  export let loginModalOpen;

  const dispatch = createEventDispatcher();

  let sportbookIframeEl = null;

  function receiveMessage(event) {
    if (event.data === "onNologinBet") {
      loginModalOpen = true;
    }
  }

  onMount(() => {
    window.addEventListener("message", receiveMessage, false);
  });

  /**
   * Avisa al componente padre cuando el iframe terminó de cargar.
   */
  function onIframeLoad() {
    if (url) {
      dispatch("ready");
    }
  }

  onDestroy(async () => {
    window.removeEventListener("message", receiveMessage);

    if (user?.agregatorToken) {
      try {
        const { data } = await backend.users.getBalance(
          user.agregatorToken
        );

        user.balance = data.balance;
      } catch (error) {
        console.error("Error updating user balance:", error);
      }
    }

    document.body.style.overflow = "scroll";
  });
</script>

<div class="sportbook-content">
  {#if url}
    <iframe
      class="sportbook-iframe"
      id="sportbook-iframe"
      bind:this={sportbookIframeEl}
      title="BetsW3"
      allow="fullscreen; picture-in-picture"
      src={url}
      frameborder="0"
      on:load={onIframeLoad}
    />
  {/if}
</div>

<style>
  @media only screen and (max-width: 1199px) {
    .sportbook-content {
      width: 100%;
    }

    .sportbook-iframe {
      height: 100vh;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1200px) {
    .sportbook-content {
      width: 98.9vw;
    }

    .sportbook-iframe {
      width: 100%;
      height: 100vh;
    }
  }
</style>