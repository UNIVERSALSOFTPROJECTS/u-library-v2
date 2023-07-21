<script>
  export let open;
  export let clazz="";
  export let title="";

  function statusModal(isActive) {
    const body = document.body.classList;
    isActive?body.add('modal__open'):body.remove('modal__open');
  }
  $: statusModal(open);
</script>

{#if open}
{clazz}
<div class="modal {clazz}">
  <div class="modal-dialog centered">
    <div>
    </div>
    <div class="modal-content">
        <div class="modal-header">
            <div></div>
            <div>{title}</div>
            <button class="btn close" on:click={()=> open=false}></button>
        </div>
        <slot></slot> <!-- > Contenido del modal --> 
    </div>
  </div>
</div>
{/if}