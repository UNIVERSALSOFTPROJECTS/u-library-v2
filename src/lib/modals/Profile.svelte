<script>
    import { onMount } from "svelte";
    import { ServerConnection } from "../..";
    
    import { getUpdateBalance } from '../../js/utils/serverUtils';

    import UserData from "../profile/UserData.Svelte";
    import ChangePassword from "../profile/ChangePassword.svelte";
    import Movements from "../profile/Movements.svelte"

    export let user;
    export let onError;
    export let onOk;
    export let t;
    export let configProfile;

    let accountUser = {};
    let bonusView = "";
    let profileView = "account";
    let timezone = configProfile.timezone;

    //detear si mostrar deposito y retiro: esto tambiennnnnnnnnnnnnnnnnpongo el el header el deposito afecta csmr


    const openSection = (section) => {
        profileView = section;
    }

    const getMyAccount = async()  =>{
        try {
            const data = await ServerConnection.users.getMyAccount(user.token);
            accountUser = data.data;
            accountUser.serial_api_casino = user.serial;
            accountUser.token = user.token;  
            accountUser.agregatorToken = user.agregatorToken;
            accountUser.dataComplete = (accountUser.document || accountUser.address || accountUser.city?true:false);
        } catch (error) {
            //si hay un error llamo al soket para que detecta, pero deberia ahcer en atico
            if(error.response.data.errorCode == "OLD_TOKEN") error = t("msg.duplicatedSession");
            else error = t("msg.contactSupport");
            onError(error);
            console.log(error);
        }                                                                                        
    }

    onMount(async() => {
        await getMyAccount();
       // await getUpdateBalance(user);
        user = JSON.parse(sessionStorage.getItem("user"));
        if (user.bonus_horses == 0 && user.bonus_slot == 0 && user.bonus_sportbook == 0 && user.bonus_global == 0) bonusView = "bono";
        else if (user.bonus_horses != 0 && user.bonus_slot == 0 && user.bonus_sportbook == 0 && user.bonus_global == 0) bonusView = "horse";
        else if (user.bonus_horses == 0 && user.bonus_slot != 0 && user.bonus_sportbook == 0 && user.bonus_global == 0) bonusView = "slot";
        else if (user.bonus_horses == 0 && user.bonus_slot == 0 && user.bonus_sportbook != 0 && user.bonus_global == 0) bonusView = "sportbook";
        else if (user.bonus_horses == 0 && user.bonus_slot == 0 && user.bonus_sportbook == 0 && user.bonus_global != 0) bonusView = "mega";
        console.log(accountUser);
    });
</script>

<div class="modal-body">
    <div class="profile__top">
        <div class="profile__header">
            <img class="profile__img" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="icon-user">
            <div>
                <b>{user.username}</b>
                <p>#{user.id}</p>
            </div>
        </div>
        <button class="btn icon--atc"></button>
        <button class="btn icon--copy"></button>
    </div>
    {#if profileView == "account" }
        <div class="profile__balance">Saldo: {user.balance} {user.currency}</div>
        <div class="{bonusView == ''?'slc':''} profile__balance ">
            {#if bonusView == "bono" }
            Saldo Bono: {user.bonus_sumTotal} {user.currency}
            {:else if bonusView == "horse"}
            Bono Caballos: {user.bonus_horses} {user.currency}
            {:else if bonusView == "slot"}
            Bono Casino: {user.bonus_slot} {user.currency}
            {:else if bonusView == "sportbook"}
            Bono Deportivas: {user.bonus_sportbook} {user.currency}
            {:else if bonusView == "mega"}
            Mega Bono: {user.bonus_global} {user.currency}
            {:else}
            Saldo Bono: {user.bonus_sumTotal} {user.currency}
            {/if}
            <!-- roa mostrar los bonos XDDDDde todo
            -->
        </div>
        <div class="profile__transaction">
            <button class="btn withdrawal">Retirar</button>
            <button class="btn recharge">Recargar</button>
        </div>
        <button class="btn profile" on:click={() => openSection("profile")}>Mi perfil</button>
        <button class="btn profile" on:click={() => openSection("changePass")}>Cambio de contraseña</button>
        <button class="btn profile" on:click={() => openSection("movements")}>Historial de actividades</button>
        <button class="btn profile">Bonos y promociones</button>
        <button class="btn logout icon--logout">Cerrar sesión</button>
        {:else if profileView == "profile"} 
            <button class="btn profile" on:click={() => openSection("account")}>Mi perfil</button>
            <UserData {configProfile} bind:accountUser {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "changePass"}
            <button class="btn profile" on:click={() => openSection("account")}>Cambio de contraseña</button>
            <ChangePassword bind:user {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "movements"}
            <button class="btn profile" on:click={() => openSection("account")}>Movimientos</button>
            <Movements bind:user bind:timezone {ServerConnection} {t}/>
    {/if}       
</div>