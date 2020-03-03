<script lang="ts">
  import { createProps, defaultValue, getComponent, getComponentProps } from '../../helpers'

  type T = boolean
  const p = createProps<T>()
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  /* recalc a default value */
  $: if (schema && value == null) {
    value = defaultValue<T>(schema, value)
  }
</script>

{#if schema && components}
  <svelte:component
    this={getComponent(components.wrapper)}
    {...getComponentProps(components.wrapper)}
    {schema}
    {errors}>
    <input {...props} type="checkbox" bind:checked={value} />
  </svelte:component>
{/if}
