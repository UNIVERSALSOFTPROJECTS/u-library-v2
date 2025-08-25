import LoginTest from '../src/lib/LoginFullScreenTest.svelte';
import init from "./init.js";
let user=null;
let assetsUrl="https://d1dkqs4jlldj3s.cloudfront.net";

init.start();

export default {
  title: 'LoginTest',
  component: LoginTest,
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

export const showHeaderApuestadepana = ()=>({
  Component:LoginTest,
  props:{user, assetsUrl, platform:'Apuestadepana'}
})
