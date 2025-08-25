<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let updateBalance;
   
    export let options_launch;

    let loadTvbetFrame = true;
    let isFullscreen = false;
    let viewTvbetFrame = true;
    let heightModal;
    let tvbetFrameContainer;
    let tvbetFrameInstance;
    let styleEnforcementInterval;
   
    let tv_language;
    let tv_clientId;
    let tv_token;
    let tv_server;
    let tv_gameId;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadTvbetFrame = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    function receiveMessage(event) {
        console.log("Received message from origin:", event.origin);
        if (event.data === "luckyspins_exit_game" || event.data === "adm_exit_game") {
            closeModal();
        } else {
            console.log("Unknown message received:", event.data);
        }
    }


    const closeModal = () => { 
        console.log("Closing modal");
        try {
            updateBalance();
            console.log("Balance updated");
            if (document.fullscreenElement != null) {
                console.log("Exiting fullscreen");
                toggleFullscreen();
            }
            open = false;
            console.log("Modal closed");
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    };

 

    const reloadTvbetFrame = () => { 
        console.log('Reloading TvbetFrame...');
        viewTvbetFrame = false;
        loadTvbetFrame = true;
        
        // Limpiar el intervalo si existe
        if (styleEnforcementInterval) {
            clearInterval(styleEnforcementInterval);
            styleEnforcementInterval = null;
        }
        
        if (tvbetFrameContainer) {
            // Destruir la instancia actual y limpiar completamente el contenedor
            tvbetFrameContainer.innerHTML = '';
        }
        
        if (tvbetFrameInstance) {
            tvbetFrameInstance = null;
        }
        
        setTimeout(() => { 
            viewTvbetFrame = true;
            setTimeout(() => {
                initTvbetFrame();
            }, 100);
        }, 100);
    }
   
    const toggleFullscreen = () => {
       setTimeout(() => { resizeHeightModal(); }, 100);
        if (!isFullscreen) {
            const e = document.body;
            if (e.requestFullscreen) e.requestFullscreen();
            // @ts-ignore
            else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
            // @ts-ignore
            else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
            // @ts-ignore
            else if (e.msRequestFullscreen) e.msRequestFullscreen();
            isFullscreen = true;
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            // @ts-ignore
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            // @ts-ignore
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            // @ts-ignore
            else if (document.msExitFullscreen) document.msExitFullscreen();
            isFullscreen = false;
        }
    }

    function handleMessage(event) {
        // Manejar mensajes de TvbetFrame si es necesario
        const { event: messageEvent } = event.data;

        if (messageEvent === 'exit') {
            console.log('[TvbetFrame message] Evento recibido: exit');
            closeModal();
        } else if (messageEvent === 'reload') {
            console.log('[TvbetFrame message] Evento recibido: reload');
        } else {
            console.log('[TvbetFrame message] Evento desconocido:', messageEvent);
        }
    }

    function initTvbetFrame() {
        // @ts-ignore
        if (tvbetFrameContainer && window.TvbetFrame) {
            loadTvbetFrame = true;
            
            // Limpiar contenedor antes de inicializar
            tvbetFrameContainer.innerHTML = '';
            
            // Interceptar la creación de iframes para forzar que se creen en nuestro contenedor
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
                const element = originalCreateElement.call(document, tagName);
                
                if (tagName.toLowerCase() === 'iframe') {
                    console.log('Iframe being created, will move to container');
                    // Agregar el iframe al contenedor después de un breve delay
                    setTimeout(() => {
                        if (!tvbetFrameContainer.contains(element) && element.parentNode) {
                            console.log('Moving iframe to tvbet container');
                            tvbetFrameContainer.appendChild(element);
                            applyIframeStyles(element);
                        }
                    }, 100);
                }
                
                return element;
            };
            
            // Función para aplicar estilos específicos al iframe
            const applyIframeStyles = (iframe) => {
                iframe.style.cssText = `
                    width: 100% !important;
                    height: 100% !important;
                    border: none !important;
                    position: relative !important;
                    z-index: 1 !important;
                    max-width: 100% !important;
                    max-height: 100% !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: auto !important;
                    bottom: auto !important;
                    transform: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                `;
            };
            
            // Verificar si TvbetFrame acepta un parámetro container
            try {
                // @ts-ignore
                tvbetFrameInstance = new window.TvbetFrame({
                    lng: tv_language,
                    clientId: tv_clientId,
                    tokenAuth: tv_token,
                    server: tv_server,
                    singleGame: tv_gameId,
                    container: '#tvbet-game-container', // Intentar usar el ID
                    containerId: 'tvbet-game-container',
                    target: tvbetFrameContainer,
                    element: tvbetFrameContainer,
                    parent: tvbetFrameContainer
                });
            } catch (e) {
                try {
                    // @ts-ignore
                    tvbetFrameInstance = new window.TvbetFrame({
                        lng: tv_language,
                        clientId: tv_clientId,
                        tokenAuth: tv_token,
                        server: tv_server,
                        singleGame: tv_gameId,
                        container: tvbetFrameContainer
                    });
                } catch (e2) {
                    // Si falla, intentar sin contenedor específico
                    // @ts-ignore
                    tvbetFrameInstance = new window.TvbetFrame({
                        lng: tv_language,
                        clientId: tv_clientId,
                        tokenAuth: tv_token,
                        server: tv_server,
                        singleGame: tv_gameId
                    });
                }
            }
            
            // Restaurar createElement después de un tiempo
            setTimeout(() => {
                document.createElement = originalCreateElement;
            }, 5000);
            
            // Función para mover cualquier iframe creado al contenedor correcto
            const moveIframesToContainer = () => {
                // Buscar iframes que puedan haber sido creados fuera del contenedor
                const allIframes = document.querySelectorAll('iframe');
                let moved = false;
                
                allIframes.forEach(iframe => {
                    // Si el iframe no está dentro de nuestro contenedor, moverlo
                    if (!tvbetFrameContainer.contains(iframe)) {
                        // Verificar si parece ser de TvbetFrame
                        const src = iframe.src || '';
                        const parentElement = iframe.parentElement;
                        
                        if (src.includes('tvbet') || 
                            src.includes('frame') ||
                            iframe.getAttribute('title')?.includes('tvbet') || 
                            parentElement?.id?.includes('tvbet') || 
                            parentElement?.className?.includes('tvbet') ||
                            iframe.className?.includes('tvbet')) {
                            
                            console.log('Moving iframe to correct container:', iframe);
                            tvbetFrameContainer.appendChild(iframe);
                            applyIframeStyles(iframe);
                            moved = true;
                        }
                    }
                });
                
                return moved;
            };
            
            // Función para aplicar estilos restrictivos
            const applyContainmentStyles = () => {
                // Primero intentar mover iframes mal ubicados
                moveIframesToContainer();
                
                const iframes = tvbetFrameContainer.querySelectorAll('iframe');
                const allElements = tvbetFrameContainer.querySelectorAll('*');
                
                // Aplicar estilos a todos los iframes
                iframes.forEach(applyIframeStyles);
                
                // Aplicar estilos a todos los elementos para prevenir escape
                allElements.forEach(element => {
                    if (element !== tvbetFrameContainer) {
                        const computedStyle = window.getComputedStyle(element);
                        
                        // Forzar que elementos con position fixed se conviertan en relative
                        if (computedStyle.position === 'fixed' || computedStyle.position === 'absolute') {
                            element.style.position = 'relative !important';
                        }
                        
                        element.style.maxWidth = '100% !important';
                        element.style.maxHeight = '100% !important';
                        element.style.overflow = 'hidden !important';
                        
                        // Prevenir que elementos se escapen del contenedor
                        if (element.tagName === 'DIV' || element.tagName === 'IFRAME') {
                            element.style.cssText += `
                                contain: layout style !important;
                                width: 100% !important;
                                height: 100% !important;
                            `;
                        }
                    }
                });
                
                if (iframes.length > 0) {
                    loadTvbetFrame = false;
                }
            };
            
            // Observar cambios en TODO el documento para detectar iframes creados fuera
            const documentObserver = new MutationObserver((mutations) => {
                let foundNewIframes = false;
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) { // Element node
                                if (node.tagName === 'IFRAME' || node.querySelector('iframe')) {
                                    foundNewIframes = true;
                                }
                            }
                        });
                    }
                });
                
                if (foundNewIframes) {
                    setTimeout(applyContainmentStyles, 100);
                }
            });
            
            // Observar el documento completo para detectar iframes creados dinámicamente
            documentObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // Observar cambios en el contenedor
            const containerObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        applyContainmentStyles();
                    }
                });
            });
            
            containerObserver.observe(tvbetFrameContainer, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
            
            // Aplicar estilos inmediatamente y repetidamente
            setTimeout(applyContainmentStyles, 100);
            setTimeout(applyContainmentStyles, 500);
            setTimeout(applyContainmentStyles, 1000);
            setTimeout(applyContainmentStyles, 2000);
            setTimeout(applyContainmentStyles, 3000);
            setTimeout(applyContainmentStyles, 5000);
            
            // Iniciar un intervalo para verificar continuamente los estilos
            styleEnforcementInterval = setInterval(() => {
                applyContainmentStyles();
            }, 2000);
            
            // Timeout de seguridad para desconectar los observers
            setTimeout(() => {
                documentObserver.disconnect();
                containerObserver.disconnect();
                if (styleEnforcementInterval) {
                    clearInterval(styleEnforcementInterval);
                }
                // Restaurar createElement por seguridad
                document.createElement = originalCreateElement;
                loadTvbetFrame = false;
            }, 60000); // Aumenté a 60 segundos
        }
    }

    function loadTvbetFrameScript() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (window.TvbetFrame) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://tvbetframe27.com/assets/frame.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    onMount(async () => {
        tv_language = options_launch.options.language || 'en';
        tv_clientId = options_launch.options.clientId;
        tv_token = options_launch.options.token;
        tv_server = options_launch.options.server;
        tv_gameId = options_launch.options.gameId;

        console.log("Mounting ScreenGamesTvBet modal",options_launch);
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', handleMessage);
        
        // Cargar el script de TvbetFrame
        try {
            await loadTvbetFrameScript();
            if (open) {
                initTvbetFrame();
            }
        } catch (error) {
            console.error('Error loading TvbetFrame script:', error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', handleMessage);
        
        // Limpiar el intervalo si existe
        if (styleEnforcementInterval) {
            clearInterval(styleEnforcementInterval);
        }
        
        if (tvbetFrameInstance) {
            // Limpiar la instancia de TvbetFrame si tiene un método de limpieza
            tvbetFrameContainer.innerHTML = '';
        }
        console.log("Cleaned up event listeners and TvbetFrame instance");
    });


    $: statusModal(open);
    // @ts-ignore
    $: if (open && window.TvbetFrame && tvbetFrameContainer) {
        initTvbetFrame();
    }
</script>

{#if open}
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header {isMobileSafari?'safari':''}">
                    <div class="screenGames__options">
                        <button class="btn close" on:click={closeModal} />
                        <div/>
                    </div>
                    <picture>
                        <source media="(max-width: 1023px)" srcset="{assetsUrl}{platform}/logo_mb.png">
                        <img src="{assetsUrl}{platform}/logo.png" alt="{platform}-logo" loading="eager">
                    </picture>
                    <div class="screenGames__options">
                        <button class="btn reload" on:click={reloadTvbetFrame}></button>
                        <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                    </div>
                </div>
                <div class="modal-body">
                    {#if loadTvbetFrame}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    {#if viewTvbetFrame}
                        <div bind:this={tvbetFrameContainer} class="tvbet-container" id="tvbet-game-container"></div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Estilos para asegurar que TvbetFrame ocupe solo el espacio del modal-body */
    :global(.modal.screenGames) {
        z-index: 9999 !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
    }
    
    :global(.modal.screenGames .modal-dialog) {
        position: relative !important;
        z-index: 10000 !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        max-width: 100% !important;
    }
    
    :global(.modal.screenGames .modal-content) {
        position: relative !important;
        z-index: 10001 !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        border-radius: 0 !important;
        overflow: hidden !important;
    }
    
    :global(.modal.screenGames .modal-header) {
        position: relative !important;
        z-index: 10002 !important;
        flex-shrink: 0 !important;
        border-bottom: 1px solid #dee2e6 !important;
        background: #fff !important;
    }
    
    :global(.modal.screenGames .modal-body) {
        position: relative !important;
        z-index: 10001 !important;
        flex: 1 !important;
        overflow: hidden !important;
        padding: 0 !important;
        contain: layout style size !important;
    }
    
    .tvbet-container {
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
        overflow: hidden !important;
        contain: layout style size !important;
    }
    
    /* Estilos MUY agresivos para elementos internos de TvbetFrame */
    :global(.modal.screenGames .modal-body *) {
        max-width: 100% !important;
        max-height: 100% !important;
        contain: layout !important;
    }
    
    :global(.modal.screenGames .modal-body iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        position: relative !important;
        z-index: 1 !important;
        top: 0 !important;
        left: 0 !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
        max-height: 100% !important;
    }
    
    /* Forzar que CUALQUIER elemento dentro del contenedor no escape */
    :global(.tvbet-container *) {
        position: relative !important;
        max-width: 100% !important;
        max-height: 100% !important;
        overflow: hidden !important;
    }
     
    /* Prevenir elementos con position fixed/absolute */
    :global(.tvbet-container [style*="position: fixed"]),
    :global(.tvbet-container [style*="position: absolute"]) {
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
    }
    
    /* Asegurar que los botones del header siempre estén visibles */
    :global(.modal.screenGames .modal-header .btn) {
        position: relative !important;
        z-index: 10003 !important;
    }
    
    /* Prevenir que cualquier elemento tenga z-index mayor que el header */
    :global(.modal.screenGames .modal-body *) {
        z-index: 1 !important;
    }
</style>
