<script lang="ts">
  import { JSONSchemaArray, ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<JSONSchemaArray, ErrorRecord>([])
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components

  const addItem = () => {
    console.log('addItem')
    value = value.concat([{}])
    console.log('value', value)
  }
</script>

{#if components && schema && schema.items && schema.items.type}
  <svelte:component this={components.wrapper} {schema}>
    {#each value as v, i (i)}
      <svelte:component this={components[schema.items.type]} schema={schema.items} {components} bind:value={v} errors={errors && errors[i]} />
    {/each}
  </svelte:component>

  <button type="button" on:click={addItem}>Add {schema.items.title}</button>

{/if}
