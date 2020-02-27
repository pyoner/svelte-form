<script lang="ts">
  import { createProps, defaultValue } from '../../../helpers'

  type T = string
  const p = createProps<T>()
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  /* on reset do recalc a default value */
  $: if (schema && value == null) {
    value = defaultValue<T | null>(schema, value)
  }

  let format = ''
  $: format = (schema && schema.format) || ''
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {errors}>
    <textarea {...props} bind:value />
  </svelte:component>
{/if}
