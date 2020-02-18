<script lang="ts">
  import { createProps } from '../../helpers'

  const props = createProps<number>()
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    <input type="number" bind:value />
  </svelte:component>
{/if}
