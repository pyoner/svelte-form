<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps<object>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let components = props.components

  onMount(() => {
    value = defaultValue<object>(value, schema)
  })
</script>

{#if components}
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
