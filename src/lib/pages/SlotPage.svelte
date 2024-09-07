<script>
    import ServerConnection from "../../js/server";
    import DropdownSearch from "../dropdown/DropdownSearch.svelte";

    export let t;

    let dataAllGames = [];
    let dataProviders = [];
    let dataGamesTypeSlot = [
        //default
        { "code": "ALL" },
        // { "code": "FAV" },
        { "code": "POP" },
        { "code": "NEW" },
        { "code": "RULE" },
        { "code": "TABL"},
        { "code": "DROP"},
        { "code": "MEGAW"},
        { "code": "CLAS"}
    ]

    const getAllGames = async () => {
        const resp = await ServerConnection.game.getGameList("slot");//OJO que cuando este logueado debe traer el user.currency!!!
        dataAllGames = resp.data;
    }
    
    const getGamesTypeSlot = async () => {
        const resp = await ServerConnection.game.getGamesTypeSlot();
        dataGamesTypeSlot = resp.data.tipos.filter(o => !o.code.includes("FAST"));
        // dataGamesTypeSlot.push({ "code": "FAV" });
        //AQUI AGREGAR LA LISTA DE FAVORITOS!!! OBVIO PRIMERO TRAER ESA CONSULTA XD
    }

    const getProviders = async () => {
        const resp = await ServerConnection.game.getBrandList("slot");
        dataProviders = resp.data.filter((e) => e.name != "Proveedores");
        dataProviders.sort();
    }


    
   getAllGames();
   getGamesTypeSlot();
   getProviders();

   const onSelectBrand = async (brand) => {
    console.log("proveedor elegido",brand);
   }



</script>

<div class="filters">
   <form><input type="search" class="ipt" placeholder={t("gameOptions.search")} autocomplete="off"></form>
    <!-- <div class="slot__filters--sub"> -->
        <!-- <button class="slc">{t("gameOptions.menuGames")}</button> -->
       
    <!-- </div> -->
    <div class="filters--menu">
        {#each dataGamesTypeSlot as type}
            <!-- <button class="btn">{t(`gameOptions.${type.code}`)} ({type.total || 0})</button> -->
            <button class="btn">{t(`gameOptions.${type.code}`)}</button>
        {/each}
    </div>

    <DropdownSearch bind:dataSearched={dataProviders} {onSelectBrand} {t}/>

    <!-- <button class="slc">{t("gameOptions.selectProviders")}</button> -->
    <!-- <button class="btn" type="button">{t("gameOptions.favorites")}</button> -->
</div>




<div class="listGame">
    {#if dataAllGames.length == 0}
        <div>CARGANDO----</div>
    {/if}
    {#each dataAllGames as game}
        <div class="listGame__game">
            <div>
                img
            </div>
            <div class="listGame__bottom">
                <p>{game.name}</p>
                <div>icon</div>
            </div>
        </div>
    {/each}
</div>