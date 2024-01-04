<script>
    import Signup from "./Signup.svelte";
    import { t, locale, locales } from "../../js/i18n";
    import { onMount } from "svelte";

    $locale="es";

    const configSignup = {
        platform:'XX',
        agentCodeType:'nickname',
        typeSignup: "codeAgent", //codeAgent / selectCurrency /  mixed (codeAgent and selectCurrency)
        userType: "X",// X / W
        currencies: [ 
            {id: 7, agent:6546},
        ],
        countries: [
            {prefix:"+56",flag:"chl"},
        ]
    };
    const onOk=()=>{
    console.log("OK registro");
    }

    const onError = ()=>{
    console.log("Error registro");
    }
    function openPrivacyPolicies() {
    console.log("abriendo openPrivacyPolicies");
    }
    onMount(()=>{
        console.log(configSignup);
    });
</script>
<Signup {configSignup} {openPrivacyPolicies} {onOk} {onError} t={$t}/>