<script lang="ts">
  import { JSONSchema } from '@pyoner/svelte-form-common'

  export let errors: Error[] | null = null
  export let schema: JSONSchema
</script>

<style>
  .error {
    color: red;
  }
</style>

{#if schema}
  {#if schema.type == 'object' || schema.type == 'array'}
    <fieldset>
      <legend>{schema.title}</legend>

      {#if schema.description}
        <div class="description">{schema.description}</div>
      {/if}

      <slot>A field is not implemented</slot>

      {#if errors && errors.length}
        {#each errors as error}
          <div class="error">{error.message}</div>
        {/each}
      {/if}
    </fieldset>
  {:else}
    <div class="field">
      {#if schema.title}
        <label class="label">{schema.title}</label>
      {/if}

      <slot>A field is not implemented</slot>

      {#if errors && errors.length}
        {#each errors as error}
          <div class="error">{error.message}</div>
        {/each}
      {/if}

      {#if schema.description}
        <div class="description">{schema.description}</div>
      {/if}
    </div>
  {/if}
{/if}
