<script>
  
  export let user = {};
  export let onLogout;
  export let onOpenMyAccount;

  export const logout = () => {
    //FALTA ir a Bancked a destruir session
    onLogout();
  };

</script>

<div class="profile-content">
  <div class="u-user-profile">
   <div class="user-profile">
    <img class="usericon1 s-pLY60ePxNKjT" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="">
      <table class="user">
        <div class="user-content">
          <tr>
            <th class="codigo">{user.username} #{user.serial}</th>
          </tr>
          <tr>
            <td>
              <button class="title-user" style="padding-left: 1rem;" on:click={onOpenMyAccount}>
              Mi cuenta
              <div><svg class="arrow-ic s-pLY60ePxNKjT" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" class="s-pLY60ePxNKjT"></path></svg></div>
              </button>
            </td>
          </tr>
        </div>
      </table>
    </div>
  
    <div class="balance-content">
      <table class="u-balance">
        <tr>
          <th class="balance">Saldo</th> <th class="bonus-balance">Saldo Bono</th>
        </tr>
        <tr>
          <td>{user.balance} <span class="currency">{user.currency}</span> </td>
          <td>{user.bonus_cab} <span class="currency">{user.currency}</span></td>
        </tr>
      </table>
    </div>
    <div class="button-exit">
      <button class="u-button-exit" on:click={logout}>
        <svg
        width="25px"
        height="25px"
        fill="white"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">
          <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480v32h32 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"/>
        </svg>
        <span style="color:#fff">Cerrar Sesión</span>
      </button>
    </div>
  </div>
</div>

<style>
  .currency{
    color: #ffc781;
  }
  .arrow-ic{
    width: 0.8rem;
    height: auto;
  }
  .usericon1{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    margin-top: 0.25rem;
  }
  .codigo{
    white-space: nowrap;
  }
  .profile-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 49rem;
    font-size: 0.7rem;
  }
  .u-user-profile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 0.7rem;
  }
  button {
    background-color: transparent;
    color: #5A5A5A;
    font-weight: bold;
    font-size: 0.7rem;
    cursor: pointer;
  }
  .user-profile {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .user {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .user-profile svg.ss {
    width: 2.7rem;
    height: 2.7rem;
    background-color: white;
    border-radius:2rem;
    position: absolute;
    left: -1.8rem;
    top: 0.2rem;
    border: 0.5px solid #5A5A5A;
  }
  .user-content th {
    background-color: transparent;
    width: 0.2rem;
    padding-left: 0.8rem;
    /*border: grey 1px solid;*/
  }
  .user-content td {
    width: 7rem;
    height: 1rem;
   /* border: grey 1px solid;*/
  }
  .title-user{
    border: none;
    border-color: none;
    border-style: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6rem;
  }
  .balance-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
  }
  .u-balance {
    width: 100%;
    font-size: 12px;
    border-radius: 2px;
    color: grey;
  }
  .u-balance tr {
    border: none;
  }
  .u-balance th {
    width: 7rem;
    justify-content: center;
    align-items: center;
    border-radius: 1px;
    color: white;
    /*border: #efc624 1px solid;*/
    height: 1rem;
  }
  .balance{
    background: transparent;
  }
  .bonus-balance{
    background: transparent;
  }
  .u-balance td {
    color: #fff;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    height: 1rem;
    border-radius: 1px;
    justify-content: center;
    align-items: center;
    text-align: center;
    /*border: #efc624 1px solid;*/
  }
  .u-button-exit{
    display: flex;
    border: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }
</style>
