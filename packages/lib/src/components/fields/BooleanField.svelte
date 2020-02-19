<script lang="ts">
  import { createProps } from '../../helpers'

  const p = createProps<boolean>()
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    <input {...props} type="checkbox" bind:checked={value} />
  </svelte:component>
{/if}
