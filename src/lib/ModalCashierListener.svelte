<script>
    //Esto se usa para la actualización de balance notificado por neco
    import { onMount } from "svelte";
    import SocketConnector from "../js/SocketConnector";
    import EventManager from "../js/EventManager";
    import notify from "../js/notify";
    import server from "../js/server"; 
    import Notifier from "./Notifier.svelte";
    export let user;
    export let onCashierListener;

    

    onMount( ()=>{
        
        console.log("onChangeBalance: ", onCashierListener);     
        // notify.setEM(EventManager);
        EventManager.subscribe("cashier_online", (data)=>{
            // let msg = "SALDO ACTUALIZADO";
            // notify.success(msg);
            onCashierListener(data);
        });
        EventManager.subscribe("cashier_offline", (data)=>{
            // let msg = "SALDO ACTUALIZADO";
            // notify.success(msg);
            onCashierListener(data);
        });
    })
</script>

<Notifier />
