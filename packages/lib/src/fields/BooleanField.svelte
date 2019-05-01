<svelte:component this={wrapper} {schema} {error}>
  <input type="checkbox" {value} />
</svelte:component>

<script lang="ts">
  import { JSONSchema } from 'json-schema-typed'
  import { ajv } from 'ajv'

  import GenericField from './GenericField.svelte'

  export let value: boolean
  export let error: ajv.ErrorObject
  export let schema: JSONSchema
  export let wrapper = GenericField
</script>
