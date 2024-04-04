<script>
    export let user;
    console.log(user);
</script>

<div class="modal-body">
    <div class="profile__top">
        <div class="profile__header">
            <img class="profile__img" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="icon-user">
            <div>
                <b>{user.username}</b>
                <p>#{user.id}</p>
            </div>
        </div>
        <button class="btn icon--copy"></button>
    </div>
    <span class="profile__balance"> Saldo: {user.balance} <b>{user.currency}</b></span>
    <span class="profile__balance">
        <span> Saldo Bono: {user.bonus_sumTotal} <b>{user.currency}</b></span>
        <div>
            <span> Mega Bono: {user.bonus_global} <b>{user.currency}</b></span>
            <span> Casino: {user.bonus_global} <b>{user.currency}</b></span>
            <span> Deportivas: {user.bonus_global} <b>{user.currency}</b></span>
            <span> Caballos: {user.bonus_global} <b>{user.currency}</b></span>
        </div>
    </span>
</div>