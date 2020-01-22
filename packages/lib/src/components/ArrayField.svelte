<script lang="ts">
  import { JSONSchemaArray, ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<JSONSchemaArray, ErrorRecord>([])
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components
</script>

{#if schema && components}
  <svelte:component this={components.wrapper} {schema}>
    {#if schema && schema.items}
      {#if schema.items.type}
        {#each value as v, i (i)}
          <svelte:component this={components[schema.items.type]} schema={schema.items} {components} bind:value={v} errors={errors && errors[i]} />
        {/each}
      {/if}
    {/if}
  </svelte:component>
{/if}
