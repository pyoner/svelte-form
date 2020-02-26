<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte'

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

  type T = JSONSchemaType
  export let schema: JSONSchema
  export let value: T = null
  export let components: FormComponents
  export let options = defaultOptions

  let errors: Errors | null = null

  const dispatch = createEventDispatcher()
  const submit = (e: Event) => {
    errors = null
    const v = normalizeValue(value)
    const errorList = validate(options.ajv, schema, v)
    if (errorList) {
      errors = schema.type === 'object' ? errorsToMap(errorList) : errorList
    } else {
      dispatch('submit', v)
    }
  }

  const reset = async (e: Event) => {
    errors = null
    value = null
    await tick()
    dispatch('reset', normalizeValue(value))
  }
</script>

<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
  <svelte:component this={components.layout}>
    <div slot="fields">
      <svelte:component
        this={getComponent(schema, components)}
        props={getComponentProps(schema)}
        {components}
        {schema}
        bind:value
        {errors} />
    </div>
    <div slot="ctrl">
      <slot />
    </div>
  </svelte:component>
</form>
