<script lang="ts">
  import { JSONSchema7Array } from 'json-schema'
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from '../helpers'

  const props = createProps<JSONSchema7Array>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components

  onMount(() => {
    value = defaultValue<JSONSchema7Array>(value, schema)
  })
</script>

{#if components}
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
