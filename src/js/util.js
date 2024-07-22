const utils = (() => {

  
  const showNotify = async(type, message) => {
    await sleep(0.1);
    let notify = { open: true, type, message };
    return notify
  }
    const sleep=(seconds)=>{
      return new Promise( (result)=>{ setTimeout( ()=>{ result()  },seconds*1000 ) } )
    }
    const checkSetIsFav=(games, favGames)=>{
      if(!Array.isArray(games)) return []
      let favs = favGames.map(e=>e.id)
      return games.map(g=>({...g, isFav: favs.includes(g.id) }))
    }
    const getImgUrl=(assets, game)=>{
      return `${assets}/us_img_games/${game.category}_${game.brand.replace(/ /g, "_")}_1_${game.gameid}.png`;
    }
    const getProviderImgUrl= (assets, game) =>{
      return `${assets}/us_img_brands/${game.brand}.png` 
    }
    const getGameURL=(gameapi_url,game, usertoken)=>{
      let url = gameapi_url +`/launch?gameid=${game.gameid}&p=${game.provider}&b=${game.brand}&m=${game.mode}&sessionid=${usertoken}&game_multiple=true`;
      return url;
    }
  const getGameURLPinnacle = (gameapi_url, game, usertoken) => {
    let url = gameapi_url + `/launch?gameid=${game.id}&m=${game.mode}&sessionid=${usertoken}`;
    return url;
  }
    const isMobile= () => {//tengo una manera mas reducida de hacer esto
      let check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      console.log("CJECK", check);
      return check;    
    }

    const dateDiffInDays= (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

    const getAge=(dateString)=> {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const isJson=(str)=>{
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
    const setUrlPage=(page)=>{
      history.pushState({name: page}, null, page);
    }
    const categoryAllowedChange=(category, userState)=>{
      return ( /horses|sportbook|esports/.test(category) && userState == "logout")
    }
    const initDropdown=()=>{
      let isDropdownOpen = false;
      function handleClickOutside(event) {
        if (!event.target.closest('.dropdown')) isDropdownOpen = false;
        else isDropdownOpen = true;
        }
      document.addEventListener('click', handleClickOutside);
        //return () => { document.removeEventListener('click', handleClickOutside) };
      document.removeEventListener('click', handleClickOutside);
      return isDropdownOpen;
    }

  const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
      try {
        const scriptEle = document.createElement("script");
        scriptEle.type = type;
        scriptEle.async = async;
        scriptEle.src = FILE_URL;

        scriptEle.addEventListener("load", (ev) => {
          resolve({ status: true });
        });

        scriptEle.addEventListener("error", (ev) => {
          reject({
            status: false,
            message: `Failed to load the script ${FILE_URL}`
          });
        });

        document.body.appendChild(scriptEle);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { loadScript, isJson, initDropdown, showNotify, sleep, checkSetIsFav, getImgUrl, getProviderImgUrl, getGameURL, isMobile, dateDiffInDays, getAge, setUrlPage, categoryAllowedChange, getGameURLPinnacle } ;
})()
export default utils
