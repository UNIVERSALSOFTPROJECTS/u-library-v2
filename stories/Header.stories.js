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
<<<<<<< HEAD
  props:{user, assetsUrl, platform:'GoldenBet'}
=======
  props:{user, assetsUrl:assetsUrl+"/goldenbet", platform:'Goldenbet'}
>>>>>>> a2dc001 (modal de depoosito listo)
})
export const showHeaderColisosport = ()=>({
  Component:Header,
  props:{user, assetsUrl:assetsUrl+"/coliseosport", platform:'Coliseosport'}
})

<<<<<<< HEAD
=======
export const showHeaderSuperderby = ()=>({
  Component:Header,
  props:{user, assetsUrl:assetsUrl+"/superderby", platform:'Superderby'}
})
>>>>>>> a2dc001 (modal de depoosito listo)
