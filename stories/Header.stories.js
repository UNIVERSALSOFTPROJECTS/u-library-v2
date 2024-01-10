import Header from '../src/lib/Header.svelte';
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
  props:{user, assetsUrl:assetsUrl+"/babieca", platform:'Babieca'}
})
export const showHeaderGoldenbet = ()=>({
  Component:Header,
  props:{user, assetsUrl:assetsUrl+"/goldenbet", platform:'Goldenbet'}
})

export const showHeaderColisosport = ()=>({
  Component:Header,
  props:{user, assetsUrl, platform:'Coliseosport'}
})
export const showHeaderApuestadepana = ()=>({
  Component:Header,
  props:{user, assetsUrl, platform:'Apuestadepana'}
})

export const showHeaderSuperderby = ()=>({
  Component:Header,
  props:{user, assetsUrl:assetsUrl+"/superderby", platform:'Superderby'}
})

export const showHeaderJetbet24 = ()=>({
  Component:Header,
  props:{user, assetsUrl, platform:'Jetbet24'}
})

export const showHeaderGanawin = ()=>({
  Component:Header,
  props:{user, assetsUrl, platform:'Ganawin'}
})
