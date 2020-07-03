<script lang="ts">
  import { createProps, defaultValue, getComponent, getComponentProps } from "../../helpers";

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
  <svelte:component
    this={getComponent(components.wrapper)}
    {...getComponentProps(components.wrapper)}
    {schema}
    {errors}>
    {#if format == 'date-time'}
      <input {...props} type="datetime" bind:value />
    {:else if format == 'date'}
      <input {...props} type="date" bind:value />
    {:else if format == 'time'}
      <input {...props} type="time" bind:value />
    {:else}
      <input type="text" {...props} bind:value />
    {/if}
  </svelte:component>
{/if}
