<script>
    export let onCategoryChange;
    export let openChatLive;
    export let configFooter;

    let country = configFooter.country;
    let flag = configFooter.flag;
    let isChat = configFooter.isChat;
    let payments = configFooter.payments;
    let socials = configFooter.social;
    let email = configFooter.email;
    let platform = configFooter.platform;
    let bonus = configFooter.bonus;
    let linksChats = configFooter.linksChats;
    let activePanel = null;

    const toggleAccordion = (panel) => { activePanel = activePanel === panel ? null : panel; };
</script>
<footer class="footer">
    <div class="footer__top">
        <button class="footer--lang">
            <img src="https://assets.apiusoft.com/generic_imgs/flags/{flag}.png" alt="{country}-flag">
            <span>{country}</span>
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
        <div class="accordion {activePanel === 'panel1' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel1')}>Casino</button>
            <div class="accordion__body">
                <button class="btn" on:click={onCategoryChange("slot")}>Casino</button>
                <button class="btn" on:click={onCategoryChange("slotlive")}>Casino en vivo</button>
                <button class="btn" on:click={onCategoryChange("crash")}>Crash games</button>
            </div>
        </div>
        <div class="accordion {activePanel === 'panel2' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel2')}>Deportes</button>
            <div class="accordion__body">
                <button class="btn" on:click={onCategoryChange("sportbook")}>Deportes</button>
                <button class="btn" on:click={onCategoryChange("sportbooklive")}>Deportes en vivo</button>
                <button class="btn" on:click={onCategoryChange("horses")}>Hipicas</button>
                <button class="btn" on:click={onCategoryChange("virtual")}>Juegos Virtuales</button>
            </div>
        </div>
        <div class="accordion {activePanel === 'panel3' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel3')}>Seguridad y privacidad</button>
            <div class="accordion__body">
                <a href="https://assets.apiusoft.com/{platform}/t&c.pdf" target="_blank">Términos y condiciones</a>
                <a href="https://assets.apiusoft.com/{platform}/p&p.pdf" target="_blank">Políticas de privacidad</a>
                <a href="https://assets.apiusoft.com/{platform}/g&r.pdf" target="_blank">Juego responsable</a>
                <a href="https://assets.apiusoft.com/{platform}/p&a.pdf" target="_blank">Procedimiento AML</a>
                <a href="https://assets.apiusoft.com/{platform}/q&a.pdf" target="_blank">Preguntas frecuentes</a>
            </div>
        </div>
        {#if bonus.length != 0}
        <div class="accordion {activePanel === 'panel4' ? 'active' : ''}">
            <button class="accordion__select" on:click={() => toggleAccordion('panel4')}>Promociones</button>
            <div class="accordion__body">
                {#each bonus as bono}
                <a href="https://assets.apiusoft.com/{platform}/bonus_sportbook.pdf" target="_blank">{bono.name}</a>
                {/each}
            </div>
        </div>
        {/if}
    </div>

    <div class="footer__container">
        <div class="footer__container--sub">
            {#if payments.length != 0}
            <div class="footer__payments">
                <b>Métodos de pago</b>
                <div class="footer__payments--imgs">
                    {#each payments as payment}
                    <img src="https://assets.apiusoft.com/generic_imgs/payments/{payment.name}.png" alt="">
                    {/each}
                </div>
            </div>
            {/if}
        </div>
        <div class="footer__container--sub">
            {#if socials.length != 0}
            <div class="footer__social">
                <b>Síguenos en:</b>
                <div class="footer__social--links">
                    {#each socials as social}
                    <a href={social.url} target="_blank"><p class="footer__social--{social.name}"></p></a>
                    {/each}
                </div>
            </div>
            {/if}

            <div class="footer__contact"> 
                <b>Contáctanos: </b>
                <a href="mailto:{email}">{email}</a>
            </div>
        </div>
    
        <div class="footer__container--sub">
            <div class="footer__imgs">
                <img src="https://assets.apiusoft.com/generic_imgs/footer/powered.png" alt="powered-img">
                <img src="https://assets.apiusoft.com/generic_imgs/footer/more18.png" alt="more18-img">
            </div>
            <div class="footer__bottom">
                <p>{platform} está sujeto a los términos y condiciones de este sitio web. Todos los derechos reservados.</p>
                <p>© 2024 {platform}</p>
            </div>
        </div>
    </div>
</footer>