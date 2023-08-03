import Payments from '../src/lib/payments/PaymentGateway.svelte';
import init from "./init.js";
let user=null;
let assetsUrl="https://assets.apiusoft.com";



init.start();

export default {
  title: 'Payments',
  component: Payments,
  //parameters: {  layout: 'fullscreen',},
};




/*export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};*/

//export const LoggedOut = {};

export const showHeaderBabieca = ()=>({
  Component:Payments,
  //props:{user, assetsUrl:assetsUrl+"/babieca", platformClass:'babieca'}
})



