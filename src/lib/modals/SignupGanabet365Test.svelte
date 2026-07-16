<script>
    import SignupGanabet365 from "./SignupGanabet365.svelte";
    import Modal from "../Modal.svelte";
    import { t, locale } from "../../js/i18n";

    $locale = "es";

    let open = true;
    let modalOpened = "signup";

    const configSignup = {
        platform: "Ganabet365",
        typeSignup: "mixed",
        userType: "W",
        currencies: [
            { id: 9, agent: 6546 },
        ],
        countries: [
            { prefix: "+51", flag: "pe" },
            { prefix: "+56", flag: "chl" },
        ],
        // preRegister: false,
    };

    const onOk = (data) => {
        console.log("OK registro", data);
        alert(typeof data === "string" ? data : "Registro OK");
    };

    const onError = (error) => {
        console.log("Error registro", error);
        alert(error);
    };

    const onOpenLogin = () => {
        console.log("Abrir login");
        alert("Abrir login");
    };

    const refreshConf = async () => {
        console.log("refreshConf");
    };
</script>

<div class="Coliseosport ganabet365-story">
    <Modal bind:open bind:modalOpened title="">
        <SignupGanabet365
            {configSignup}
            {onOk}
            {onError}
            {onOpenLogin}
            {refreshConf}
            t={$t}
        />
    </Modal>
</div>

<style>
    :global(body) {
        margin: 0;
        background: #0a0a0a;
    }

    .ganabet365-story {
        min-height: 100vh;
        background: #0a0a0a;
    }

    .ganabet365-story :global(.modal.signup .modal-content) {
        background: #000;
        border: 1px solid #333;
        max-width: 420px;
    }

    .ganabet365-story :global(.modal.signup .modal-header) {
        background: #000;
        border-bottom: 0;
        color: #fff;
    }

    .ganabet365-story :global(.modal.signup .modal-header .btn.close) {
        filter: invert(1);
    }
</style>
