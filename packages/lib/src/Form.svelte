<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import { JSONSchema, JSONSchemaType, ErrorRecord } from './types'
  import { defaultValue, normalizeValue, validate, errorsToMap } from './helpers'

  export let schema: JSONSchema
  export let data: JSONSchemaType
  export let components: Record<string, any>
  let error: ErrorRecord

  const dispatch = createEventDispatcher<JSONSchemaType>()
  const submit = (e: Event) => {
    const value = normalizeValue(data)
    const errors = validate(schema, value)
    if (errors) {
      console.log(errors)
      error = errorsToMap(errors)
      console.log(error)
    } else {
      dispatch('submit', value)
    }
  }

  const reset = (e: Event) => {
    data = defaultValue(schema, null)
    dispatch('reset', normalizeValue(data))
  }

  let mounted = false
  onMount(() => {
    mounted = true
    data = defaultValue(schema, data)
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
