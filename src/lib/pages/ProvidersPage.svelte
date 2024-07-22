<script>
    import ServerConnection from "../../js/server";
    import { assetsBrands } from "../../js/utils/assetsUtils";
    import { onMount, onDestroy } from "svelte";
    import { watchResize } from "svelte-watch-resize";

    export let t;
    export let categoryGames;
    export let onOpenProviders;

    let heightDivBrands;
    let brands = [];
    let brandsSlot = [];
    let brandsSlotlive = [];
    let brandsCrash = [];
    let brandsScratch = [];
    let brandsVirtual = [];
    let brandsHorses = [{"total": 1,"code": "UniversalRace","name": "UniversalRace","isNew": 0}];
    let searchData = "";
    let viewPage = "slot";
    let loadProviders = true;
    let loadProvidersCategories = true;
    let resultsFound = [{}];
    let categoriesProviders = ["slot","slotlive","crash","scratch","virtual","horses"];
    categoriesProviders = categoryGames.filter(o => categoriesProviders.includes(o));

    const getCategoryBrands = async() =>{
        try {
            let slotlive = await ServerConnection.game.getBrandList("slot_live");
            let crash = await ServerConnection.game.getBrandList("crash");
            let scratch = await ServerConnection.game.getBrandList("scratch");
            let virtual = await ServerConnection.game.getBrandList("virtual");
            brandsSlotlive = slotlive.data.filter(o => o.name !== "Proveedores");
            brandsCrash = crash.data.filter(o => o.name !== "Proveedores");
            brandsScratch = scratch.data.filter(o => o.name !== "Proveedores");
            brandsVirtual = virtual.data.filter(o => o.name !== "Proveedores");
        } catch (error) {
            console.log(error);
        }finally{
            loadProvidersCategories = false;
        }
    }

    const getBrands = async()=>{
        try {
            let resp = await ServerConnection.game.getBrandList("slot");
            let respGames = await ServerConnection.game.getGameList("slot", "NEW", 1, "USD", 50);
            let newGames =  [... new Set ( respGames.data.map( e=>e.brand ) )];
            brands = resp.data.filter(o => o.name !== "Proveedores");
            brands = brands.map(o => { return newGames.includes(o.name)?{ ...o, isNew: 1 }:{ ...o, isNew: 0 }; });
            brandsSlot = brands;
        } catch (error) {
            console.log(error);
        } finally {
            loadProviders = false;
        }
    }

    const changeCategoryProvider = (category) =>{
        viewPage = category;

        const categoryProviders = {
            slot: brandsSlot,
            slotlive: brandsSlotlive,
            crash: brandsCrash,
            horses: brandsHorses,
            scratch: brandsScratch,
            virtual: brandsVirtual
        };

        brands = categoryProviders[category]; 
        searchProvider();
    }

    const searchProvider = () => { resultsFound = brands.filter(o => o.name.toLowerCase().includes(searchData.toLowerCase())).map(o => o); }
    const deleteImage = i => { brands = brands.filter(o => o.name != brands[i].name); }

    const resizeHeightModal = () => {
        let sizePC = visualViewport.width > 1023;
        heightDivBrands = sizePC?`max-height: 50vh`:`max-height: calc(${visualViewport.height}px - 190px)`;
     }

    onMount(() => { 
        getBrands();
        getCategoryBrands();
        window.addEventListener('resize', resizeHeightModal);
     });
    onDestroy(() => { window.removeEventListener('resize', resizeHeightModal); });
</script>
<div class="modal-body" use:watchResize={resizeHeightModal}>
    <div class="filters">
        <div class="category">
            {#each categoriesProviders as category}
            <button class="btn {viewPage == category?'active':''}" on:click={()=>changeCategoryProvider(`${category}`)} disabled={loadProvidersCategories}>
                <b>{t(`categoryGame.${category}`)}</b>
            </button>
            {/each}
        </div>
        <input type="search" class="ipt" bind:value={searchData} on:input={searchProvider} placeholder={t("gameOptions.searchProvider")}>
    </div>
    {#if loadProviders}
        <div class="loading"><p/><p/><p/></div>
    {:else}
        {#if resultsFound.length == 0}
            <div class="providers__noResults">{t("movements.noInformation")}</div>
        {:else}
            <div class="providers__brands" style={heightDivBrands}>
                {#each brands as brand, i}
                    {#if brand.name.toLowerCase().includes(searchData.toLowerCase())}
                    <button class="btn" on:click={onOpenProviders(brand,viewPage)}>
                        <img src="{assetsBrands}{brand.name}.png" on:error={()=>deleteImage(i)} alt="provider-{brand.name}" loading="lazy">
                        {#if brand.isNew}
                            <div class="providers__new">{t("gameOptions.new")}</div>
                        {/if}
                    </button>
                    {/if}
                {/each}
            </div>
        {/if}
    {/if}
</div>