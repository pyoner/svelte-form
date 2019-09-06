<script lang="ts">
  import { createProps } from '../helpers'

  const props = createProps<string>()
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components

  let format = ''
  $: format = (schema && schema.format) || ''
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    {#if format == 'date-time'}
      <input type="datatime" bind:value />
    {:else if format == 'date'}
      <input type="date" bind:value />
    {:else if format == 'time'}
      <input type="time" bind:value />
    {:else}
      <input type="text" bind:value />
    {/if}
  </svelte:component>
{/if}
