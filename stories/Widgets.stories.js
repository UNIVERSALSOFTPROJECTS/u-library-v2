
import DigtainWidget from '../src/lib/widgets/DigtainWidget.svelte'
import init from './init';
init.start();


let userState = 'logout';
let active_view = 'sportbook';
let user = {};
let loginModalOpen = false;
let modalOpened;

let GAMEAPI_URL = 'https://apiuniversalsoft.com/api';



export default {
  title: 'Widgets',
  component: DigtainWidget
};






export const Widgets = () => ({
  Component: DigtainWidget,
  props: { user, active_view, modalOpened, loginModalOpen, userState, GAMEAPI_URL }
});






