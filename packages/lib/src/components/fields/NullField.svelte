<script lang="ts">
  import { createProps, getComponent, getComponentProps } from '../../helpers'

  const p = createProps<null>()
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  let checked = false
</script>

{#if schema && components}
  <svelte:component
    this={getComponent(components.wrapper)}
    {...getComponentProps(components.wrapper)}
    {schema}
    {errors}>
    <input {...props} type="checkbox" bind:checked />
  </svelte:component>
{/if}
