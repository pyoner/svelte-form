<script lang="ts">
  import type { ErrorRecord } from "../../types";
  import {
    createProps,
    getSchemaComponent,
    getSchemaComponentProps,
    defaultValue,
    getComponent,
    getComponentProps,
  } from "../../helpers";

  type T = object;
  const p = createProps<T, ErrorRecord>({});
  export let value = p.value;
  export let errors = p.errors;
  export let schema = p.schema;
  export let components = p.components;

  /* recalc a default value */
  $: if (schema && value == null) {
    value = defaultValue<T>(schema, value);
  }
</script>

{#if schema && components}
  <svelte:component
    this={getComponent(components.wrapper)}
    {...getComponentProps(components.wrapper)}
    {schema}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component
        this={getSchemaComponent(propSchema, components)}
        props={getSchemaComponentProps(propSchema, components)}
        {components}
        schema={propSchema}
        bind:value={value[key]}
        errors={errors && errors[key]} />
    {/each}
  </svelte:component>
{/if}
