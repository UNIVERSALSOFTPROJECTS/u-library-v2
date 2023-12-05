<script>
    import { onMount } from "svelte";
    import SocketConnector from "../js/SocketConnector";
    import EventManager from "../js/EventManager";
    import notify from "../js/notify";
    import server from "../js/server"; 
    import Notifier from "./Notifier.svelte";
    export let user;

    SocketConnector.connect(user);

    onMount( ()=>{
        notify.setEM(EventManager);
        EventManager.subscribe("changeBalance", (data)=>{
            let msg = "transaction desconocida";
            switch(data.event){
                case 'DEPOSIT-BANK': msg = "Deposito confirmado"; break;
                case 'DEPOSIT-CASH': msg = "Deposito efectivo procesado"; break;
                case 'WITHDRAW-CASH': msg = "Retiro efectivo confirmado"; break;
                case 'WITHDRAW-BANK': msg = "Retiro bancario confirmado"; break;
            }
            notify.success(msg);
            getBalance(user.agregatorToken);
       
        });
    })

    const getBalance=async(token)=>{
        try {
            if(!token) alert("TOKEN NOT_FOUND");
            const {data} =  await server.users.getBalance(token);
            user.balance = data.balance;
        } catch (error) {
            notify.error("No se pudo consultar Balance");
        }
    }
</script>

<Notifier />
