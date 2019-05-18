<script lang="ts">
  import { createProps } from '../helpers'

  const props = createProps<null>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components

  let checked = false
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {error}>
    <input type="checkbox" bind:checked />
  </svelte:component>
{/if}
