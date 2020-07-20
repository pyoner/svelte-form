<script lang="ts">
  import { createProps, defaultValue } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";

  const p = createProps<null>();
  export let value = p.value;
  export let errors = p.errors;
  export let schema = p.schema;
  export let components = p.components;
  export let props = p.props;

  let checked = false;
</script>

{#if schema && components}
  <Wrap {schema} {errors} component={components.wrapper}>
    <input {...props} type="checkbox" bind:checked />
  </Wrap>
{/if}
