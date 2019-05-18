<script lang="ts">
  import { createProps } from '../helpers'

  const props = createProps<boolean>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {error}>
    <input type="checkbox" bind:checked={value} />
  </svelte:component>
{/if}
