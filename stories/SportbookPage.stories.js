
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();

let active_view = 'sportbook';
let user = {};
let loginModalOpen = false;
let userState = 'logout';
let options = {
  gameid: '8042022_digitain',
}


let GAMEAPI_URL = 'https://apiuniversalsoft.com/api';
let modalOpened;
let clientCode = 'GOLD'



export default {
  title: 'SportbookPage',
  component: SportbookPage,
};






export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: { user, active_view, modalOpened, loginModalOpen, userState, options, GAMEAPI_URL, clientCode }
});






