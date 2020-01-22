<script lang="ts">
  import { ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<object, ErrorRecord>({})
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component this={components[propSchema.type]} schema={propSchema} {components} bind:value={value[key]} errors={errors && errors[key]} />
    {/each}
  </svelte:component>
{/if}
