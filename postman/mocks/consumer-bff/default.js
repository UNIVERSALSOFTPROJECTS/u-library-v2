// Fixtures of the six BFF contracts; no real providers, payments, accounts or database.
const http = require('http');
http.createServer((req,res) => {
  const url = new URL(req.url,'http://localhost');
  const reply = (status,body) => {res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body));};
  if(req.method==='POST' && url.pathname==='/integrations/wallet/nxpay/signature') {
    if(!req.headers['x-token']||req.headers['x-client-code']!=='fixture-client')return reply(401,{code:'FIXTURE_AUTH_REQUIRED'});
    if(!req.body||typeof req.body!=='object'||Array.isArray(req.body))return reply(400,{code:'INVALID_JSON_BODY'});
    return reply(200,{signature:'fixture-signature',timestamp:'fixture-time'});
  }
  if(req.method!=='GET')return reply(501,{code:'ENDPOINT_NOT_MODELED'});
  if(req.headers.client!=='fixture-client'||req.headers.clientauth!=='fixture-auth')return reply(403,{code:'FIXTURE_CLIENT_REQUIRED'});
  if(url.pathname.startsWith('/integrations/wallet/paymethods/'))return reply(200,[{virtual:0,banco:'Fixture'}]);
  if(url.pathname==='/integrations/games/types')return reply(200,{tipos:[{code:'FIXTURE',total:3}]});
  if(url.pathname==='/integrations/games/launch')return reply(200,{status:'READY',url:'https://fixture.invalid/game'});
  if(url.pathname==='/integrations/games/sportbook/launch')return reply(200,{success:true,launchType:'IFRAME_URL',payload:{url:'https://fixture.invalid/sport'}});
  if(url.pathname==='/integrations/games/altenar/guest-launch') {
    if(url.searchParams.get('t')!=='123456789'||url.searchParams.getAll('r').join(',')!=='r,url')return reply(400,{code:'FIXTURE_GUEST_QUERY_REQUIRED'});
    return reply(200,{success:true,url:'https://fixture.invalid/altenar'});
  }
  return reply(501,{code:'ENDPOINT_NOT_MODELED'});
}).listen(process.env.PORT||4500);
