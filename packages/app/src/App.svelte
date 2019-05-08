<script lang="ts">
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";

  const boolSchema = {
    type: "boolean",
    title: "title",
    description: "description",
    default: false
  };

  const boolProps = {
    value: true,
    schema: boolSchema
  };

  const numSchema = {
    type: "number",
    title: "title",
    description: "description",
    default: 18
  };

  const numProps = {
    value: 14,
    schema: numSchema
  };

  export let name: string;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>
<p>
  Boolean Field:
  <BooleanField {...boolProps} />
  Number Field:
  <NumberField {...numProps} />
</p>
