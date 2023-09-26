import Pagination from '../src/lib/Pagination.svelte'
import init from './init';
init.start();
//import ServerConnection from '../src/js/server'
//ServerConnection.setConfig({API:"https://lobby-bff.apiusoft.com",CLIENT_AUTH:"FORT2023FORTUNEUSOFFORTUNEBET12",CLIENT_CODE:"FORT"})


export default {
  title: 'Pagination',
  component: Pagination,
};


export const Pagination_ = () => ({
  Component: Pagination,
  props: {}
});

