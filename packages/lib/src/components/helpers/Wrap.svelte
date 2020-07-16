<script lang="ts">
  import { getComponent, getComponentProps } from "../../helpers";
  import type { SvelteSchema, TSvelteComponent } from "../../types";

  export let errors: Error[] | null = null;
  export let schema: SvelteSchema;
  export let component: TSvelteComponent;
</script>

<svelte:component
  this={getComponent(component)}
  {...getComponentProps(component)}
  {schema}
  {errors}>
  <slot />
</svelte:component>
