<script lang="ts">
  import Form from "@pyoner/svelte-form/src/Form.svelte";
  import { defaultFormComponents as components } from "@pyoner/svelte-form/src/components";

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
