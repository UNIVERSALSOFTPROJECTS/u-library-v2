<script>
    import { onMount } from "svelte";
    import { ServerConnection } from "../..";
    import { getUpdateBalance } from '../../js/utils/serverUtils';
    import { stringToNumber } from "../../js/utils/formatUtils";
    import DropdownBonus from "../dropdown/DropdownBonus.svelte";

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
    export let activePromotions;

    let accountUser = {};
    let activedBonus = [];
    let bonusView = {type: "total", value : user.bonus_sumTotal};
    let profileView = visualViewport.width > 1023 ? "movements":"";
    let timezone = configProfile.timezone;
    let id_banca  = configProfile.id_banca;
    let id_ca  = configProfile.id_ca;
    let isLockedWithdrawal = false;//falta ocualtar o mostrar le anuncion dependiendo si tien idbacan o idca

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
        activedBonus = bonuses.filter(bono => stringToNumber(bono.value) > 0);
        bonusView = activedBonus.length == 1 ? activedBonus[0]:bonus_sumTotal;
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
                <!-- <button class="btn icon--atc"></button> -->
                <button class="btn icon--copy" on:click={copyUser}></button>
            </div>
            <div class="profile__balance"><b>{t("header.balance")}</b> : {user.balance} {user.currency}</div>
            <DropdownBonus bind:bonusView bind:activedBonus bind:currency={user.currency} {t}/>

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
        <button class="btn profile" on:click={() => openSection("profile")}><i class="icon--user"></i>{t("profile.myProfile")}</button>
        <button class="btn profile" on:click={() => openSection("changePass")}><i class="icon--password"></i>{t("profile.changePass")}</button>
        <button class="btn profile" on:click={() => openSection("movements")}><i class="icon--movements"></i>{t("profile.recordMovement")}</button>
        {#if activePromotions}
        <button class="btn profile"><i class="icon--bonus"></i>Bonos y promociones</button>
        {/if}
        <button class="btn logout icon--logout" on:click={onLogout}>{t("header.logout")}</button>
    </div>
    {#if profileView !== ""} 
        <div class="profile__view">
        {#if profileView == "profile"} 
            <button class="btn profile active" on:click={() => openSection("")}>{t("profile.myProfile")}</button>
            <UserData {configProfile} {getMyAccount} bind:accountUser {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "changePass"}
            <button class="btn profile active" on:click={() => openSection("")}>{t("profile.changePass")}</button>
            <ChangePassword bind:user {ServerConnection} {onError} {onOk} {t}/>
        {:else if profileView == "movements"}
            <button class="btn profile active" on:click={() => openSection("")}>{t("profile.recordMovement")}</button>
            <Movements bind:user bind:timezone {ServerConnection} {onError} {onOk}{t}/>
        {/if}     
        </div>  
    {/if}       
</div>