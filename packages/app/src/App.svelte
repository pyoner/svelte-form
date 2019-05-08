<script lang="ts">
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";

  const numSchema = {
    type: "number",
    title: "NumberField Title",
    description: "NumberField description",
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
  <BooleanField value={true} />
  Number Field:
  <NumberField {...numProps} />
</p>
