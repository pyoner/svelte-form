<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps<object>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper
  export let map: Record<string, any>

  onMount(() => {
    value = defaultValue<object>(value, schema)
  })
</script>

<svelte:component this={wrapper} {schema} {error}>
  {#each Object.entries(schema.properties) as [key, schema] (key)}
    {#if schema.type == 'object'}
      <svelte:self {map} {schema} {wrapper} bind:value={value[key]} />
    {:else}
      <svelte:component this={map[schema.type]} {schema} {wrapper} bind:value={value[key]} />
    {/if}
  {/each}
</svelte:component>
