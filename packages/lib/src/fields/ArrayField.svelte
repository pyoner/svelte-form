<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps<any[]>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper
  export let map: Record<string, any>

  onMount(() => {
    value = defaultValue<any[]>(value, schema)
  })
</script>

<svelte:component this={wrapper} {schema} {error}>
  {#if schema && schema.items}
    {#if schema.items.type}
      {#each value as v}
        {#if schema.items.type == 'array'}
          <svelte:self {map} schema={schema.items} {wrapper} bind:value={v} />
        {:else}
          <svelte:component this={map[schema.items.type]} {map} schema={schema.items} {wrapper} bind:value={v} />
        {/if}
      {/each}
    {/if}
  {/if}
</svelte:component>
