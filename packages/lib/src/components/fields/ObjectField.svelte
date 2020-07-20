<script lang="ts">
  import type { ErrorRecord } from "../../types";
  import { createProps, defaultValue, getComponent, getProps } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";

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
  <Wrap {schema} {errors} component={components.wrapper}>
    {#each Object.entries(schema.properties) as [key, propSchema] (key)}
      <svelte:component
        this={getComponent(propSchema, components.fields[propSchema.type], 'field')}
        props={getProps(propSchema, components.fields[propSchema.type], 'field')}
        {components}
        schema={propSchema}
        bind:value={value[key]}
        errors={errors && errors[key]} />
    {/each}
  </Wrap>
{/if}
