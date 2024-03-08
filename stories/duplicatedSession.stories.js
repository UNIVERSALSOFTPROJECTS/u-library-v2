//import CashOut from '../src/lib/withdrawal/CashOut.svelte';
//import WithdrawalBank  from '../src/lib/withdrawal/WithdrawalBank.svelte';
import DuplicatedSessionListener from '../src/lib/DuplicatedSessionListener.svelte';
import UserHelper from '../src/js/UserHelper';
import init from './init';
init.start();

const conf = { WS_URL: 'ws://192.168.1.95:5000/lobbybff', CLIENT_CODE: "AAC1" };
const user = { username: 'dayana' };

let userState;
let active_view='home';

UserHelper.connectToLobbySocket(user, conf);

export default {
  title: 'DuplicatedSessionListener',
  component: DuplicatedSessionListener,
};


export const connect = () => ({
  Component: DuplicatedSessionListener,
  props: {userState, active_view}
});






