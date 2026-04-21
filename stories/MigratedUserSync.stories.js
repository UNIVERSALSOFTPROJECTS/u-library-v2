import MigratedUserSync from '../src/lib/modals/MigratedUserSync.svelte';

export default {
  title: 'Modals/MigratedUserSync',
  component: MigratedUserSync,
};

const onOk = (msg) => console.log('OK:', msg);
const onError = (msg) => console.log('ERROR:', msg);
const t = (key) => key;

const user = {
  "balance": "648.45",
  "id": 1229333,
  "username": "ganawin_pm",
  "id_ca": "6916",
  "id_banca": "3441",
  "server": "1010",
  "active": true,
  "currency_id": 13,
  "currency": "MXN",
  "email": "ganawin_pm@gmail.com",
  "token": "72e7626088567b4be0ce7b68ea10f8917172b8fdd8b073fc103fcaf00bd48c8b",
  "serial": "7491325248207",
  "agregatorToken": "7491325248207vxluszscoafvikruyb5mlm3tcv7ebz39tdci2i95nw2wzoayy2la8moofhzwbnxginpbrpp1vrtkafnbgvhuqdaik9vhim1qkeyxmdia9y1022cqeiuscdfh6oqtdcle",
  "bonus_global": "0.00",
  "bonus_horses": "0.00",
  "bonus_slot": "0.00",
  "bonus_sportbook": "0.00",
  "bonus_sumTotal": "0.00"
};

const accountUser = {
  "name": "ganawin_pm",
  "phone": "93043443",
  "timezone": "America/Lima",
  "document": "0",
  "doctype": "",
  "email": "ganawin_pm@gmail.com",
  "birthday": "1900-01-01",
  "country": "",
  "state": "",
  "start": "2024-01-15",
  "lastlogin": "2024-01-15",
  "address": "",
  "city": "",
  "username": "ganawin_pm",
  "token": "",
  "serial_api_casino": "",
  "agregatorToken": ""
}

const configProfile = {
  doctype: ['DNI', 'RUT', 'CI'],
  id_banca: [1],
  id_ca: [1],
};

export const Default = () => ({
  Component: MigratedUserSync,
  props: {
    user,
    accountUser,
    configProfile,
    t,
    onOk,
    onError,
    getMyAccount: () => console.log('refresh account'),
  },
});
