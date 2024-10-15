<script>
    import Modal from "../Modal.svelte";
    import DropdowIdiom from "../dropdown/DropdowIdiom.svelte";
    import { detectDomain } from "../../js/utils/formatUtils";

    export let configLogin;
    export let onError;
    export let onOk;
    export let t;

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
    const domain = detectDomain();
    let subdomain = localStorage.getItem("domain") || "";

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
        if(username == "" || password == "" ) return onError(t("msg.allObligatory"));
        localStorage.setItem('autoSaved',`[{"user":"${username}", "pass":"${password}"}]`)
        modalOpen = false;
        onOk(t("autoservice.configSaved"));
        setTimeout(() => {
            if (subdomain == "") {
                sessionStorage.removeItem("user");
                location.reload();
            }else{
                localStorage.setItem("domain",subdomain);
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

    //open Modal with specials keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F2') f2Pressed = true;
        
        if (f2Pressed && e.key === 'r' || f2Pressed &&  e.key === 'R'){
            modalOpen = true;
            f2Pressed = false;
            viewDataConfig();
        }
        if (e.key !== 'F2' && e.key !== 'r')  f2Pressed = false;
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
        </div>
        <button class="btn save" on:click={saveUser}>{t("profile.save")}</button>
    </div>
</Modal>