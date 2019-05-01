<svelte:component this={wrapper} {schema} {error}>
  <input type="checkbox" bind:value />
</svelte:component>

<script lang="ts">
  import { JSONSchema } from 'json-schema-typed'
  import { ErrorObject } from 'ajv'

  import WrapperField from './WrapperField.svelte'

  export let value: boolean | null = null
  export let error: ErrorObject | null = null
  export let schema: JSONSchema
  export let wrapper = WrapperField
</script>
