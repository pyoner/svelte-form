<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import { JSONSchema, JSONSchemaType } from './types'
  import { defaultValue, normalizeValue, validate } from './helpers'

  export let schema: JSONSchema
  export let data: JSONSchemaType
  export let components: Record<string, any>

  const dispatch = createEventDispatcher<JSONSchemaType>()
  const submit = (e: Event) => {
    const errors = validate(schema, data)
    if (errors) {
      console.log(errors)
    } else {
      dispatch('submit', normalizeValue(data))
    }
  }

  const reset = (e: Event) => {
    data = defaultValue(null, schema)
    dispatch('reset', normalizeValue(data))
  }

  let mounted = false
  onMount(() => {
    mounted = true
    data = defaultValue(data, schema)
  })
</script>

{#if mounted}
  <form on:submit|preventDefault={submit} on:reset={reset}>
    <svelte:component this={components.layout}>
      <div slot="fields">
        <svelte:component this={components[schema.type]} {schema} {components} bind:value={data} />
      </div>
      <div slot="ctrl">
        <slot />
      </div>
    </svelte:component>
  </form>
{/if}
