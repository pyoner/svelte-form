<script lang="ts">
  import { JSONSchemaArray, ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<JSONSchemaArray, ErrorRecord>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema} {error}>
    {#if schema && schema.items}
      {#if schema.items.type}
        {#each value as v}
          {#if schema.items.type == 'array'}
            <svelte:self schema={schema.items} {components} bind:value={v} />
          {:else}
            <svelte:component this={components[schema.items.type]} schema={schema.items} {components} bind:value={v} />
          {/if}
        {/each}
      {/if}
    {/if}
  </svelte:component>
{/if}
