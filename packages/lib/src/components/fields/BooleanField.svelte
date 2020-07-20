<script lang="ts">
  import { createProps, defaultValue } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";

  type T = boolean;
  const p = createProps<T>();
  export let value = p.value;
  export let errors = p.errors;
  export let schema = p.schema;
  export let components = p.components;
  export let props = p.props;

  /* recalc a default value */
  $: if (schema && value == null) {
    value = defaultValue<T>(schema, value);
  }
</script>

{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    <input {...props} type="checkbox" bind:checked={value} />
  </Wrap>
{/if}
