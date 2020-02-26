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
  export let data: T = null
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

  const reset = async (e: Event) => {
    errors = null
    data = null
    await tick()
    console.log('reset data', data)
    dispatch('reset', normalizeValue(data))
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
        bind:value={data}
        {errors} />
    </div>
    <div slot="ctrl">
      <slot />
    </div>
  </svelte:component>
</form>
