<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper

  const formatMap: Record<string, string> = {
    'date-time': 'datetime',
    time: 'time',
    date: 'date'
  }
  let format: string | undefined

  onMount(() => {
    value = defaultValue(value, schema)

    format = schema && schema.format
  })
</script>

<svelte:component this={wrapper} {schema} {error}>
  {#if format == 'date-time'}
    <input type="datatime" bind:value />
  {:else if format == 'date'}
    <input type="date" bind:value />
  {:else if format == 'time'}
    <input type="time" bind:value />
  {:else}
    <input type="text" bind:value />
  {/if}
</svelte:component>
