<script lang="ts">
  import { ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<object, ErrorRecord>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {error}>
    {#each Object.entries(schema.properties) as [key, schema] (key)}
      {#if schema.type == 'object'}
        <svelte:self {schema} {components} bind:value={value[key]} />
      {:else}
        <svelte:component this={components[schema.type]} {schema} {components} bind:value={value[key]} />
      {/if}
    {/each}
  </svelte:component>
{/if}
