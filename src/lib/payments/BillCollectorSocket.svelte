<script>
    import { onMount } from "svelte";
    export let user;
    export let onMessage;
    let socket;
    const brokerURL="ws://localhost:8181";
    const log="BillCollectorSocket:";

    let reconnectingAttempts;
    let connnected="no-init";
    let statusMessage = {open:'Conectado', reconnecting:'Reconectando', close:'Desconectado' };
    
    $:{//escuchara cambios en table user.
        if(user !== undefined && user && user.token){
            console.log(`${log} User Change`, user);
            connectUserToBillCollector(user);
        }
    }

    const connectUserToBillCollector=(user)=>{
        let {playerId, token, username, expireToken} = user;

        //if(!socket) return alert("No hay conexion con Billetero.");
        if(socket && socket.readyState  === WebSocket.OPEN ){
            socket.send(JSON.stringify({playerId, token, username, expireToken}));
        }else{//Closing, closed, CONNECTING
            console.log(`${log} Waiting 1 sec for send.`);
            setTimeout( ()=>{ connectUserToBillCollector(user); }, 2000 );
        }
        
    }

    const startSocket=()=>{
        socket = new WebSocket(brokerURL);
        /*socket.onopen=(event)=>{ }*/
        socket.addEventListener("open", (event) => {
            console.log("conectado a BillCollector");
            connnected = 'open';
            reconnectingAttempts=0;
        });

        socket.addEventListener("message", (event) => {
            console.log("mensaje ",event.data);
            onMessage(event.data);
        }); 

        socket.addEventListener("close", (event) => {
            console.log("BillCollecctoSocket: closed!");
            const attempts = 10; 
            connnected = 'close';
            if( user && user.token){
                if(reconnectingAttempts<attempts){
                    connnected = 'reconnecting';
                    reconnectingAttempts++;
                    setTimeout(()=>{ console.log("BillCollecctoSocket: Reconectando..."); startSocket(); }, 2*1000);
                }else{
                    alert(`${attempts} intentos de reconexion fallida. Para intentar conectar nuevamente actualice sistema.`);
                }
            }
            
        });

    socket.addEventListener("error", (event) => {
        connnected = 'error';
      console.log(`${log} ERROR al conectar socket`, event);

    });

    }


    onMount( ()=>{
        reconnectingAttempts=0;
        startSocket();
    });
</script>
<div id="bill-notify" class={'status-'+connnected}> Billetero {statusMessage[connnected]} {reconnectingAttempts && reconnectingAttempts<10?`... (${reconnectingAttempts})`:''} </div>

<style>
    div#bill-notify{
        position: fixed;
        bottom:1px;
        right:1px;
        padding:3px;
        width:200px;
        border-radius: 2px;
        z-index:1001;
    }
    .status-open{
        background:#44ed7cb2;
    }
    .status-close{
        background:#ee3333b2;
    }
    .status-reconnecting{
        background:#c2b65bb2;
    }
    .status-no-init{
        display: none;
    }
    
</style>