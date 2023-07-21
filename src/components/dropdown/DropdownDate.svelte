<script>
    import moment from "moment";
    import { onMount } from "svelte";
    
    export let date

    let days = [];
    let months = [... Array(12).keys()].map(e=>e+1);
    let years = [];
    let monthSelected = 1;
    let yearSelected;
    let daySelected = 1;
    let currentYear;
    let adultYear;
    let maxYear;

    getLimitYears();

    function getLimitYears(){
        currentYear = Number(moment().format("YYYY"));
        adultYear = currentYear - 18;
        maxYear = currentYear - 80;
        for (let i = adultYear; i >= maxYear; i--) { years.push(i) }
        yearSelected = years[0];
    }
    
    const onChangeDate = (mode) => {
        days = [];
        date = moment(`${yearSelected}-${monthSelected}-${daySelected}`, 'YYYY-M-D').format('YYYY-MM-DD');
        let daysOfMonth = moment(date).daysInMonth();
        for (let i = 1; i <= daysOfMonth; i++) { days.push(i) }
        if (daySelected > days.length){ daySelected = days.length }
        if (mode != "first") { date = moment(date).format("YYYY-MM-DD") }
    };

    onMount(() => {onChangeDate("first"); });
</script>


<select class="slc"  bind:value={daySelected} on:change={onChangeDate}>
  {#each days as day}
    <option>{day}</option>
  {/each}
</select>
<select  class="slc" bind:value={monthSelected} on:change={onChangeDate}>
  {#each months as month }
    <option>{month}</option>
  {/each}
</select>
<select  class="slc" bind:value={yearSelected} on:change={onChangeDate}>
  {#each years as year}
    <option>{year}</option>
  {/each}
</select>
