<script>
import { onMount } from "svelte";
import ServerConnection from "../../js/server";
import { fly } from "svelte/transition";
import moment from "moment";
    import Login from "./Login.svelte";

export let user;
let intervalID;
let showHeader = true;
let showAlertRefreshToken = false;
let userLogaout = {};
let chronometer = 16
let cronometroID;
let buttonDisabled = false;


console.log("LO ESRTAN LLAMADNO");

const onObserverUser = async (user) => {
    userLogaout = { ...user };
    console.log("userLogaout",userLogaout);
    startInterval();
};

const onRefreshToken = async () => {
    try {
        const { data } = await ServerConnection.u_user.refreshToken(userLogaout.token);
        updateUserData(data);
    } catch (error) {
        console.log("ERROR: Refresh token", error);
    }
};

const updateUserData = (data) => {
    userLogaout.token = data.token;
    userLogaout.expireToken = data.expireToken;
    sessionStorage.setItem("user", JSON.stringify(userLogaout));
    showAlertRefreshToken = false;
    userLogaout = { ...JSON.parse(sessionStorage.getItem("user")) };
    startInterval();
};

const startInterval = () => {
   intervalID  = setInterval(compareHoursRefreshToken, 1800, userLogaout);
};

const compareHoursRefreshToken = (item) => {

    console.log("intervalID",intervalID);

    if (item && Object.keys(item).length !== 0) {
        const now = new Date();
        const timeExpireToken = moment(item.expireToken);
        const differenceInMilliseconds = timeExpireToken.diff(now, 'milliseconds');
        const differenceInMinutes = differenceInMilliseconds / 60000;
        console.log("differenceInMinutes",differenceInMinutes);
        if (differenceInMinutes <= 9) {
            clearInterval(intervalID);
            console.log("intervalID-----2",intervalID);
            showAlertRefreshToken = true;
            if (chronometer > 0) startChronometer();
        }
    }
};
const startChronometer = () => {
    if (chronometer > 0) {
        chronometer--;
        console.log("chronometer",chronometer);
        cronometroID = setTimeout(startChronometer, 1800);
    } else {
        clearInterval(intervalID);
        buttonDisabled = true;
    }
};

const onNotRefreshToken = () => {
    showAlertRefreshToken = false;
    clearInterval(intervalID);
    chronometer = 0;
    sessionStorage.removeItem("user");
    location.reload();
};

const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); };

$: onObserverUser(user);

</script>

{#if showAlertRefreshToken}
<div class="modal {showAlertRefreshToken}" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom}>
  <div class="modal-dialog centered" transition:fly={{ y: -50, duration: 5 }}>
    <div class="modal-content">
       {#if showHeader}
          <div class="modal-header"> <div />
             <button class="btn close" on:click={() => (showAlertRefreshToken = false)} />
           </div>
          {/if}
        <div class="config-body">
          <div class="config__body center">
            <div class="config__header">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style="fill: orange;" class="bi bi-clock-history" viewBox="0 0 16 16">
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </div>
            <div class="config__body" style="color: white;">
              <label for="bill-collector-config mb"> 
                Sesión esta por expirar en 1 minuto
              </label>
              <p><strong>Desea continuar!</strong></p>

              <div class="chronometer">
                   <p>{chronometer}</p>
              </div>
            </div>
            <div class="config__footer">
              <button class="btn btn-danger" on:click={onRefreshToken} disabled = {buttonDisabled}>Si</button>
              <button class="btn config--btn" on:click={onNotRefreshToken}>No</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
{/if}

<style>
  .config__footer{
    display: flex;
  }
  .config__footer button{
    margin-left: 2px;
    margin-right: 2px;
  }
  .config__header{
    margin-bottom: 15px;
  }

  .center{
    text-align: center;
  }
  .config__body{
    margin-bottom: 20px;
  }
  .chronometer{
    margin-top: 20px;
    font-size: 40px;
  }
  .chronometer p{
    color: orange;
  }
  .modal-content{
    width: 14%;
    height: 314px;
  }
  .no-header{
    display: flex;
    background: none;
    align-items: center;
    justify-content: center;
    height: auto;
    overflow: inherit;
  }
</style>