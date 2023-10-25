<script>
  import ServerConnection from "../../js/server";
   import notify from "../../js/notify";
  export let open;
  export let user;
  export let onError;

  let depositCode = "";
  let active_type_method = "TD";

  const closeModal = () => {
    open = false;
  };

  const confirmDeposit = async () => {
    if (!depositCode)  return notify.error("codigo Obligatorio");
    try {
      notify.loading("Esta siendo procesado el codigo")
      let { data } = await ServerConnection.u_wallet.confirmCashin(user.token,{code:depositCode});
      user.balance= data.balance;
      notify.success("Procesado correctamente");
    } catch (e) {
      console.log("ERROR", e);
      if(e.response.data.errorCode == "CODE_NOT_FOUND") return notify.error("El codigo ingresado no existe");
      else if(e.response.data.errorCode == "STATUS_IS_NOT_PENDING") return notify.error("El codigo ingresado ya ha sido confirmado");
      onError("Error al procesar deposito", e);
    }
  };

  const isOnlyNumber = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      notify.error("Ingrese solo números");
    }
  };
</script>
<div class="deposit-body">
  <div class="deposit__header">
    <button
      class="deposit__btn-direct {active_type_method == 'TD' ? 'u-type-method' : ''}"
      on:click={() => {active_type_method = "TD";}}>Confirmar Recarga
    </button>
    <button class="btn close" on:click={closeModal}></button>
  </div>

  <div class="deposit__iframe__body">
        <b>Ingrese Codigo de Recarga</b> 
        <div class="deposit__iframe--code">
          <input
            aria-label="charge-code-txt"
            class="ipt"
            type="text"
            inputmode="numeric"
            placeholder="Código de recarga"
            bind:value={depositCode}
            on:keypress={isOnlyNumber}
          />
          <button class="btn deposit__iframe--code--active" on:click={confirmDeposit}>Activar</button >
        </div>
        <div class="deposit__iframe--text">
          <p>
            Todos los depósitos serán acreditado a su cuenta en moneda local.
            Al depositar dinero a su cuenta, usted acepta automáticamente la
            versión mas reciente de los
            <a
              href="https://assets.apiusoft.com/365fortuna/t&c.pdf"
              target="_blank"
              style="color:red;">términos y condiciones</a
            >
          </p>
          <p class="u-wrapp-deposit-title2">IMPORTANTE</p>
          <p>
            Acepto que al enviar el formulario estoy de acuerdo con los términos
            y condiciones de la Página web
          </p>
            
            
        </div>
      </div>
</div>

<style>
  button {
    cursor: pointer;
  }
  input:focus-visible {
      outline: 0;
  }
  
  .u-wrapp-deposit-title2 {
    color: red;
    font-weight: 600;
    font-size: 0.9rem;
  }
  @media only screen and (max-width: 1199px) {
    .u-type-method {
      background-color: #ffbf00;
    }
  }
  @media only screen and (min-width: 1200px) {
    

    
  }
</style>
