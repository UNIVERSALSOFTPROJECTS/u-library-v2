
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();


let userState = 'loggedIn';
let active_view = 'sportbook';
let user = {};
let loginModalOpen = false;
let options = {
  gameid: 'novusbet',
  gameToken: '8697156863640wfuryxnmmgioshgplcxrevkvby9dbs1eq0961qbvrmu6uvzpqnyfdgcce7u6cbtlseeam0fjisgusasaoktjlwnvsa0ij32xqox5v5asxfitbw0hdjdfnht3fke8adxf'
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






