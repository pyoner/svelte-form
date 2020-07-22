<script lang="ts">
  import type { Props } from "../types";

  export let addItem: Function;
  export let props: Props = {};
</script>

<button {...props} type="button" on:click={addItem}>New</button>
