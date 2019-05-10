<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps<number>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper

  onMount(() => {
    value = defaultValue<number>(value, schema)
  })
</script>

<svelte:component this={wrapper} {schema} {error}>
  <input type="number" bind:value />
</svelte:component>
