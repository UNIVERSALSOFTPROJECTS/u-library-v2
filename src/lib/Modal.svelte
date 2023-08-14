<script>
    import { onDestroy, onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    export let open;
    export let modalOpened="";
    export let title="";
  //Hay un conflicto con los dropdow XDDDD ptmr, f
   // const handleClickOutside = (e) => { console.log(e.target);
   //    if(!e.target.closest('.modal-content') || e.target.closest('.dropdown-menu button') ) open = false;
   //   }

    function statusModal(isActive) {
        const body = document.body.classList;
        if(isActive){
          body.add('modal__open');
          //document.addEventListener('click', handleClickOutside);
        }else{
          body.remove('modal__open');
          //document.removeEventListener('click', handleClickOutside)
        }
    }
    $: statusModal(open);
</script>

{#if open}
  <div class="modal {modalOpened}">
    <div class="modal-dialog centered" transition:fly={{ y: -50, duration: 500 }}>
      <div class="modal-content">
          <div class="modal-header">
              <div></div>
              <div>{title}</div>
              <button class="btn close" on:click={()=> open=false}></button>
          </div>
          <slot></slot>
      </div>
    </div>
  </div>
{/if}
