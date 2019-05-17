<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from '../helpers'

  const props = createProps<boolean>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components

  onMount(() => {
    value = defaultValue<boolean>(value, schema)
  })
</script>

{#if components}
  <svelte:component this={components.wrapper} {schema} {error}>
    <input type="checkbox" bind:checked={value} />
  </svelte:component>
{/if}
