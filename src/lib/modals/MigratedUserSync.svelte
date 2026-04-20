<script>
    import { ServerConnection } from "../..";
    import UserDataMigrated from "../profile/UserDataMigrated.svelte";
    import ChangePassword from "../profile/ChangePassword.svelte";

    export let user;
    export let accountUser = {};
    export let t;
    export let onError;
    export let onOk;

    let step = 1;

    const nextStep = () => {
        if (step < 2) step += 1;
    };

    const previousStep = () => {
        if (step > 1) step -= 1;
    };

    const finishFlow = () => {
        window.location.reload();
    };

</script>

<div class="modal-body migratedSync">
    <div class="migratedSync__header">
        <p>Completa ambos pasos para continuar.</p>
    </div>

    <div class="migratedSync__steps">
        <div class="migratedSync__step {step === 1 ? 'active' : ''}">
            1. Cambiar contrasena
        </div>
        <div class="migratedSync__step {step === 2 ? 'active' : ''}">
            2. Actualizar perfil
        </div>
    </div>

    <div class="migratedSync__content">
        {#if step === 1}
            <ChangePassword
                bind:user
                {ServerConnection}
                {onError}
                {onOk}
                {t}
            />
        {:else}
            <UserDataMigrated
                bind:accountUser
                {ServerConnection}
                {onError}
                {onOk}
            />
        {/if}
    </div>

    <div class="migratedSync__actions">
        {#if step > 1}
            <button class="btn profile" type="button" on:click={previousStep}>
                Volver
            </button>
        {/if}

        {#if step < 2}
            <button class="btn save" type="button" on:click={nextStep}>
                Continuar
            </button>
        {:else}
            <button class="btn save" type="button" on:click={finishFlow}>
                Finalizar
            </button>
        {/if}
    </div>
</div>
<style>
    .migratedSync {
        display: grid;
        gap: 12px;
        max-width: 820px;
    }

    .migratedSync__header p {
        margin: 6px 0 0;
        opacity: 0.8;
    }

    .migratedSync__steps {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    .migratedSync__step {
        border: 1px solid #d8d8d8;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 13px;
        opacity: 0.7;
    }

    .migratedSync__step.active {
        border-color: #3f6fff;
        opacity: 1;
    }

    .migratedSync__content {
        border: 1px solid #ececec;
        border-radius: 10px;
        padding: 12px;
    }

    .migratedSync__actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }
</style>
