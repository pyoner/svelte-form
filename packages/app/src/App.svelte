<script lang="ts">
  import NullField from "svelte-form/src/fields/NullField.svelte";
  import BooleanField from "svelte-form/src/fields/BooleanField.svelte";
  import NumberField from "svelte-form/src/fields/NumberField.svelte";
  import StringField from "svelte-form/src/fields/StringField.svelte";
  import ObjectField from "svelte-form/src/fields/ObjectField.svelte";
  import ArrayField from "svelte-form/src/fields/ArrayField.svelte";
  import { defaultFieldComponents as components } from "svelte-form/src/components";

  const nullSchema = {
    type: "null",
    title: "title",
    description: "description"
  };

  const nullProps = {
    components,
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
    components,
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
    components,
    value: 14,
    schema: numSchema
  };

  const stringSchema = {
    type: "string",
    title: "title",
    description: "description"
  };

  const stringProps = {
    components,
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
    components,
    schema: stringDateSchema
  };

  const objectSchema = {
    type: "object",
    title: "Person",
    properties: {
      name: {
        type: "string",
        title: "Name"
      },
      age: {
        type: "integer",
        title: "Age"
      },
      address: {
        type: "object",
        title: "Address",
        properties: {
          country: {
            type: "string",
            title: "Country"
          },
          city: {
            type: "string",
            title: "City"
          }
        }
      }
    }
  };

  const objectProps = {
    components,
    schema: objectSchema,
    value: {
      name: "Alice",
      age: 18,
      address: {}
    }
  };

  const arraySchema = {
    type: "array",
    items: {
      type: "number"
    }
  };
  const arrayProps = {
    components,
    schema: arraySchema,
    value: [1, 2, 3]
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
  Array Field:
  <ArrayField {...arrayProps} />
</p>
