<script>
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager";

  export let user;
  export let onSubmitted;

  function phoneOnlyNumber(event) {
    let isNumber = /\d/.test(event.key);
    if (isNumber && user.phone.length < 9) user.phone += event.key;
    console.log(user.phone.length);
  }

  const saveMyAccount = async (event) => {
    let isEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(user.email);
    if (!isEmail) {
      EventManager.publish("notify", {
        mode: "error",
        msg: "Formato de e-mail incorrecto",
      });
      return;
    }
    try {
      let params = {
        playerId: user.playerId,
        phone: user.phone,
        state: 1,
        address: user.address,
        city: user.city,
        serial: user.serial

      }
      //user.serial_api_casino = user.serial;
      close();
      await backend.u_user.saveMyAccount(params);
      onSubmitted("ok");
    } catch (e) {
      console.log(e);
      onSubmitted("error", e);
    }
  };
</script>

<div class="u-main-form">
  <input type="email" class="ipt" bind:value={user.email} disabled />
  <input type="text" class="ipt" bind:value={user.username} disabled />
  <input type="text" class="ipt" bind:value={user.name} disabled />
  <input type="text" class="ipt" bind:value={user.birthday} disabled />
  <input
    type="text"
    class="ipt"
    on:keypress|preventDefault={(e) => phoneOnlyNumber(e)}
    bind:value={user.phone}
    placeholder="Ingrese su número..."
  />
  <input type="text" class="ipt" bind:value={user.city} placeholder="Ciudad"/>
  <input type="text" class="ipt" bind:value={user.address} placeholder="Dirección"/>
  <select class="slc ipt" name="country" bind:value={user.country} disabled>
    <option value="51">Peru</option>
  </select>
  <button class="ipt btn-save" on:click={saveMyAccount}>Guardar</button>
</div>

<style>
  input:focus-visible {
    outline: 0;
  }
  select:focus-visible {
    outline: 0;
  }
  .u-main-form {
    padding: 0.6rem;
    height: auto;
  }
  .btn-save {
    background-color: #c4b103;
    cursor: pointer;
  }
  .ipt {
    border: 1px solid rgb(208 206 206);
    color: #000;
  }

  @media only screen and (max-width: 1200px) {
    .u-main-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
  }
  @media only screen and (min-width: 1201px) {
    .u-main-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
    .ipt {
      border: 1px solid rgb(208 206 206);
    }
  }
</style>
