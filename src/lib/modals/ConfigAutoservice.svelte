<script>
    import Modal from "../Modal.svelte";
    import DropdowIdiom from "../dropdown/DropdowIdiom.svelte";

    export let configLogin;
    export let onError;
    export let onOk;
    export let t;

    const changeIdiom = configLogin.changeIdiom;
	let  idioms = configLogin.idioms;
    let typeView = localStorage.getItem("typeView") || "";
    let modalOpen = false;
    let subModalOpened = "configAutoservice";
    let f2Pressed = false;
    let username = "";
    let password = "";

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
            sessionStorage.removeItem("user");
            location.reload();
        }, 1000);
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
        <b>{t("autoservice.language")}</b>
        <DropdowIdiom bind:idioms {changeIdiom}/>
        <b>{t("autoservice.typeView")}</b>
        <div class="configAutoservice__type">
            <button class="btn {typeView == ""?'active':''}" on:click={()=>changeTypeView("")}>Web</button>
            <button class="btn {typeView == "autoservice"?'active':''}" on:click={()=>changeTypeView("autoservice")}>Autoservice</button>
        </div>
        <button class="btn save" on:click={saveUser}>{t("profile.save")}</button>
    </div>
</Modal>