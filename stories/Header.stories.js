import Header from '../src/components/Header.svelte';
import init from "./init.js";
let user=null;
let assetsUrl="https://assets.apiusoft.com";

init.start();

export default {
  title: 'Header',
  component: Header,
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
  Component:Header,
  props:{user, assetsUrl:assetsUrl+"/babieca", platformClass:'babieca'}
})

export const showHeaderGoldenbet = ()=>({
  Component:Header,
  props:{user, assetsUrl, platformClass:'babieca'}
})

