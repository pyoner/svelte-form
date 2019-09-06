<script lang="ts">
  import { JSONSchema } from 'json-schema-typed'
  import { ErrorObject } from 'ajv'

  export let errors: ErrorObject[] | null = null
  export let schema: JSONSchema
</script>

<div class="field">
  {#if schema && schema.title}
    <label class="label">{schema.title}</label>
  {/if}

  <slot>A field is not implemented</slot>

  {#if errors && errors.length}
    {#each errors as error}
      <div class="error">{error.message}</div>
    {/each}
  {/if}

  {#if schema && schema.description}
    <div class="description">{schema.description}</div>
  {/if}
</div>
