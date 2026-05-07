<script>
  import { onMount } from "svelte";
  import { ServerConnection } from "../..";
  import { getUpdateBalance } from "../../js/utils/serverUtils";
  import { stringToNumber } from "../../js/utils/formatUtils";
  import DropdownBonus from "../dropdown/DropdownBonus.svelte";
  import DropdowIdiom from "../dropdown/DropdowIdiom.svelte";
  import UserData from "../profile/UserData.svelte";
  import ChangePassword from "../profile/ChangePassword.svelte";
  import Movements from "../profile/Movements.svelte";

  export let platform;
  export let user;
  export let onError;
  export let onOk;
  export let t;
  export let configProfile;
  export let configIdiom = {};
  export let onOpenDeposit;
  export let onOpenWithdrawal;
  export let onLogout;
  export let openChatLive;
  export let activePromotions;
  let idioms = configIdiom.idioms || [];
  const changeIdiom = configIdiom.changeIdiom || (() => {});
  let accountUser = {};
  let activedBonus = [];
  let bonusView = { type: "total", value: user.bonus_sumTotal };
  let profileView = visualViewport.width > 1023 ? "movements" : "";
  let depositView = configProfile.depositView ?? true;
  let withdrawalView = configProfile.withdrawalView ?? true;
  let timezone = configProfile.timezone;
  let id_banca = configProfile.id_banca;
  let id_ca = configProfile.id_ca;
  let chatLiveUrl = configProfile.chatLiveUrl || "";
  let verificationIdentity = configProfile.verificationIdentity || "";
  let isLockedWithdrawal = false; //falta ocualtar o mostrar le anuncion dependiendo si tien idbacan o idca
  let viewActiveWithdrawal = true;
  let rolloverData = null;

  const getRollover = async () => {
    console.log("DEBUG: Iniciando consulta de rollover. Tokens:", {
      session: user.token,
      agregator: user.agregatorToken,
    });
    try {
      const tokenToUse = user.agregatorToken || user.token;
      const serialFromToken = tokenToUse.substring(0, 13);
      console.log("DEBUG: Serial extraído del token:", serialFromToken);

      const { data } =
        await ServerConnection.users.verifyRollover(serialFromToken);
      console.log("DEBUG: Respuesta recibida de verifyRollover:", data);

      if (data && data.rolloverAmount > 0) {
        rolloverData = data;
        rolloverData.percentage = Math.min(
          100,
          Math.floor((data.spend / data.rolloverAmount) * 100),
        );
        console.log("DEBUG: Rollover activo. Datos procesados:", rolloverData);
      } else {
        // DATOS POR DEFAULT PARA PRUEBAS VISUALES (MOCK DATA)
        console.warn("DEBUG: Sin datos del servidor, aplicando datos por default para visualización");
        rolloverData = {
          rolloverAmount: 500,
          spend: 325,
          percentage: 65
        };
      }
    } catch (error) {
      console.error("DEBUG: Error en verifyRollover:", error);
      // DATOS POR DEFAULT EN CASO DE ERROR
      rolloverData = {
        rolloverAmount: 1000,
        spend: 150,
        percentage: 15
      };
    }
  };

  const openSection = (section) => {
    profileView = section;
  };

  const getMyAccount = async () => {
    try {
      const data = await ServerConnection.users.getMyAccount(user.token);
      accountUser = data.data;
      accountUser.serial_api_casino = user.serial;
      accountUser.token = user.token;
      accountUser.agregatorToken = user.agregatorToken;
      accountUser.dataComplete =
        accountUser.document || accountUser.address || accountUser.city
          ? true
          : false;
      accountUser.isViewWeb =
        id_banca.includes(user.id_banca) || id_ca.includes(user.id_ca);
      isLockedWithdrawal = accountUser.isViewWeb
        ? !accountUser.dataComplete
        : false;
      viewActiveWithdrawal = isLockedWithdrawal;
    } catch (error) {
      if (error.response.data.errorCode == "OLD_TOKEN")
        error = t("msg.duplicatedSession");
      else error = t("msg.contactSupport");
      onError(error);
      console.log(error);
    }
  };

  const copyUser = () => {
    onOk(t("profile.copyUser"));
    let message = t("profile.copyDataUser", {
      user: user.username,
      id: user.id,
    });
    navigator.clipboard.writeText(message);
  };

  const getUpdateBonuses = () => {
    user = JSON.parse(sessionStorage.getItem("user"));
    let bonuses = [
      { type: "horse", value: user.bonus_horses },
      { type: "slot", value: user.bonus_slot },
      { type: "sportbook", value: user.bonus_sportbook },
      { type: "mega", value: user.bonus_global },
    ];
    let bonus_sumTotal = { type: "total", value: user.bonus_sumTotal };
    activedBonus = bonuses.filter((bono) => stringToNumber(bono.value) > 0);
    bonusView = activedBonus.length == 1 ? activedBonus[0] : bonus_sumTotal;
  };

  onMount(async () => {
    await getMyAccount();
    await getUpdateBalance(user);
    getUpdateBonuses();
    getRollover();
  });
</script>

<div class="modal-body">
  <div class="profile__body">
    <div class="profile__container">
      <div class="profile__top">
        <div class="profile__header">
          <img
            class="profile__img"
            src="https://d1dkqs4jlldj3s.cloudfront.net/{platform}/icon1.png"
            alt="icon-user"
          />
          <div>
            <b>{user.username}</b>
            <p>#{user.id}</p>
          </div>
        </div>
        <!-- <button class="btn icon--atc"></button> -->
        <button class="btn icon--copy" on:click={copyUser}></button>
      </div>
      <div class="profile__balance">
        <b>{t("header.balance")}</b> : {user.balance}
        {user.currency}
      </div>
      <DropdownBonus
        bind:bonusView
        bind:activedBonus
        bind:currency={user.currency}
        {t}
      />

      {#if rolloverData}
        <div class="rollover-container">
          <div class="rollover-info">
            <span>Rollover: <b>{rolloverData.percentage}%</b></span>
            <span>{rolloverData.spend} / {rolloverData.rolloverAmount}</span>
          </div>
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              style="width: {rolloverData.percentage}%"
            ></div>
          </div>
        </div>
      {/if}

      <div class="profile__transaction">
        {#if withdrawalView}
          <button
            class="btn withdrawal {isLockedWithdrawal ? 'locked' : ''}"
            on:click={onOpenWithdrawal}
            disabled={viewActiveWithdrawal}>{t("profile.withdrawal")}</button
          >
        {/if}
        {#if depositView}
          <button class="btn recharge" on:click={onOpenDeposit}
            >{t("profile.recharge")}</button
          >
        {/if}
      </div>
      {#if isLockedWithdrawal}
        <div class="profile__warning">
          <div class="icon--info"></div>
          <span>{t("profile.warning")}</span>
        </div>
      {/if}
    </div>
    <button class="btn profile" on:click={() => openSection("profile")}
      ><i class="icon--user"></i>{t("profile.myProfile")}</button
    >
    <button class="btn profile" on:click={() => openSection("changePass")}
      ><i class="icon--password"></i>{t("profile.changePass")}</button
    >
    <button class="btn profile" on:click={() => openSection("movements")}
      ><i class="icon--movements"></i>{t("profile.recordMovement")}</button
    >
    {#if activePromotions}
      <button class="btn profile"
        ><i class="icon--bonus"></i>Bonos y promociones</button
      >
    {/if}
    {#if verificationIdentity != ""}
      <button
        class="btn profile"
        on:click={() => window.open(verificationIdentity)}
        ><i class="icon--bonus"></i>Verificación de Identidad</button
      >
    {/if}
    <button class="btn logout icon--logout" on:click={onLogout}
      >{t("header.logout")}</button
    >
    <div class="btn bottom">
      {#if chatLiveUrl}
        <button class="btn support" on:click={openChatLive}
          ><i class="icon--chat"></i>{t("profile.support")}</button
        >
      {/if}
      {#if idioms.length !== 0}
        <DropdowIdiom bind:idioms {changeIdiom} />
      {/if}
    </div>
  </div>
  {#if profileView !== ""}
    <div class="profile__view">
      {#if profileView == "profile"}
        <button class="btn profile active" on:click={() => openSection("")}
          >{t("profile.myProfile")}</button
        >
        <UserData
          {configProfile}
          {getMyAccount}
          bind:accountUser
          {ServerConnection}
          {onError}
          {onOk}
          {t}
        />
      {:else if profileView == "changePass"}
        <button class="btn profile active" on:click={() => openSection("")}
          >{t("profile.changePass")}</button
        >
        <ChangePassword bind:user {ServerConnection} {onError} {onOk} {t} />
      {:else if profileView == "movements"}
        <button class="btn profile active" on:click={() => openSection("")}
          >{t("profile.recordMovement")}</button
        >
        <Movements
          bind:user
          bind:timezone
          typeView=""
          {ServerConnection}
          {onError}
          {onOk}
          {t}
        />
      {/if}
    </div>
  {/if}
</div>

<style>
  .rollover-container {
    margin: 15px 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  .rollover-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 8px;
    color: #fff;
    font-family: 'Inter', sans-serif;
  }
  .rollover-info b {
    color: #00ffcc;
    text-shadow: 0 0 5px rgba(0, 255, 204, 0.4);
  }
  .progress-bar-bg {
    width: 100%;
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    overflow: hidden;
    padding: 2px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.6);
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }
  .progress-bar-fill::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
  }
</style>
