<div class="field">
  {#if schema && schema.title}
    <label class="label">{schema.title}</label>
  {/if}

  <slot>A field is not implemented</slot>

  {#if error}
    <div class="error">{error.message}</div>
  {/if}

  {#if schema && schema.description}
    <div class="description">{schema.description}</div>
  {/if}
</div>

<script lang="ts">
  import { JSONSchema } from 'json-schema-typed'
  import { ErrorObject } from 'ajv'

  export let error: ErrorObject | null = null
  export let schema: JSONSchema
</script>
