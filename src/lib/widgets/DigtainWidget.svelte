
<script>
  import { onMount } from "svelte";
  import ut from "../../js/util";
  export let user;
  export let loginModalOpen;
  export let onCategoryChange;
  export let clientCode;

  let DG_SERVER="https://sport.apiuniversalsoft.com";
  let SPORT_PARTNERID = '9553dcb3-fbe5-4041-9366-e89fd120cc91';
  const DG_SCRIPT = `/js/partner/bootstrapper.min.js`;

 
  let token = '-';
  const mode = 'LatinoView';
  let params = {
    target: "#top-application-container",
    token,
    defaultLanguage: "es",
  };
  const regex = /^[a-zA-Z]/;

  onMount(async() => {
    await ut.loadScript(DG_SERVER + DG_SCRIPT)
    switch(clientCode){
      case 'AAC1': DG_SERVER = 'sport.coliseosport.com'; SPORT_PARTNERID = 'b9e013bc-5556-4c44-9cab-1ed0d8821a7d'; break;
    }
    params.server = DG_SERVER;
    params.sportPartner = SPORT_PARTNERID;
    if (user && user.agregatorToken) {
      token=user.agregatorToken;
      params.token = token;
    }
    init(params);
  });

  async function init(params) {
      console.log("params init", params);
      let iframe = await Bootstrapper.boot(params, { name: "TopMatches" });
      console.log("iframe",iframe);
      //await addTopMatchesEventsListeners(iframe);
    }

    function addTopMatchesEventsListeners(topMatches) {
      topMatches.addEventListener('page-loaded', function handlePageLoad() {
        // Para escuchar la carga del widget de los mejores partidos
      });
      topMatches.addEventListener('navigateToEvent', async function (messageEvent) {
        if (messageEvent) onWidgetEventClick(messageEvent.data);

      });
    }
    
    const onWidgetEventClick = (event) => {
      if (token == '-') loginModalOpen = true;
      else{
        const eventInfo = event;
        const sportbookOptions = { gameid: "8042022_digitain", eventInfo };
        onCategoryChange("sportbook", sportbookOptions);
      }
    }
</script>



<div id="top-application-container"></div>


