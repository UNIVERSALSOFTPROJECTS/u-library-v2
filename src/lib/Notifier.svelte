<script>
    import { fade } from 'svelte/transition';
    import EventManager from '../js/EventManager';
    export let notify={};
    let timer;

    const statusNotifier = (isActive) => {
        clearTimeout(timer);
        //if(isActive === true) timer = setTimeout(() => { notify.open = false; }, 3000); 
    }

    EventManager.subscribe("notify", (event) => {
        notify={};
        notify.message = event.msg;
        notify.type = event.mode || "success";
        notify.open = true;
    });



    

    $: statusNotifier(notify.open);
</script>

{#if notify.open}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="notify {notify.type}" on:mouseover={()=> notify.open = false} on:focus={()=> notify.open = false} transition:fade={{ delay: 75, duration: 150 }}>
        <div class="notify__message">
            <div class="notify__icon"></div>
            <div class="notify__text">{notify.message}</div>
        </div>
        <div class="notify__timer">
            <div class="notify__progress-bar" transition:fade={{ delay: 0, duration: 0 }}></div>
        </div>
    </div>
{/if}

