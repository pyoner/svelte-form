<script lang="ts">
  import Ajv from "ajv";
  import { Form, components } from "@pyoner/svelte-form/src";

  import resumeSchema from "./schema.json";
  import jsonSchemaDraft4 from "ajv/lib/refs/json-schema-draft-04.json";

  const ajv = new Ajv({ schemaId: "auto" });
  ajv.addMetaSchema(jsonSchemaDraft4);

  const options = {
    ajv
  };

  const schema = {
    type: "object",
    title: "Person",
    properties: {
      name: {
        type: "string",
        title: "Name",
        pattern: "^[A-Z]",
        minLength: 3,
        maxLength: 15
      },
      birthDay: {
        type: "string",
        title: "Birth Day",
        format: "date"
      },
      address: {
        type: "object",
        title: "Address",
        properties: {
          country: {
            type: "string",
            title: "Country",
            pattern: "^[A-Z]"
          },
          city: {
            type: "string",
            title: "City"
          },
          zipCode: {
            type: "integer",
            title: "Zip code"
          }
        },
        required: ["country", "city", "zipCode"]
      }
    },
    required: ["name", "birthDay"]
  };

  let data = {
    name: "Bob"
  };

  const schema2 = {
    type: "string",
    title: "Name",
    pattern: "^[A-Z]",
    minLength: 3,
    maxLength: 15
  };
</script>

<h1>Form examples</h1>
<Form
  {schema}
  {components}
  bind:data
  on:submit={e => {
    console.log('submit', e);
  }}
  on:reset={e => {
    console.log('reset', e);
  }}>
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</Form>
<Form
  schema={schema2}
  {components}
  on:submit={e => {
    console.log('submit', e);
  }}
  on:reset={e => {
    console.log('reset', e);
  }}>
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</Form>

<h2>Resume form</h2>
<Form
  schema={resumeSchema}
  {components}
  {options}
  on:submit={e => {
    console.log('submit', e);
  }}
  on:reset={e => {
    console.log('reset', e);
  }}>
  <button type="reset">Reset</button>
  <button type="submit">Submit</button>
</Form>
