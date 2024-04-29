<script>
    import {assetsUrl, assetsPayments, assetsFlags, assetsFooter } from "../js/utils/assetsUtils";

    export let onCategoryChange;
    export let openChatLive;
    export let configFooter;
    export let t;

    let country = configFooter.country;
    let isChat = configFooter.isChat;
    let categoryGames = configFooter.categoryGames;
    let createdIn = configFooter.createdIn;
    let payments = configFooter.payments;
    let socials = configFooter.social;
    let email = configFooter.email;
    let platform = configFooter.platform;
    let bonus = configFooter.bonus;
    let linksChats = configFooter.linksChats;
    let activePanel = null;

    const currentYear = new Date().getFullYear();
    const slots = ["slot", "slotlive", "crash", "scratch"];
    const sports = ["sportbook", "sportbooklive", "horses", "virtual"];
    
    const categorySlot = categoryGames.filter(a => slots.includes(a));
    const categorySport = categoryGames.filter(a => sports.includes(a));

    const toggleAccordion = (panel) => { activePanel = activePanel === panel ? null : panel; };
</script>

<footer class="footer">
    <div class="footer__top">
        <button class="footer--lang">
            <img src="{assetsFlags}{country.flag}.png" alt="{country.name}-flag" loading="lazy">
            <span>{country.name}</span>
        </button>
        {#if isChat}
        <button class="footer--chat" on:click={openChatLive}>
            <i class="icon--chat"></i>
            <span>Chat en vivo</span>
        </button>
        {/if}
        {#each linksChats as linksChat}
            <a class="btn footer--chat {linksChat.name}" target="_blank" href={linksChat.url}>{linksChat.name}</a>
        {/each}
    </div>
    <div class="footer__accordion">
        {#if categorySlot.length != 0}
        <div class="accordion {activePanel === 'panel1' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel1')}>{t("categoryGame.slot")}</button>
            <div class="accordion__body">
                {#each categorySlot as category }
                    <button class="btn" on:click={onCategoryChange(`${category}`)}>{t(`categoryGame.${category}`)}</button>
                {/each}
            </div>
        </div>
        {/if}
        {#if categorySport.length != 0}            
        <div class="accordion {activePanel === 'panel2' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel2')}>{t("categoryGame.sportbook")}</button>
            <div class="accordion__body">
                {#each categorySport as category }
                    <button class="btn" on:click={onCategoryChange(`${category}`)}>{t(`categoryGame.${category}`)}</button>
                {/each}
            </div>
        </div>
        {/if}

        <div class="accordion {activePanel === 'panel3' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel3')}>{t("footer.s_p")}</button>
            <div class="accordion__body">
                <a href="{assetsUrl}{platform}/t&c.pdf" target="_blank">{t("footer.t_c")}</a>
                <a href="{assetsUrl}{platform}/p&p.pdf" target="_blank">{t("footer.p_p")}</a>
                <a href="{assetsUrl}{platform}/g&r.pdf" target="_blank">{t("footer.g_r")}</a>
                <a href="{assetsUrl}{platform}/p&a.pdf" target="_blank">{t("footer.p_a")}</a>
                <a href="{assetsUrl}{platform}/q&a.pdf" target="_blank">{t("footer.q_a")}</a>
            </div>
        </div>
        {#if bonus.length != 0}
        <div class="accordion {activePanel === 'panel4' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel4')}>{t("footer.promotions")}</button>
            <div class="accordion__body">
                {#each bonus as bono}
                <a href="{assetsUrl}{platform}/bonus_sportbook.pdf" target="_blank">{bono.name}</a>
                {/each}
            </div>
        </div>
        {/if}
    </div>

    <div class="footer__container">
        <div class="footer__container--sub">
            {#if payments.length != 0}
            <div class="footer__payments">
                <b>{t("footer.paymethods")}</b>
                <div class="footer__payments--imgs">
                    {#each payments as payment}
                    <img src="{assetsPayments}{payment}.png" alt="payments-{payment}" loading="lazy">
                    {/each}
                </div>
            </div>
            {:else}
            <div></div>
            {/if}
        </div>

        {#if socials.length != 0 || email}
        <div class="footer__container--sub">
            {#if socials.length != 0}
            <div class="footer__social">    
                <b>{t("footer.follow")}:</b>
                <div class="footer__social--links">
                    {#each socials as social}
                    <a href={social.url} target="_blank"><p class="footer__social--{social.name}"></p></a>
                    {/each}
                </div>
            </div>
            {/if}
            {#if email}
            <div class="footer__contact"> 
                <b>{t("footer.contanct")}: </b>
                <a href="mailto:{email}">{email}</a>
            </div>
            {/if}
        </div>
        {/if}

        <div class="footer__container--sub">
            <div class="footer__imgs">
                <img src="{assetsFooter}powered.png" alt="powered-img" loading="lazy">
                <img src="{assetsFooter}more18.png" alt="more18-img" loading="lazy">
            </div>
            <div class="footer__bottom">
                <p>{platform} {t("footer.declaration")}</p>
                <p>© {createdIn && createdIn != currentYear?`${createdIn+" - "+currentYear}`:currentYear} {platform}</p>
            </div>
        </div>
    </div>
</footer>