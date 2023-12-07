<script>
    import { t, locale, locales } from "../js/i18n";
     import Login from './topbar/LoginAutosaved.svelte';
     import Modal from '../lib/Modal.svelte';
     import Notifier from './Notifier.svelte';

     import utils from '../js/util';
    import { onMount } from 'svelte';
    import { ServerConnection } from '..';
     export let user = {};
        export let assetsUrl;
   // export let platform = "Babieca";//usado para storybook
    export let platform;//usado para storybook
    const onOpenRecoverPass = () => {}
    let loginModalOpen = true;
    let modalOpened = "login";
    //Deposit Modal
    let notify = {};
    let activeSession = false;

    localStorage.getItem('idiom')?'':localStorage.setItem('idiom','es');


    //$locale = "es";//Actualmente solo "es" y "fr"
    $locale = localStorage.getItem('idiom');//Actualmente solo "es" y "fr"

    function openPrivacyPolicies() {
        console.log("abriendo openPrivacyPolicies");
    }
    function openTermsConditions() {
        console.log("abriendo openTermsConditions");
    }

     const onLoginOk = async (user_)=>{
        user = user_;
        notify = await utils.showNotify("success", $t("msg.sucessLogin",{platform}));
        loginModalOpen = false;
        activeSession = true;
        user.bono_global = user_.bonus_cab + user_.bonus_cas + user_.bonus_dep + user_.bonus_general;
    }
    const onLoginError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }

    const configLogin = {  
        platform,
        assetsUrl,
        idioms : [
            {id:"es"},
            {id:"br"},
        ],
        changeIdiom: function(idiom) {
            $locale = idiom;
            localStorage.setItem('idiom',idiom);
        }
    };
    
</script>
<div class="{platform}">
    
  
    <Modal bind:open={loginModalOpen} bind:modalOpened>
        <Login {configLogin} onOk={onLoginOk} onError={onLoginError} t={$t} />
    </Modal>
</div>

