<script lang="ts">
  import { onMount } from 'svelte'
  import { createProps, defaultValue } from './helpers'

  import BooleanField from './BooleanField.svelte'
  import NullField from './NullField.svelte'
  import NumberField from './NumberField.svelte'
  import StringField from './StringField.svelte'

  const numTypes = ['number', 'integer']

  const props = createProps<object>()
  export let value = props.value
  export let error = props.error
  export let schema = props.schema
  export let wrapper = props.wrapper

  onMount(() => {
    value = defaultValue<object>(value, schema)
  })
</script>

<svelte:component this={wrapper} {schema} {error}>
  {#if schema.type == 'boolean'}
    <BooleanField bind:value {schema} {wrapper} />
  {:else if schema.type == 'null'}
    <NullField bind:value {schema} {wrapper} />
  {:else if numTypes.includes(schema.type)}
    <NumberField bind:value {schema} {wrapper} />
  {:else if schema.type == 'string'}
    <StringField bind:value {schema} {wrapper} />
  {:else}
    <div>Unknown schema type "{schema.type}"</div>
  {/if}
</svelte:component>
