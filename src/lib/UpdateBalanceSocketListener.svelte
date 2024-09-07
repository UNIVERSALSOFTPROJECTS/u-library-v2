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

    
    SocketConnector.connect(user);

    onMount( ()=>{
        notify.setEM(EventManager);
        EventManager.subscribe("update_balance", (data)=>{
            let msg = "SALDO ACTUALIZADO";
            notify.success(msg);
            getBalance(user.agregatorToken);
        });
    })

    const getBalance=async(token)=>{
        try {
            if(!token) alert("TOKEN NOT_FOUND");
            const {data} =  await server.users.getBalance(token);
            user.balance = data.balance;
            if (onChangeBalance) onChangeBalance();
        } catch (error) {
            notify.error("No se pudo consultar Balance");
        }
    }
</script>

<Notifier />
