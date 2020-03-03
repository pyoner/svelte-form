<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte'

  import { JSONSchema, Errors, Validator } from '@pyoner/svelte-form-common'
  import { FormComponents } from '../types'
  import { defaultValue, normalizeValue, getSchemaComponent, getSchemaComponentProps , getComponent, getComponentProps} from '../helpers'

  type T = any
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
  <svelte:component {...getComponentProps(components.layout)} this={getComponent( components.layout )}>
    <div slot="fields">
      <svelte:component
        this={getSchemaComponent(schema, components)}
        props={getSchemaComponentProps(schema)}
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
