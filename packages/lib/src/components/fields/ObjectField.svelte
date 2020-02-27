<script lang="ts">
  import { ErrorRecord } from '../../types'
  import { createProps, getComponent, getComponentProps, defaultValue } from '../../helpers'

  type T = object
  const p = createProps<T, ErrorRecord>({})
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  /* on reset do recalc a default value */
  $: if (schema && value == null) {
    value = defaultValue<T | null>(schema, value)
  }
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component
        this={getComponent(propSchema, components)}
        props={getComponentProps(propSchema)}
        {components}
        schema={propSchema}
        bind:value={value[key]}
        errors={errors && errors[key]} />
    {/each}
  </svelte:component>
{/if}
