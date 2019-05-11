<script lang="ts">
  import NullField from "svelte-form/src/fields/NullField.svelte";
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";
  import StringField from "svelte-form/src/fields/StringField.svelte";
  import ObjectField from "svelte-form/src/fields/ObjectField.svelte";

  const nullSchema = {
    type: "null",
    title: "title",
    description: "description"
  };

  const nullProps = {
    value: null,
    schema: nullSchema
  };

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

  const objectSchema = {
    type: "object",
    properties: {
      name: {
        type: "string"
      },
      age: {
        type: "integer"
      }
    }
  };

  const objectProps = {
    schema: objectSchema,
    value: {
      name: "Alice",
      age: 18
    }
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
  Null Field:
  <NullField {...nullProps} />
  Boolean Field:
  <BooleanField {...boolProps} />
  Number Field:
  <NumberField {...numProps} />
  String Field:
  <StringField {...stringProps} />
  String Date Field:
  <StringField {...stringDateProps} />
  Object Field:
  <ObjectField {...objectProps} />
</p>
