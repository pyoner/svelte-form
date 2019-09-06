<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import { JSONSchema, JSONSchemaType, Errors } from './types'
  import { defaultValue, normalizeValue, validate, errorsToMap } from './helpers'

  export let schema: JSONSchema
  export let data: JSONSchemaType
  export let components: Record<string, any>
  let errors: Errors | null = null

  const dispatch = createEventDispatcher<JSONSchemaType>()
  const submit = (e: Event) => {
    const value = normalizeValue(data)
    const errorList = validate(schema, value)
    if (errorList) {
      console.log(errorList)
      errors = schema.type === 'object' ? errorsToMap(errorList) : errorList
      console.log(errors)
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
        <svelte:component this={components[schema.type]} {schema} {components} bind:value={data} {errors} />
      </div>
      <div slot="ctrl">
        <slot />
      </div>
    </svelte:component>
  </form>
{/if}
