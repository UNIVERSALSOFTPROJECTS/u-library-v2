import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import axios from 'axios';
import server from '../src/js/server.js';
import utils from '../src/js/util.js';
import { configureBffRoutes, getBffEndpoint } from '../src/js/bffRoutes.js';

const require = createRequire(import.meta.url);
const { parse } = require('svelte/compiler');
const allowedOrigins = new Set();
axios.interceptors.request.use(request => {
  assert.ok(allowedOrigins.has(new URL(request.url).origin), 'Tests must not contact real services');
  return { ...request, proxy: false, maxRedirects: 0 };
});
const configuration = base => ({ API_KS: base + '///', CLIENT_CODE: 'fixture-client', CLIENT_AUTH: 'fixture-auth',
  CLIENT_ID: '34', SITE_ID: 'fixture-site', platform: 'Fixture', 'x-tenant': 'fixture-tenant',
  GAMEAPI_URL: 'https://must-not-contact.invalid/game-api-nd/api', API_GAMES_NODE: 'https://must-not-contact.invalid/game-api-nd',
  API_WALLET: 'https://must-not-contact.invalid/wallet-service' });

async function fixture(run) {
  const calls = []; let status = 200;
  const mock = http.createServer((req,res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let body = ''; req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      calls.push({url,method:req.method,headers:req.headers,body});
      const data = status !== 200 ? {code:'FIXTURE_REJECTED'}
        : url.pathname.includes('/wallet/paymethods/') ? [{virtual:0,banco:'Fixture'}]
        : url.pathname.endsWith('/games/types') ? {tipos:[{code:'FIXTURE',total:3}]}
        : url.pathname.endsWith('/wallet/nxpay/signature') ? {signature:'fixture-signature',timestamp:'fixture-time'}
        : url.pathname.endsWith('/games/sportbook/launch') ? {success:true,launchType:'IFRAME_URL',payload:{url:'https://fixture.invalid/sport'}}
        : url.pathname.endsWith('/games/altenar/guest-launch') ? {success:true,url:'https://fixture.invalid/altenar'}
        : {url:'https://fixture.invalid/game?fixture=1',status:'READY',onlineHash:'fixture-hash',cashierUrl:'https://fixture.invalid/cashier'};
      res.writeHead(status,{'Content-Type':'application/json','Retry-After':'5'});res.end(JSON.stringify(data));
    });
  });
  await new Promise(resolve => mock.listen(0,'127.0.0.1',resolve));
  const origin = `http://127.0.0.1:${mock.address().port}`; allowedOrigins.add(origin);
  try { await run({origin,calls,setStatus:next => { status = next; }}); }
  finally { allowedOrigins.delete(origin); await new Promise(resolve => mock.close(resolve)); }
}

test('all migrated connectors select the consumer BFF and preserve request/return contracts', async () => fixture(async ({origin,calls}) => {
  for (const prefix of ['/lobby-bff','/bff-service-wr']) {
    const conf = configuration(origin+prefix); server.setConfig(conf);
    const methods = await server.wallet.getPayMethods('fixture +&');
    assert.equal(methods.status,200); assert.equal(methods.data[0].banco,'Fixture');
    assert.equal(calls.at(-1).url.pathname,`${prefix}/integrations/wallet/paymethods/fixture%20%2B%26`);
    const types = await server.game.getGamesTypeSlot(); assert.equal(types.data.tipos[0].code,'FIXTURE');
    assert.equal(calls.at(-1).url.search,'?cat=slot&type=wb&client=34');
    const data = await server.game.getGameURL(conf.GAMEAPI_URL,{gameid:'fixture-game',provider:'pg',brand:'Fixture',mode:'mb'},'fixture-session','wb','multiple');
    assert.equal(data.status,'READY'); assert.equal(calls.at(-1).url.pathname,`${prefix}/integrations/games/launch`);
    assert.equal(calls.at(-1).url.search,'?gameid=fixture-game&p=pg&r=url&b=Fixture&m=mb&sessionid=fixture-session&game_multiple=true');
    const sport = await server.game.openAuthenticatedSportbook(conf.GAMEAPI_URL,{sessionToken:'fixture +&',sportView:'live',mode:'mb',lang:'es-PE'});
    assert.equal(sport.launchType,'IFRAME_URL'); assert.equal(calls.at(-1).url.pathname,`${prefix}/integrations/games/sportbook/launch`);
    assert.equal(calls.at(-1).url.searchParams.get('sessionid'),'fixture +&');
    await server.game.openCmsWagerGame('fixture-session','fixture-cms','wb');
    assert.equal(calls.at(-1).url.searchParams.get('p'),'cmsw'); assert.equal(calls.at(-1).url.searchParams.get('r'),'url');
    const eSport = await server.u_game.gameURLTest({id:'fixture-esport',provider:'pnc'},'fixture-session');
    assert.equal(eSport.status,200); assert.equal(eSport.data.status,'READY');
    assert.equal(calls.at(-1).url.searchParams.get('view'),'ESPORTS-HUB');
    const payload = {amount:1234,currency:'PEN',reference:'fixture-ref',customerName:'José'};
    const signature = await server.u_user.generateSignatureToOrderPayIn(payload,'fixture_1_user');
    assert.equal(signature.data.signature,'fixture-signature');
    assert.equal(calls.at(-1).url.pathname,`${prefix}/integrations/wallet/nxpay/signature`);
    assert.equal(calls.at(-1).headers['x-token'],'fixture_1_user'); assert.equal(calls.at(-1).headers['x-client-code'],'fixture-client');
    assert.deepEqual(JSON.parse(calls.at(-1).body),payload);
    for (const call of calls.filter(c=>!c.url.pathname.includes('/nxpay/'))) {
      assert.equal(call.headers.client,'fixture-client'); assert.equal(call.headers.clientauth,'fixture-auth');
    }
    assert.equal(conf.GAMEAPI_URL,'https://must-not-contact.invalid/game-api-nd/api');
  }
  assert.equal(calls.length,14);
}));

test('URL helpers migrate known launches and Altenar guest while preserving queries and excluded Digitain', async () => fixture(async ({origin,calls}) => {
  const conf = configuration(origin+'/lobby-bff'); server.setConfig(conf);
  const first = utils.getGameURL(conf.GAMEAPI_URL,{gameid:'first_2024',provider:'first',brand:'Fixture',mode:'mb'},'fixture-session','pt');
  assert.equal(new URL(first).pathname,'/lobby-bff/integrations/games/launch'); assert.ok(first.endsWith('&lang=pt'));
  const testUrl = utils.getGameURLTest(conf.GAMEAPI_URL,{id:'fixture-id',provider:'pnc',mode:'wb'},'fixture-session');
  assert.equal(new URL(testUrl).searchParams.get('gameid'),'fixture-id');
  const auth = utils.getGameURLAltenar(conf.GAMEAPI_URL,'67000_ank','fixture-session','es','live');
  assert.equal(new URL(auth).pathname,'/lobby-bff/integrations/games/launch'); assert.ok(auth.endsWith('&lang=es&section=live'));
  const guest = utils.getGameURLAltenar('https://must-not-contact.invalid/game-api-jv/api/anakatech/opengame','67000_ank','123456789','es','live')+'&r=url';
  assert.equal(new URL(guest).pathname,'/lobby-bff/integrations/games/altenar/guest-launch');
  assert.deepEqual(new URL(guest).searchParams.getAll('r'),['r','url']);
  assert.equal((await server.game.getURL(guest)).success,true);
  const response = await server.game.getURLDemo(first+'&r=url'); assert.equal(response.status,'READY');
  const digitain = utils.getGameURL(conf.GAMEAPI_URL,{gameid:'fixture-edg',provider:'edg',brand:'Fixture',mode:'wb'},'fixture-session');
  assert.equal(new URL(digitain).pathname,'/game-api-nd/api/launch');
  await server.game.getGameURL(origin+'/legacy-games',{gameid:'fixture-edg',provider:'edg',brand:'Fixture',mode:'wb'},'fixture-session','wb');
  assert.equal(calls.at(-1).url.pathname,'/legacy-games/launch');
  // Generic URL clients remain clients, never a server-side arbitrary-URL forwarder.
  await server.game.getURL(origin+'/third-party/demo'); assert.equal(calls.at(-1).url.pathname,'/third-party/demo');
}));

async function componentFunction(file,name,context) {
  const source = await readFile(new URL('../src/lib/pages/'+file,import.meta.url),'utf8');
  const fn = parse(source).instance.content.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name===name);
  assert.ok(fn,`Missing actual component function ${name}`);
  const sandbox = vm.createContext({...context,backend:server,getBffEndpoint,console});
  new vm.Script(source.slice(fn.start,fn.end)+`; selected = ${name};`).runInContext(sandbox);
  return sandbox;
}

test('Golden Race and Horses V3 component functions no longer construct direct backend launches', async () => fixture(async ({origin,calls}) => {
  const conf=configuration(origin+'/lobby-bff');server.setConfig(conf);
  const golden = await componentFunction('GoldenRacePage.svelte','fetchGoldenRaceToken',{
    userState:'loggedIn',gameToken:'fixture-session',GAMEAPI_URL:conf.GAMEAPI_URL,fetchedCashierUrl:null});
  assert.equal(await golden.selected(),'fixture-hash'); assert.equal(golden.fetchedCashierUrl,'https://fixture.invalid/cashier');
  const horses = await componentFunction('HorsesPageV3.svelte','initHorsesLaunch',{
    gameToken:'fixture-session',GAMEAPI_URL:conf.GAMEAPI_URL,isRequestSent:false,loading:false,errorMsg:'',iframeUrl:'',
    visualCurrency:'PEN',hiddenBetTicket:true,window:{location:{hostname:'shop.deportetotal.bet'}}});
  await horses.selected(); assert.equal(horses.errorMsg,''); assert.equal(horses.loading,false);
  assert.ok(horses.iframeUrl.endsWith('&theme=deportetotal&visualCurrency=PEN&hiddenBetTicket=true'));
  for(const call of calls)assert.equal(call.url.pathname,'/lobby-bff/integrations/games/launch');
}));

test('missing/invalid BFF configuration fails locally and never falls back to legacy production', async () => {
  configureBffRoutes({API_WALLET:'https://must-not-contact.invalid'});
  assert.throws(()=>getBffEndpoint('launch'),/BFF_API_KS_REQUIRED/);
  await assert.rejects(server.wallet.getPayMethods('fixture'),/BFF_API_KS_REQUIRED/);
  for(const base of ['https://user:pass@fixture.invalid','javascript:alert(1)','https://fixture.invalid?x=1','https://fixture.invalid#x','not a url']) {
    configureBffRoutes({API_KS:base});assert.throws(()=>getBffEndpoint('launch'),/INVALID_BFF_API_KS/);
  }
  configureBffRoutes({API_KS:'/lobby-bff/'}); assert.equal(getBffEndpoint('launch'),'/lobby-bff/integrations/games/launch');
  assert.throws(()=>getBffEndpoint('arbitrary'),/UNKNOWN_BFF_OPERATION/);
});

test('launch and Nexo failures preserve status without retries', async () => fixture(async ({origin,calls,setStatus}) => {
  server.setConfig(configuration(origin+'/bff-service-wr'));
  for(const status of [401,403,429,502,503]) {
    setStatus(status);const before=calls.length;
    await assert.rejects(server.game.openCmsWagerGame('fixture-session','fixture','wb'),e=>e.response?.status===status);
    await assert.rejects(server.u_user.generateSignatureToOrderPayIn({amount:100},'fixture_1_user'),e=>e.response?.status===status);
    assert.equal(calls.length,before+2);
  }
}));

test('actual library connectors against optional local Postman BFF simulations', {skip:!process.env.ULIB_BFF_SIM_URL}, async () => {
  const base=process.env.ULIB_BFF_SIM_URL;assert.equal(new URL(base).hostname,'127.0.0.1');allowedOrigins.add(new URL(base).origin);
  try {
    for(const bff of ['lobby','bff']) {
      server.setConfig(configuration(base+'/'+bff));
      assert.equal((await server.wallet.getPayMethods('fixture-session')).data[0].banco,'Fixture');
      assert.equal((await server.game.getGamesTypeSlot()).data.tipos[0].code,'FIXTURE');
      assert.equal((await server.game.openCmsWagerGame('fixture-session','fixture-cms','wb')).status,'READY');
      assert.equal((await server.game.openAuthenticatedSportbook('https://must-not-contact.invalid', {sessionToken:'fixture-session'})).success,true);
      const guest=utils.getGameURLAltenar('https://must-not-contact.invalid','67000_ank','123456789','es','live')+'&r=url';
      assert.equal((await server.game.getURL(guest)).success,true);
      assert.equal((await server.u_user.generateSignatureToOrderPayIn({amount:100,currency:'PEN'},'fixture_1_user')).data.signature,'fixture-signature');
    }
  } finally {allowedOrigins.delete(new URL(base).origin);}
});
