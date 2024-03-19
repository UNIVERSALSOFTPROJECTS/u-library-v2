
import DigtainWidget from '../src/lib/widgets/DigtainWidget.svelte'
import init from './init';
init.start();

//export let onCategoryChange


let userState = 'logout';
let active_view = 'sportbook';
let loggedUser = {agregatorToken: '2856783'};
let user = {}
let loginModalOpen = false;
let clientCode
let GAMEAPI_URL = 'https://apiuniversalsoft.com/api';



export default {
  title: 'Widgets',
  component: DigtainWidget
};


const onCategoryChange =() =>{
  alert('cambio categoria');
}


export const WidgetsGuestUser = () => ({
  Component: DigtainWidget,
  props: { user: {}, loginModalOpen, clientCode, onCategoryChange }
});


export const WidgetsloggetUser = () => ({
  Component: DigtainWidget,
  props: { user: loggedUser, loginModalOpen, clientCode, onCategoryChange }
});





