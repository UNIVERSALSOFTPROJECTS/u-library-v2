<script>
    // Props
    export let contentSliders; // Array de objetos: [{name, ref}, ...]
    export let onOpenProviders; // Función para abrir proveedores
    export let active_view; // Función para abrir categorías
    export let onOpenGame; // Función para abrir juegos
    export let t;

    // Función para obtener la ruta de la imagen según el tipo
    function getImagePath(item) {
        switch(item.ref) {
            case 'provider':
                return `https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/providers/top/${item.name}.webp`;
            case 'category':
                // Ajusta la ruta según tu estructura de assets
                return `https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/category/top/${item.name}.webp`;
            case 'game':
                // Ajusta la ruta según tu estructura de assets
                return `https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/games/top/${item.name}.webp`;
            default:
                return '';
        }
    }

    // Función para manejar el click según el tipo
    function handleClick(item) {
        switch(item.ref) {
            case 'provider':
                return () => onOpenProviders({name: item.name, code: item.name});
            case 'category':
                return () => active_view = item.name;
            case 'game':
                return () => onOpenGame(item.name);
            default:
                return () => {};
        }
    }

</script>

<div class="providerlist">
    <div class="providerlist__provider">
        {#each contentSliders as item}
            <button 
                class="providerlist__slide" 
                on:click={handleClick(item)}
            >
                <img 
                    class="providerlist__img" 
                    src={getImagePath(item)}    
                    alt="{item.ref}-{item.name}"
                >
                <div class="providerlist__parallax">
                    <div class="providerlist__playnow">
                       {t("provider.playNow")}
                    </div>
                </div>
            </button>
        {/each}
    </div>
</div>