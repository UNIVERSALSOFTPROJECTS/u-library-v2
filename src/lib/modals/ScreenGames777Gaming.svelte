<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let updateBalance;
   
    export let options_launch;

    let load777GamingGame = true;
    let isFullscreen = false;
    let view777GamingGame = true;
    let heightModal;
    let gaming777Container;
    let ngtIframe;
    let ngtInstance;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        load777GamingGame = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    function receiveMessage(event) {
        if (event.data === "luckyspins_exit_game" || event.data === "adm_exit_game") {
            closeModal();
        } else {
        }
    }


    const closeModal = () => { 
        try {
            updateBalance();
            if (document.fullscreenElement != null) {
                toggleFullscreen();
            }
            open = false;
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    };

 

    const reload777GamingGame = () => { 
        view777GamingGame = false;
        load777GamingGame = true;
        setTimeout(() => { 
            view777GamingGame = true;
            init777GamingGame();
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

    function init777GamingGame() {
        // @ts-ignore
        if (gaming777Container && window.NGT) {
            console.log("Initializing 777Gaming game...");
            load777GamingGame = true;
            
            // Limpiar contenedor antes de inicializar
            gaming777Container.innerHTML = '';
            
            try {
                // Crear el iframe para el juego
                const iframe = document.createElement('iframe');
                iframe.id = 'ngtGame';
                iframe.style.border = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.allowFullscreen = true;
                gaming777Container.appendChild(iframe);
                
                // Configurar parámetros desde options_launch
                const gameSettings = {
                    id: options_launch.options.id,
                    lang: options_launch.options.lang,
                    currency: options_launch.options.currency,
                    longToken: options_launch.options.longToken,
                    market_label: options_launch.options.market_label,
                };
                
                console.log("777Gaming params:", gameSettings);
                
                // @ts-ignore
                window.NGT.create('#ngtGame', options_launch.options.url, gameSettings);
                
                // Suscribirse a eventos del juego
                // @ts-ignore
                window.NGT.subscribe("required:reload", function (data) {
                    reload777GamingGame();
                });
                
                // @ts-ignore
                window.NGT.subscribe("action:navigate", function (data) {
                    if (data.url) {
                        window.location.href = data.url;
                    }
                });
                
                console.log("777Gaming game initialized successfully");
                
                // Dar tiempo para que se cree el juego y luego ocultar loading
                setTimeout(() => {
                    load777GamingGame = false;
                }, 2000);
                
            } catch (error) {
                console.error("Error creating 777Gaming game instance:", error);
                load777GamingGame = false;
            }
        } else {
            console.warn("777Gaming initialization failed - missing dependencies:", {
                container: !!gaming777Container,
                // @ts-ignore
                NGT: !!window.NGT
            });
        }
    }

    function load777GamingScripts() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (window.NGT) {
                console.log("777Gaming NGT already loaded");
                resolve();
                return;
            }
            
            console.log("Loading 777Gaming NGT script...");
            
            // Crear el objeto NGT directamente en el componente
            // @ts-ignore
            window.NGT = (function () {
                let subscribeList = [];
                let subscribeMap = {};
                let iframe;
                let gameBaseURL;
                let gameSRC;

                function subscribe() {
                    if (typeof arguments[0] == "string") {
                        if (!subscribeMap[arguments[0]]) subscribeMap[arguments[0]] = [];
                        subscribeMap[arguments[0]].push(arguments[1]);
                    } else {
                        subscribeList.push(arguments[0]);
                    }
                }

                function unsubscribe() {
                    if (typeof arguments[0] == "string") {
                        if (arguments.length == 1) {
                            delete subscribeMap[arguments[0]];
                        } else {
                            for (var i = subscribeMap[arguments[0]].length - 1; i > -1; i--) {
                                if (subscribeMap[arguments[0]][i].callback == arguments[1]) {
                                    subscribeMap[arguments[0]].splice(i, 1);
                                }
                            }
                        }
                    } else {
                        for (let index = subscribeList.length - 1; index > -1; index--) {
                            if (subscribeList[index].callback == arguments[0]) {
                                subscribeList.splice(index, 1);
                            }
                        }
                    }
                }

                function send(data) {
                    iframe.contentWindow.postMessage(data, gameBaseURL);
                }

                function create(view, url, settings) {
                    subscribe("required:reload", function (data) {
                        location.reload();
                    });
                    
                    if (settings.depositURL)
                        subscribe("action:deposit", function (data) {
                            location.href = settings.depositURL;
                        });

                    if (settings.loginURL)
                        subscribe("required:login", function (data) {
                            location.href = settings.loginURL;
                        });

                    if (document.readyState === "complete" || document.readyState === "interactive") {
                        ready(view, url, settings)
                    } else {
                        document.addEventListener('DOMContentLoaded', function (event) {
                            ready(view, url, settings)
                        })
                    }

                    subscribe("action:navigate", function (data) {
                        location.href = data.url;
                    });
                }

                function ready(view, url, settings) {
                    let dom;

                    gameBaseURL = url;
                    const replace = {
                        id: "game",
                        longToken: "o_lt",
                        lang: "lang_label",
                        currency: "currency_label",
                    }
                    
                    if (!view) {
                        iframe = createIFrame();
                        dom = document;
                    } else if (typeof view == "string") {
                        let element = document.querySelector(view);
                        if (element.tagName.toLocaleLowerCase() == "iframe") {
                            iframe = element;
                        } else {
                            iframe = createIFrame();
                            dom = element;
                        }
                    } else
                        iframe = view;

                    if (dom) {
                        dom.appendChild(iframe);
                    }

                    window.addEventListener("message", function (e) {
                        if (gameBaseURL && gameBaseURL.search(e.origin) == -1) return;

                        for (var i = 0; i < subscribeList.length; i++) {
                            subscribeList[i](e.data.action, e.data.detail);
                        }

                        if (subscribeMap[e.data.action]) {
                            for (var i = 0; i < subscribeMap[e.data.action].length; i++) {
                                subscribeMap[e.data.action][i](e.data.detail);
                            }
                        }

                        if (e.data.action) send({ command: "received", action: e.data.action });

                    }, false);

                    iframe.src = gameSRC = convertURL(settings, replace);

                    function convertURL(data, replace) {
                        let str = "";
                        for (let k in data) {
                            let val = data[k];
                            if (k in replace) k = replace[k]
                            if (k == "lang_label" && Array.isArray(val)) val = val.pop();
                            str += k + "=" + encodeURIComponent(val) + "&";
                        }
                        str += "origin=" + encodeURIComponent(location.origin);
                        return gameBaseURL + "?" + str;
                    }

                    function createIFrame() {
                        let iframe = document.createElement("iframe");
                        iframe.width = "100%";
                        iframe.height = "100%";
                        return iframe;
                    }
                }

                return {
                    subscribe: subscribe,
                    unsubscribe: unsubscribe,
                    send: send,
                    create: create
                }
            })();
            
            console.log("777Gaming NGT loaded successfully");
            resolve();
        });
    }

    onMount( async() => {       
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', receiveMessage);        
        // Cargar los scripts de 777Gaming
        try {
            await load777GamingScripts();
            if (open) {
                init777GamingGame();
            }
        } catch (error) {
            console.error("Error loading 777Gaming scripts:", error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', receiveMessage);
        
        if (gaming777Container) {
            gaming777Container.innerHTML = '';
        }
        
        // @ts-ignore
        if (window.NGT) {
            // @ts-ignore
            window.NGT.unsubscribe();
        }
    });


    $: statusModal(open);
    // @ts-ignore
    $: if (open && window.NGT && gaming777Container) {
        init777GamingGame();
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
                        <button class="btn reload" on:click={reload777GamingGame}></button>
                        <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                    </div>
                </div>
                <div class="modal-body">
                    {#if load777GamingGame}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    {#if view777GamingGame}
                        <div bind:this={gaming777Container} class="gaming777-container" id="gaming777-game"></div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    
    
    :global(.modal.screenGames .modal-body) {
        position: relative !important;
        z-index: 10001 !important;
        flex: 1 !important;
        overflow: hidden !important;
        padding: 0 !important;
    }

    /* Estilos básicos para el iframe */
    :global(.modal.screenGames .modal-body iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        position: relative !important;
        z-index: 1 !important;
    }

    #gaming777-game {
        border: 1px solid #3584e4 !important;
        width: 100% !important;
        height: 100% !important;
    }
    
    .gaming777-container {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
    }
    
    /* Estilos específicos para el iframe de 777Gaming */
    :global(.gaming777-container iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
    }

</style>
