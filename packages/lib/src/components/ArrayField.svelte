<script lang="ts">
  import { JSONSchemaArray, ErrorRecord } from '../types'
  import { createProps } from '../helpers'

  const props = createProps<JSONSchemaArray, ErrorRecord>([])
  export let value = props.value
  export let errors = props.errors
  export let schema = props.schema
  export let components = props.components

  const removeItem = (index: number) => {
    if (!value) {
      return
    }
    value.splice(index, 1)
    value = [...value]
  }

  let showItemForm = false
  const renderItemForm = () => {
    showItemForm = true
  }

  const submit = (event: CustomEvent) => {
    if (!value) {
      return
    }
    value = value.concat([event.detail])
    showItemForm = false
    console.log('Submit', event)
  }

  const reset = (event: CustomEvent) => {
    console.log('Reset', event)
  }
</script>

{#if components && schema && schema.items && schema.items.type}
  <svelte:component this={components.wrapper} {schema}>
    {#if value}
      {#each value as v, i (i)}
        <div class="item">
          <svelte:component this={components[schema.items.type]} schema={schema.items} {components} bind:value={v} errors={errors && errors[i]} />
          <button
            type="button"
            on:click={e => {
              removeItem(i)
            }}>
            Remove
          </button>
        </div>
      {/each}
    {/if}

    {#if showItemForm}
      <svelte:component
        this={components.form}
        schema={schema.items}
        {components}
        on:submit={submit}
        on:reset={reset}>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </svelte:component>
    {/if}
    <button type="button" on:click={renderItemForm}>New</button>
  </svelte:component>
{/if}
