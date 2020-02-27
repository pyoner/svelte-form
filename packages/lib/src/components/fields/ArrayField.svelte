<script lang="ts">
  import { JSONSchemaArray, ErrorRecord } from '../../types'
  import { createProps, getComponent, getComponentProps, defaultValue } from '../../helpers'

  type T = JSONSchemaArray
  const p = createProps<T, ErrorRecord>([])
  export let value = p.value
  export let errors = p.errors
  export let schema = p.schema
  export let components = p.components
  export let props = p.props

  /* recalc a default value */
  $: if (schema && value === null) {
    value = defaultValue<T>(schema, value)
  }

  const removeItem = (index: number) => {
    if (!value) {
      return
    }
    value.splice(index, 1)
    value = [...value]
  }

  const moveItem = (index: number, pos: number) => {
    if (!value) {
      return
    }
    const current = value[index]
    value[index] = value[pos]
    value[pos] = current
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
          <svelte:component
            this={getComponent(schema.items, components)}
            props={getComponentProps(schema.items)}
            {components}
            schema={schema.items}
            bind:value={v}
            errors={errors && errors[i]} />
          <button
            type="button"
            on:click={e => {
              removeItem(i)
            }}>
            Remove
          </button>
          <button
            type="button"
            disabled={i <= 0}
            on:click={e => {
              moveItem(i, i - 1)
            }}>
            Move Up
          </button>
          <button
            type="button"
            disabled={i + 1 == value.length}
            on:click={e => {
              moveItem(i, i + 1)
            }}>
            Move Down
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
