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
    export let onOpenDeposit;
    export let onOpenWithdrawal;
    export let onLogout;
    // export let activePromotions;

    let accountUser = {};
    let activedBonus = [];
    let bonusView = {};
    let profileView = visualViewport.width > 1023 ? "movements":"";
    let timezone = configProfile.timezone;
    let id_banca  = configProfile.id_banca;
    let id_ca  = configProfile.id_ca;
    let isLockedWithdrawal = true;

    const openSection = (section) => { profileView = section; }

    const getMyAccount = async()  =>{
        try {
            const data = await ServerConnection.users.getMyAccount(user.token);
            accountUser = data.data;
            accountUser.serial_api_casino = user.serial;
            accountUser.token = user.token;  
            accountUser.agregatorToken = user.agregatorToken;
            accountUser.dataComplete = (accountUser.document || accountUser.address || accountUser.city ?true:false);
            accountUser.isViewWeb = id_banca.includes(user.id_banca) || id_ca.includes(user.id_ca);
            isLockedWithdrawal =  accountUser.isViewWeb?!accountUser.dataComplete:false;
        } catch (error) {
            if(error.response.data.errorCode == "OLD_TOKEN") error = t("msg.duplicatedSession");
            else error = t("msg.contactSupport");
            onError(error);
            console.log(error);
        }                                                                                        
    }

    const copyUser = () => {
        onOk(t("profile.copyUser"));
        let message = t("profile.copyDataUser",{user: user.username, id: user.id, });
        navigator.clipboard.writeText(message);
    }

    const getUpdateBonuses = () => {
        user = JSON.parse(sessionStorage.getItem("user"));

        let bonuses = [
            {type: "horse", value : user.bonus_horses},
            {type: "slot", value : user.bonus_slot},
            {type: "sportbook", value : user.bonus_sportbook},
            {type: "mega", value : user.bonus_global},
        ];
        let bonus_sumTotal = {type: "total", value : user.bonus_sumTotal};

        activedBonus = bonuses.filter(bono => bono.value > 0);
        bonusView = activedBonus.length > 1 ? bonus_sumTotal : activedBonus[0];
    }

    onMount(async() => {
        await getMyAccount();
        await getUpdateBalance(user);
        getUpdateBonuses();
    });

</script>

<div class="modal-body">
    <div class="profile__body">
        <div class="profile__container">
            <div class="profile__top">
                <div class="profile__header">
                    <img class="profile__img" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="icon-user">
                    <div>
                        <b>{user.username}</b>
                        <p>#{user.id}</p>
                    </div>
                </div>
                <button class="btn icon--atc"></button>
                <button class="btn icon--copy" on:click={copyUser}></button>
            </div>
            <div class="profile__balance">Saldo: {user.balance} {user.currency}</div>
            <div class="{activedBonus.length > 1?'slc':''} profile__balance">
                {#if activedBonus.length == 1}
                    {t(`bonus.${bonusView.type}`)} : {bonusView.value} {user.currency}
                {:else}
                    {t("bonus.total")}: {user.bonus_sumTotal} {user.currency}
                {/if}
            </div>
            {#if activedBonus.length > 1}
            <div class="profile__bonuses">
                    {#each activedBonus as bonus}
                       <div>
                            <span>{t(`bonus.${bonus.type}`)} :</span>
                            <span> {bonus.value} {user.currency}</span>
                       </div>
                    {/each}
                </div>
            {/if}
            <div class="profile__transaction">
                <button class="btn withdrawal {isLockedWithdrawal?'locked':''}"  on:click={onOpenWithdrawal} disabled={isLockedWithdrawal}>Retirar</button>
                <button class="btn recharge" on:click={onOpenDeposit}>Recargar</button>
            </div>
            {#if isLockedWithdrawal}
            <div class="profile__warning">
                <div class="icon--info"></div><span>{t("profile.warning")}</span>
            </div>
            {/if}
        </div>
        <button class="btn profile" on:click={() => openSection("profile")}><i class="icon--user"></i>Mi perfil</button>
        <button class="btn profile" on:click={() => openSection("changePass")}><i class="icon--password"></i>Cambio de contraseña</button>
        <button class="btn profile" on:click={() => openSection("movements")}><i class="icon--movements"></i>Historial de actividades</button>
        <button class="btn profile"><i class="icon--bonus"></i>Bonos y promociones</button>
        <!-- {#if activePromotions} -->
        <!-- {/if} -->
        <button class="btn logout icon--logout" on:click={onLogout}>Cerrar sesión</button>
    </div>
    {#if profileView !== ""} 
        <div class="profile__view">
        {#if profileView == "profile"} 
            <button class="btn profile active" on:click={() => openSection("")}>Mi perfil</button>
            <UserData {configProfile} {getMyAccount} bind:accountUser {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "changePass"}
            <button class="btn profile active" on:click={() => openSection("")}>Cambio de contraseña</button>
            <ChangePassword bind:user {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "movements"}
            <button class="btn profile active" on:click={() => openSection("")}>Movimientos</button>
            <Movements bind:user bind:timezone {ServerConnection} {onError} {onOk}{t}/>
        {/if}     
        </div>  
    {/if}       
</div>