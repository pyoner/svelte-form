<div class="field">
  {#if schema.title}
    <label class="label">{schema.title}</label>
  {/if}

  <slot>A field is not implemented</slot>

  {#if error}
    <div class="error">{error.message}</div>
  {/if}

  {#if schema.description}
    <div class="description">{schema.description}</div>
  {/if}
</div>

<script lang="ts">
  import { JSONSchema } from 'json-schema-typed'
  import { ajv } from 'ajv'

  export let value: boolean
  export let error: ajv.ErrorObject
  export let schema: JSONSchema
</script>
