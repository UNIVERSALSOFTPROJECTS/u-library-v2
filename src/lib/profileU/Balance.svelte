<script>
  //export let open;
  export let user;
</script>

<div class="u-main-content">
  <div class="wrap-content">
    <div class="u-title">
      <span class="u-title-info">SALDO</span>
    </div>
    <div class="u-info-balance">
      <div class="u-title-balance">{user.currency} {user.balance}</div>
    </div>
  </div>
</div>

<style>
  @media only screen and (max-width: 1200px) {
    .u-main-content {
      padding: 0.5rem;
    }
    .wrap-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem;
    }
    .u-title-info {
      color: rgb(144, 144, 144);
      font-size: 14px;
    }
    .u-info-balance {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .u-title-balance {
      color: black;
      font-size: 3rem;
    }
  }
  @media only screen and (min-width: 1201px) {
    .u-main-content {
      padding: 0.5rem;
    }
    .wrap-content {
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 35%;
      padding: 0.5rem;
      border-radius: 0.4rem;
    }
    .u-title-info {
      color: rgb(144, 144, 144);
      font-size: 14px;
    }
    .u-info-balance {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .u-title-balance {
      color: black;
      font-size: 3rem;
    }
  }
</style>
