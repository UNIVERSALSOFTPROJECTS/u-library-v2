<script>
    import { onMount } from "svelte";
    export let user;

    import { Client } from '@stomp/stompjs';

    let stompClient;
    const brokerURL="ws://127.0.0.1:8181";

    $:{//escuchara cambios en table user.
        if(user !== undefined && user.token){
            connectUserToBillCollector(user);
        }
    }

    const connectUserToBillCollector=(user)=>{
        let playerId = user.userId;
        let token = user.token;
        stompClient.publish({destination:"/", body:{playerId, token} });
    }

    const startSocket=()=>{

            stompClient = new Client({
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

        stompClient.activate();
    }

    onMount( ()=>{
        startSocket();
    });
</script>