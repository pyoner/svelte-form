<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte'

  import { JSONSchema, JSONSchemaType, Errors, FormComponents, Validator } from '../types'
  import { defaultValue, normalizeValue, getComponent, getComponentProps } from '../helpers'

  type T = JSONSchemaType
  export let schema: JSONSchema
  export let value: T = null
  export let components: FormComponents
  export let validator: Validator

  let errors: Errors | null = null

  const dispatch = createEventDispatcher()
  const submit = (e: Event) => {
    console.log('Form submit event', e)
    const v = normalizeValue(value)
    errors = validator(schema, v)

    if (errors) {
      console.log('Form error', errors)
    } else {
      console.log('Form submit', v)
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
