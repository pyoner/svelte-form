<script lang="ts">
  import { getProps, getComponent } from "../../helpers";
  import type { SvelteSchema, SvelteComponentProps } from "../../types";

  const key = "wrapper";
  export let errors: Error[] | null = null;
  export let schema: SvelteSchema;
  export let component: SvelteComponentProps;
</script>

{#if schema && component}
  <svelte:component
    this={getComponent(schema, component, key)}
    {...getProps(schema, component, key)}
    {schema}
    {errors}>
    <slot />
  </svelte:component>
{/if}
