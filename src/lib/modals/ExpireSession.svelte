<script>
    import { onDestroy } from 'svelte'
    export let updateTimeSession;
    export let platform;
    export let onLogout;
    export let t;

    let time = 360;

    function countdownTimer() {
        time -= 1;
        if (time < 0) { 
            clearInterval(interval);
            time = 0;
            sessionStorage.setItem('activeModal', 'expiredSession');
            onLogout();
        }
    }

    const interval = setInterval(countdownTimer, 1000);
    onDestroy(() => { clearInterval(interval); });
</script>

<div class="modal-body">
    <img class="expireSession__logo" src="https://d1dkqs4jlldj3s.cloudfront.net/{platform}/logo.png" alt="logo-{platform}" loading="eager">
    <p class="expireSession__title">{t("expireSession.stillThere")}</p>
    <button class="btn continue" on:click={updateTimeSession}>{t( "expireSession.continuePlaying")}</button>
    <p class="expireSession__text">{t("expireSession.expireIn")} <b>{time}</b>s</p>
</div>
