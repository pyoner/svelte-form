<script lang="ts">
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";
  import StringField from "svelte-form/src/fields/StringField.svelte";

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

  const stringSchema = {
    type: "string",
    title: "title",
    description: "description"
  };

  const stringProps = {
    value: "This is text",
    schema: stringSchema
  };

  const stringDateSchema = {
    type: "string",
    title: "title",
    description: "description",
    format: "date"
  };

  const stringDateProps = {
    schema: stringDateSchema
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
  String Field:
  <StringField {...stringProps} />
  String Date Field:
  <StringField {...stringDateProps} />
</p>
