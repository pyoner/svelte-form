<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import { JSONSchema, JSONSchemaType, Errors, FormComponents } from '../types'
  import {
    defaultValue,
    normalizeValue,
    validate,
    errorsToMap,
    options as defaultOptions,
    getComponent,
    getComponentProps
  } from '../helpers'

  export let schema: JSONSchema
  export let data: JSONSchemaType = null
  export let components: FormComponents
  export let options = defaultOptions

  let errors: Errors | null = null

  const dispatch = createEventDispatcher()
  const submit = (e: Event) => {
    errors = null
    const value = normalizeValue(data)
    const errorList = validate(options.ajv, schema, value)
    if (errorList) {
      console.log(errorList)
      errors = schema.type === 'object' ? errorsToMap(errorList) : errorList
      console.log(errors)
    } else {
      dispatch('submit', value)
    }
  }

  const reset = (e: Event) => {
    errors = null
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
        <svelte:component
          this={getComponent(schema, components)}
          {...getComponentProps(schema)}
          {components}
          {schema}
          bind:value={data}
          {errors} />
      </div>
      <div slot="ctrl">
        <slot />
      </div>
    </svelte:component>
  </form>
{/if}
