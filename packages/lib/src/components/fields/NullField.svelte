<script lang="ts">
  import { createProps } from '../../helpers'

  const props = createProps<null>()
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components

  let checked = false
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    <input type="checkbox" bind:checked />
  </svelte:component>
{/if}
