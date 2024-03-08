
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();


let userState = 'logout';
let active_view = null;
let user = {};
let loginModalOpen = false;
let options = {
  gameid: 'wintech_gaming'
};
let GAMEAPI_URL = 'https://apiuniversalsoft.com/api';
let modalOpened;



export default {
  title: 'SportbookPage',
  component: SportbookPage,
};






export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: { user, active_view, modalOpened, loginModalOpen, userState, options, GAMEAPI_URL }
});






