<script lang="ts">
  import { JSONSchema7, JSONSchema7Type } from 'json-schema'

  export let schema: JSONSchema7
  export let data: JSONSchema7Type
  export let components: Record<string, any>

  const submit = (e: Event) => console.log('submit', e)
  const resetField = (f: JSONSchema7Type) => {}

  const reset = (e: Event) => {}
</script>

<form on:submit={submit} on:reset={reset}>
  <svelte:component this={components.layout}>
    <div slot="fields">
      <svelte:component this={components[schema.type]} {schema} {components} bind:value={data} />
    </div>
    <div slot="ctrl">
      <slot />
    </div>
  </svelte:component>
</form>
