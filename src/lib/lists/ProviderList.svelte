<script>
    import { assetsProvidersTop } from "../../js/utils/assetsUtils";
    export let onOpenProviders;
    export let topProviders;
    export let t;
    // topProviders no puede ser un array, ahora debe ser un objeto con su name code y category para saber a que categoria de juego enviarte.
</script>
<div class="providerlist">
    <div class="providerlist__provider">
        {#each topProviders as provider}
            <button class="providerlist__slide" on:click={onOpenProviders({name:`${provider}`,code:`${provider}`})}>
                <img class="providerlist__img" src="{assetsProvidersTop}{provider}.webp" alt="provider-{provider}">
                <div class="providerlist__parallax">
                    <div class="providerlist__playnow">{t("provider.playNow")}</div>
                </div>
            </button>
        {/each}
    </div>
</div>

