<script>
    export let open;
    export let message;
    export let type;

    const statusNotifier = (isActive) => {
        if(isActive === true) setTimeout(() => { open = false; }, 3000);
    }
    $: statusNotifier(open);
</script>

{#if open}
    <button class="notify {type}" on:mouseenter={()=>open = false}>
        <div class="notify__message">
            <div class="notify__icon"></div>
            <div>{message}</div>
        </div>
        <div class="notify__timer">
            <div class="notify__progress-bar"></div>
        </div>
    </button>
{/if}

