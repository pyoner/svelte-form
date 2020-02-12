<script lang="ts">
  import { ErrorRecord } from '../types'
  import { createProps, getComponent, getComponentProps, repackComponents } from '../helpers'

  const props = createProps<object, ErrorRecord>({})
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component this={getComponent(components, propSchema.type, key)} {...getComponentProps(components, propSchema.type, key)} components={repackComponents(components, propSchema.type, key)} schema={propSchema} bind:value={value[key]} errors={errors && errors[key]} />
    {/each}
  </svelte:component>
{/if}
