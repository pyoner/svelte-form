<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  const props = createProps<null>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper

  let checked = false
  let mounted = false

  onMount(() => {
    mounted = true
    value = defaultValue<null>(value, schema)
    checked = value === null
  })

  $: if (mounted) {
    value = checked ? null : undefined
  }
</script>

<svelte:component this={wrapper} {schema} {error}>
  <input type="checkbox" bind:checked />
</svelte:component>
