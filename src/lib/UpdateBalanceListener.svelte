<script>
    //Esto se usa para la actualización de balance notificado por neco
    import { onMount } from "svelte";
    import SocketConnector from "../js/SocketConnector";
    import EventManager from "../js/EventManager";
    import notify from "../js/notify";
    import server from "../js/server"; 
    import Notifier from "./Notifier.svelte";
    export let user;
    export let onChangeBalance;

    

    onMount( ()=>{
        console.log("user: ", user);
        console.log("onChangeBalance: ", onChangeBalance);     
        // notify.setEM(EventManager);
        EventManager.subscribe("update_balance", (data)=>{
            console.log("STEP4: UpdateBalanceListener received:", data);
            // let msg = "SALDO ACTUALIZADO";
            // notify.success(msg);
            onChangeBalance(data);
        });
    })
</script>

<Notifier />
