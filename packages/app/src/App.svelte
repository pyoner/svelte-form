<h1>Hello {name}!</h1>
<p>
  Boolean Field:
  <BooleanField value={true} />
  Number Field:
  <NumberField />
</p>

<style>
  h1 {
    color: purple;
  }
</style>

<script lang="ts">
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";

  export let name: string;
</script>
