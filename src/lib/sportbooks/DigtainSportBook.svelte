<script>
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  
  export let user;
  export let loginModalOpen;
  export let clientCode;
  export let options
  export let internalPage;

  const DG_SCRIPT = `/js/partner/bootstrapper.min.js`;
  let deviceiframe =  ut.isMobile() ? "mb" : "wb";
  let DG_SERVER="https://sport.apiuniversalsoft.com";
  let SPORT_PARTNERID = '9553dcb3-fbe5-4041-9366-e89fd120cc91';
  let token = '-';
  let eventInfo = '';
  const mode = 'LatinoView';

  

  let params = {
    containerId: "application-container",
    token,
    defaultLanguage: "es",
    parent: ["test.apiuniversalsoft.com", "apiuniversalsoft.com", "test-2.apiusoft.com", "srv-prod.apiusoft.com", "www.coliseosport.com", "coliseosport.com"],
    externalLinksOpenInside: true
  }

  onMount(async()=>{
    document.body.style.overflow="hidden";
    await ut.loadScript(DG_SERVER + DG_SCRIPT)
    switch(clientCode){
      case 'AAC1': DG_SERVER = 'sport.coliseosport.com'; SPORT_PARTNERID = 'b9e013bc-5556-4c44-9cab-1ed0d8821a7d'; break;
    }
    params.server = DG_SERVER;
    params.sportPartner = SPORT_PARTNERID;
    if(options.eventInfo){
      eventInfo = JSON.stringify(deviceiframe == "wb"?options.eventInfo:options.eventInfo.Id);
    }
    if (token == '-') params.login = function () { loginModalOpen = true; }
    if (eventInfo != '') { openSpecificMatch(params, mode, eventInfo); }
    else if (internalPage == 'live'){openLive(params, mode)}
    else { openPreMatch(params, mode) } 
  });

  $: {
    if (user && user.agregatorToken) {
      token=user.agregatorToken;
      params.token = token;
    }
  }

  const openSpecificMatch = async (params, mode, event) => {
      event = JSON.parse(event);
      let latinoView = await Bootstrapper.boot(params, { name:mode });
      latinoView.navigateTo(`event-details?champ=${event.champ}&country=${event.country}&event=${event.Id}&sport=${event.sport}&supertip=0&live=${event.isLive}`);
    }

    const openLive = async (params, mode) => {
      let latinoView = await Bootstrapper.boot(params, { name: mode });
      latinoView.navigateTo("/live" );
      latinoView.addEventListener("onNavigate", function (event) {
        console.log(event.data);
      });
    }
    const openPreMatch = async (params, mode) => {
      let latinoView = await Bootstrapper.bootIframe(params, { name: mode }, { height: "900px" });
      latinoView.navigateTo("/preMatch");
    }

  
  onDestroy(async () => {
    let {data} = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.getElementById("betslip-container-element").remove();
  })

</script>

<div class="sportbook-content">
  <div id="application-container" style="height:100vh"></div>
  
</div>

<style>
  @media only screen and (max-width: 1200px) {
    .sportbook-content{
      width: 100%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .sportbook-content{
      width: 100vw;
    }
  }
</style>
