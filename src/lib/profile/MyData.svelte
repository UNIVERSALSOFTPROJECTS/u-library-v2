<script>
import backend from "../../js/server";
import EventManager from "../../js/EventManager";


export let user;
export let onSubmitted;



function phoneOnlyNumber(event) {
  let isNumber = /\d/.test(event.key);
  if (isNumber && user.phone.length < 9) user.phone += event.key;
  console.log(user.phone.length);
};

const saveMyAccount = async (event) => {
    let isEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(user.email);
    if (!isEmail) {
      EventManager.publish("notify", {mode:"error", msg:"Formato de e-mail incorrecto"});
      return;
    }
    try {
      user.serial_api_casino = user.serial;
      close();  
      await backend.saveMyAccount(user);
      onSubmitted("ok")
    } catch (e) {
      console.log(e)
      onSubmitted("error",e)
    }
};

</script>

  <div class="u-main-form">
    <div class="u-form">
      <div class="u-input u-form-label">
        <input type="email" class="u-form-control u-disabled" id="floatingInput" bind:value={user.email}
          disabled>
        <label for="">Email address</label>
      </div>
      <div class=" u-form-label">
        <input type="text" class="u-form-control u-disabled" id="floatingInput" bind:value={user.username}
          disabled>
        <label for="">username</label>
      </div>
      <div class=" u-form-label">
        <input type="text" class="u-form-control u-disabled" id="floatingInput" bind:value={user.name}
          disabled>
        <label for="">name</label>
      </div>
      <div class=" u-form-label">
        <input type="text" class="u-form-control u-disabled" id="floatingInput" bind:value={user.birthday}
          disabled>
        <label for="">birthday</label>
      </div>
      <div class="u-col-input u-control-select-phone-country">
          <input type="text" class="u-form-control u-form-phone" id="floatingInput" on:keypress|preventDefault={(e)=>phoneOnlyNumber(e)} bind:value={user.phone}
          >
          <label for="">Phone</label>
      </div>
      <div class=" u-form-label">
        <input type="text" class="u-form-control" id="floatingInput" bind:value={user.city}>
        <label for="">city</label>
      </div>
      <div class=" u-form-label">
        <input type="text" class="u-form-control" id="floatingInput" bind:value={user.address}>
        <label for="">Address</label>
      </div>
      <div class="u-control-select-country">
        <select class="u-select-country u-input" name="country" bind:value={user.country} disabled>
          <option value="51">Peru</option>
          <option value="55">Brasil</option>
          <option value="591">Bolivia</option>
          <option value="54" >Argentina</option>
          <option value="56">Chile</option>
          <option value="57">Colombia</option>
          <option value="506">Costa Rica</option>
          <option value="593">Ecuador</option>
          <option value="504">Honduras</option>
          <option value="505">Nicaragua</option>
          <option value="507">Panama</option>
          <option value="595">Paraguay</option>
          <option value="598">Urugauay</option>
          <option value="58">Venezuela</option>
        </select>  
      </div>
      <div class="u-control-button">
        <button class="u-control-button-save" on:click={saveMyAccount}>SAVE CHANGES</button>
      </div>
    </div>
  </div>

<style>
  input:focus-visible{
    outline: 0;
  }
  select:focus-visible{
    outline: 0;
  }
  .u-main-form{
    padding: 0.6rem;
    height: auto;
  }
  .u-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: white;
    border-radius: 0.4rem;
    width: 40%;
    height: auto;
    padding: 1rem;
    padding-right: 3rem;
  }
  .u-col-input {
    text-align: center;
    position: relative;
    width: 100%;
  }
  .u-control-select-phone-country{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .u-phone-country{
    border: 1px solid #b6bcc3;
    height: 3.75rem;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0;
    border-bottom-right-radius:  0;
    border-bottom-left-radius:  0.2rem;
  }
  .u-control-button{
    width: 100%;
    padding-left: 1.5rem;
  }
  .u-control-button-save{
    width: 100%;
    padding: 0.5rem;
    color: #15cc80;
    border: 1px solid #9EA4AE;
    font-weight:700;
    border-radius: 0.4rem;  
    cursor: pointer;
  }
  .u-control-button-save:hover{
    background-color: rgb(154, 214, 194);
    cursor: pointer;
  }
  .u-form-label {
    position: relative;
    width: 100%;
  }
  .u-form-label>.u-form-control:not(:placeholder-shown)~label{
    opacity: .65;
    transform: scale(.85) translateY(-0.5rem) translateX(0.15rem);
  }
  .u-form-label>label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 1rem 0.75rem;
    transform-origin: 0 0;
    transition: opacity .1s ease-in-out,transform .1s ease-in-out;
  }
  .u-form-label>.u-form-control:focus, .u-form-label>.u-form-control:not(:placeholder-shown) {
    padding-top: 0.5rem;
  }
  .u-form-label>.u-form-control{
    height: calc(3rem + 2px);
  }
  .u-form-control {
    display: block;
    width: 100%;
    padding: 0rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .u-control-select-country{
    width: 100%;
  }
  .u-select-country{
    width: 107%;
    height: 3.5rem;
    border-radius: 0.2rem;
  }
  .u-disabled{
    background-color: rgb(225, 238, 234);
    color: #9EA4AE;
  }
  .u-form-phone{
    border-top-left-radius: 0;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius:  0.2rem;
    border-bottom-left-radius:  0;
  }
</style>
