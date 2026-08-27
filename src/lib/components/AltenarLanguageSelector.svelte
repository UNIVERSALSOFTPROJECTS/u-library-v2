<script>
  export let iframeId = "sportbook-iframe";

  let selectedCulture = "es-ES";

  const cultures = [
    { value: "es-ES", label: "ES" },
    { value: "pt-BR", label: "PT-BR" },
  ];

  function changeCulture(event) {
    selectedCulture = event.target.value;
    const iframe = document.getElementById(iframeId);
    let targetOrigin = "*";

    try {
      targetOrigin = new URL(iframe?.src).origin;
    } catch (error) {
      targetOrigin = "*";
    }

    iframe?.contentWindow?.postMessage(
      {
        type: "ALTENAR_SET_CULTURE",
        culture: selectedCulture,
      },
      targetOrigin
    );
  }
</script>

<div class="altenar-language-selector">
  <select aria-label="Idioma sportsbook" bind:value={selectedCulture} on:change={changeCulture}>
    {#each cultures as culture}
      <option value={culture.value}>{culture.label}</option>
    {/each}
  </select>
</div>

<style>
  .altenar-language-selector {
    position: absolute;
    top: 10px;
    right: 12px;
    z-index: 5;
  }

  .altenar-language-selector select {
    min-width: 74px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 6px;
    background: rgba(20, 20, 20, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 0 8px;
  }
</style>
