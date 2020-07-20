<script lang="ts">
  import { createProps, defaultValue } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";

  type T = string;
  const p = createProps<T>();
  export let value = p.value;
  export let errors = p.errors;
  export let schema = p.schema;
  export let components = p.components;
  export let props = p.props;

  /* recalc default value */
  $: if (schema && value == null) {
    value = defaultValue<T>(schema, value);
  }

  let format = "";
  $: format = (schema && schema.format) || "";
</script>

{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    {#if format == 'date-time'}
      <input {...props} type="datetime" bind:value />
    {:else if format == 'date'}
      <input {...props} type="date" bind:value />
    {:else if format == 'time'}
      <input {...props} type="time" bind:value />
    {:else}
      <input type="text" {...props} bind:value />
    {/if}
  </Wrap>
{/if}
