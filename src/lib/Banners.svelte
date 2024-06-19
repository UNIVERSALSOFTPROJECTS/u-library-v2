<script>
    import {register} from 'swiper/element/bundle';
    import { detectSubdomain } from "../js/utils/formatUtils";

    export let platform;
    export let onCategoryChange;

    let bannerDefault = [{"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_caballos2.png","url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_caballos.png","dateFrom": "","dateUntil": "","category":"horses"}];

    const today = (new Date());
    today.setHours(0,0,0,0);

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day);
    }

    register();

    let data = 
        [
            {
                "page": "Coliseosport",
                "banners":[
                    {
                        "country":"cl",
                        "banners":[
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_w_apuesta.png"      ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_m_apuesta.png"         ,"dateFrom": "",           "dateUntil": "",           "category":""},
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_caballos2.png"    ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_caballos.png"        ,"dateFrom": "",           "dateUntil": "",           "category":"horses"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/banner_recharge_4.png" ,"url_m":"https://assets.apiusoft.com/Coliseosport/banner_recharge_4_mb.png" ,"dateFrom": "",           "dateUntil": "",           "category":""},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/banner_sport_v2.png"   ,"url_m":"https://assets.apiusoft.com/Coliseosport/banner_sport_v2_mb.png"   ,"dateFrom": "",           "dateUntil": "",           "category":"sportbook"},
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_sportlive.png"    ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_sportlive.png"       ,"dateFrom": "",           "dateUntil": "",           "category":"sportbooklive"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/banner_cashout_2.png"  ,"url_m":"https://assets.apiusoft.com/Coliseosport/banner_cashout_2_mb.png"  ,"dateFrom": "",           "dateUntil": "",           "category":"sportbook"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_w_crash.png"        ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_m_crash.png"           ,"dateFrom": "",           "dateUntil": "",           "category":"crash"},
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_virtuales.png"    ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_virtuales.png"       ,"dateFrom": "",           "dateUntil": "",           "category":"virtual"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_w_slotlive.png"     ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_m_slotlive.png"        ,"dateFrom": "",           "dateUntil": "",           "category":"slotlive"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_m_slot.png"         ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_w_slot.png"            ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/generic_imgs/banners/prom1.png"     ,"url_m":"https://assets.apiusoft.com/generic_imgs/banners/prom1_mb.png"     ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/generic_imgs/banners/prom2.png"     ,"url_m":"https://assets.apiusoft.com/generic_imgs/banners/prom2_mb.png"     ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/w_promo_clp.png"       ,"url_m":"https://assets.apiusoft.com/Coliseosport/m_promo_clp.png"          ,"dateFrom": "30-04-2024", "dateUntil": "15-06-2024", "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/w_promo2_clp.png"      ,"url_m":"https://assets.apiusoft.com/Coliseosport/m_promo2_clp.png"         ,"dateFrom": "05-06-2024", "dateUntil": "04-09-2024", "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/w_promo3_clp.png"      ,"url_m":"https://assets.apiusoft.com/Coliseosport/m_promo3_clp.png"         ,"dateFrom": "05-06-2024", "dateUntil": "04-09-2024", "category":"crash"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/w_promo4_clp.png"      ,"url_m":"https://assets.apiusoft.com/Coliseosport/m_promo4_clp.png"         ,"dateFrom": "05-06-2024", "dateUntil": "04-09-2024", "category":"slotlive"}
                        ]  
                    },
                    {
                        "country":"co",
                        "banners":[]
                    },
                    {
                        "country":"ec",
                        "banners":[]
                    },
                ]
            },
            {
                "page": "Babieca",
                "banners":[
                    {
                        "country":"co",
                        "banners":[
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_caballos2.png"               ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_caballos.png"        ,"dateFrom": "",           "dateUntil": "",           "category":"horses"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/banners/co/banner_sport_v2.png"   ,"url_m":"https://assets.apiusoft.com/Coliseosport/banners/co/m_imnagen.png"   ,"dateFrom": "",           "dateUntil": "",           "category":"sportbook"},
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_sportlive.png"               ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_sportlive.png"       ,"dateFrom": "",           "dateUntil": "",           "category":"sportbooklive"},
                            {"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_virtuales.png"               ,"url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_virtuales.png"       ,"dateFrom": "",           "dateUntil": "",           "category":"virtual"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_w_slotlive.png"                ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_m_slotlive.png"        ,"dateFrom": "",           "dateUntil": "",           "category":"slotlive"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_w_crash.png"                   ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_m_crash.png"           ,"dateFrom": "",           "dateUntil": "",           "category":"crash"},
                            {"url_w":"https://assets.apiusoft.com/Coliseosport/bn_m_slot.png"                    ,"url_m":"https://assets.apiusoft.com/Coliseosport/bn_w_slot.png"            ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/generic_imgs/banners/prom1.png"                ,"url_m":"https://assets.apiusoft.com/generic_imgs/banners/prom1_mb.png"     ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                            {"url_w":"https://assets.apiusoft.com/generic_imgs/banners/prom2.png"                ,"url_m":"https://assets.apiusoft.com/generic_imgs/banners/prom2_mb.png"     ,"dateFrom": "",           "dateUntil": "",           "category":"slot"},
                        ]  
                    }
                ]
            },
        ];


        let subdomain = detectSubdomain() == ""?"www":detectSubdomain();

        //let subdomain = "cl";

        console.log(data);
        let detectPage = data.filter((e) => e.page == platform)[0];
        let allBanners = detectPage.banners.filter((d) => d.country == subdomain)[0].banners;

        let filteredBanners = allBanners.filter( o => {
            const dateFrom = parseDate(o.dateFrom) || "";
            const dateUntil = parseDate(o.dateUntil) || "";
            return !(dateFrom < today && dateUntil < today);
        });

        if (filteredBanners.length == 0) { filteredBanners = bannerDefault; }

        console.log(filteredBanners);
</script>

<div>
    <swiper-container class="swiper-container__banners" speed={1500} autoplay-delay={10000} loop={true}>
        {#each filteredBanners as banner}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <swiper-slide>
                <picture on:click={()=>onCategoryChange(banner.category)}>
                    <source media="(max-width: 1023px)" srcset={banner.url_m}>
                    <img src={banner.url_w} alt="banner" loading="lazy">
                </picture>
            </swiper-slide>
        {/each}
    </swiper-container>
</div>

<style>
    .swiper-container__banners{
        width: 100%;
        height:100%;
        overflow: hidden;
    }
    .swiper-container__banners::after{
        content: "";
        position: absolute;
        height: 0;
        width: 100%;
        bottom: 62px;
        z-index: 1;
    }
    swiper-slide img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>