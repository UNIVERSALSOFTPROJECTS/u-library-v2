<script>
    import Modal from "../Modal.svelte";
    import DropdowIdiom from "../dropdown/DropdowIdiom.svelte";
    import { detectDomain, detectSubdomain } from "../../js/utils/formatUtils";
    import { isMobile } from "mobile-device-detect";

    export let configLogin;
    export let onError;
    export let onOk;
    export let t;

    const openBillCollector = configLogin.openBillCollector;
    const changeIdiom = configLogin.changeIdiom;
	let  idioms = configLogin.idioms;
    let countries = configLogin.countries;
    let typeView = localStorage.getItem("typeView") || "";
    let modalOpen = false;
    let subModalOpened = "configAutoservice";
    let f2Pressed = false;
    let username = "";
    let password = "";
    let isWithdrawal = localStorage.getItem("btnWithdrawal")?true:false;
    let isDeposit = localStorage.getItem("btnDeposit")?true:false;
    let isLiteVersion = localStorage.getItem("btnLiteVersion")?true:false;
    let isVirtualKeyboard = localStorage.getItem("btnVirtualKeyboard")?true:false;
    const domain = detectDomain();
    let subdomain = detectSubdomain();

    const viewDataConfig = () => {
        if (localStorage.getItem('autoSaved')) {
            let userSaved = JSON.parse(localStorage.getItem('autoSaved'));
            username = userSaved[0].user;
            password = userSaved[0].pass;
        }
    }
    
    const changeTypeView = (type) => {
        typeView = type;
        localStorage.setItem("typeView",typeView);
    }

    const saveUser = () => {
        // if (subdomain == "" && window.location.href != "https://machinevlt.shop/") {
        //     onError(t("autoservice.selectCountry"));
        //     return;
        // }
        if(username != "" || password != "" ){
            localStorage.setItem('autoSaved',`[{"user":"${username}", "pass":"${password}"}]`)
            modalOpen = false;
           
        }
        onOk(t("autoservice.configSaved"));

        setTimeout(() => {
                sessionStorage.removeItem("user");
                localStorage.setItem("domain",subdomain);
            if (subdomain == "") {
                location.reload();
            }else{
                window.location.href = `https://${subdomain}.${domain}`;
            }
        }, 1000);
        

    }
    const toggleBtnWithdrawal = () => {
        isWithdrawal != isWithdrawal;
        isWithdrawal?localStorage.removeItem("btnWithdrawal"):localStorage.setItem("btnWithdrawal", "active");
        
    }
    const toggleBtnDeposit = () => {
        isDeposit != isDeposit;
        isDeposit?localStorage.removeItem("btnDeposit"):localStorage.setItem("btnDeposit", "active");
    }

    const toggleBtnLiteVersion = () => {
        isLiteVersion != isLiteVersion; 
        isLiteVersion?localStorage.removeItem("btnLiteVersion"):localStorage.setItem("btnLiteVersion", "active");
    }
    const toggleBtnsVirtualKeyboard = () => {
        isVirtualKeyboard != isVirtualKeyboard; 
        isVirtualKeyboard?localStorage.removeItem("btnVirtualKeyboard"):localStorage.setItem("btnVirtualKeyboard", "active");
    }

    //open Modal with specials keys
    document.addEventListener('keydown', (e) => {
        //just venezuela tv with android Mobile , specuak key "*"" 
        // if (isMobile) {
                        document.querySelectorAll('input').forEach((input) => {
                input.addEventListener('input', (e) => {
                    if (e.target.value.includes('*')) {
                        modalOpen = true;
                        viewDataConfig();
                        e.target.value = e.target.value.replace('*', ''); // Opcional: elimina el asterisco
                    }
                });
});
        // }else{
            if (e.key === 'F2') f2Pressed = true;
            
            if (f2Pressed && e.key === 'r' || f2Pressed &&  e.key === 'R'){
                modalOpen = true;
                f2Pressed = false;
                viewDataConfig();
            }
            if (e.key !== 'F2' && e.key !== 'r')  f2Pressed = false;
        // }
    });
</script>

<Modal bind:open={modalOpen} bind:subModalOpened title={t("profile.configuration")}>
    <div class="modal-body">
        <b>{t("autoservice.credentials")}</b>
        <div class="configAutoservice__form">
            <input type="text" class="ipt icon--user" placeholder={t("login.user")} autocapitalize="off" bind:value={username}>
		    <input type="text" class="ipt icon--password" placeholder={t("login.password")} autocomplete="off"  bind:value={password}>
        </div>
        <div class="configAutoservice__country">
            <b>{t("autoservice.language")}</b>
            <b>{t("autoservice.country")}</b>
            <DropdowIdiom bind:idioms {changeIdiom}/>
            {#if countries.length != 0}
            <select class="slc" bind:value={subdomain}>
                <option value="" disabled>{t("autoservice.selectCountry")}</option>
                {#each countries as country}
                    <option value={country.domain}>{country.name}</option>
                {/each}
            </select>
            {:else}
            <input type="text" class="ipt" value={t("autoservice.notAviable")} disabled>
            {/if}
        </div>
        <b>{t("autoservice.typeView")}</b>
        <div class="configAutoservice__type">
            <button class="btn {typeView == ""?'active':''}" on:click={()=>changeTypeView("")}>Web</button>
            <button class="btn {typeView == "autoservice"?'active':''}" on:click={()=>changeTypeView("autoservice")}>Autoservice</button>
        </div>
        <b>{t("autoservice.buttons")}</b>
        <div class="configAutoservice__buttons">
            <label for="deposit">{t("autoservice.deposit")}</label> 
            <input type="checkbox" class="switch" id="deposit" bind:checked={isDeposit} on:click={toggleBtnDeposit}>
            <label for="withdrawal">{t("autoservice.withdrawal")}</label> 
            <input type="checkbox" class="switch" id="withdrawal" bind:checked={isWithdrawal} on:click={toggleBtnWithdrawal}>
            <label for="version">{t("autoservice.version")}</label> 
            <input type="checkbox" class="switch" id="version" bind:checked={isLiteVersion} on:click={toggleBtnLiteVersion}>
            <label for="keyboard">{t("autoservice.virtualKeyboard")}</label> 
            <input type="checkbox" class="switch" id="keyboard" bind:checked={isVirtualKeyboard} on:click={toggleBtnsVirtualKeyboard}>
            <div>{t("autoservice.wallet")}</div>
            <button class="btn wallet" on:click={() => {
                openBillCollector();
                modalOpen = false;
              }}>{t("autoservice.open")}</button>
        </div>
        <button class="btn save" on:click={saveUser}>{t("profile.save")}</button>
    </div>
</Modal>