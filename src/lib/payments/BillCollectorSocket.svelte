<script>
    import { onMount } from "svelte";
    export let user;

    //import { Client } from '@stomp/stompjs';

    //let stompClient;
    let socket;
    let connnected;
    const brokerURL="ws://127.0.0.1:8181";

    $:{//escuchara cambios en table user.
        if(user !== undefined && user.token){
            console.log("USERSSSSSSSS", user);
            connectUserToBillCollector(user);
        }
    }

    const connectUserToBillCollector=(user)=>{
        let playerId = user.playerId;
        let token = user.token;
        console.log("Socket", socket);
        //stompClient.publish({destination:"/", body:{playerId, token} });
        socket.send(JSON.stringify({playerId, token}));
    }

    const startSocket=()=>{

        socket = new WebSocket(brokerURL);

        socket.addEventListener("open", (event) => {
            console.log("conectado a BillCollector");
            connnected = true;
            // Enviar datos al servidor después de la conexión
            //const Tokens = { Token, Player_id };
            //socket.send(JSON.stringify(Tokens));

            
        });

        socket.addEventListener("message", (event) => {
            console.log("mensaje ",event.data);
        });

        socket.addEventListener("close", (event) => {
            console.log("cerrado");
        });

    // Manejar errores
    socket.addEventListener("error", (event) => {
      //logMessage(Error: ${event.message});
      console.log("Error", event);
    });




        /*stompClient = new Client({
                    brokerURL,
                    connectHeaders: {},
                    debug: function (str) {console.log(str);},
                    reconnectDelay: 2500,
            });

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/newBill', (data) => {
                    console.log("newBill",JSON.parse(data.body));
                    //EventManager.publish("changeBalance",JSON.parse(data.body) )

            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with BillCollector Websocket', error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();*/
    }

    onMount( ()=>{
        startSocket();
    });
</script>