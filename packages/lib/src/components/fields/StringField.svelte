<script lang="ts">
  import { createProps } from '../../helpers'

  const p = createProps<string>()
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  let format = ''
  $: format = (schema && schema.format) || ''
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    {#if format == 'date-time'}
      <input {...props} type="datetime" bind:value />
    {:else if format == 'date'}
      <input {...props} type="date" bind:value />
    {:else if format == 'time'}
      <input {...props} type="time" bind:value />
    {:else}
      <input {...props} type="text" bind:value />
    {/if}
  </svelte:component>
{/if}
