<script lang="ts">
  import Form from "svelte-form/src/Form.svelte";
  import { defaultFormComponents } from "svelte-form/src/components";

  const components = defaultFormComponents;

  const schema = {
    type: "object",
    title: "Person",
    properties: {
      name: {
        type: "string",
        title: "Name"
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
            title: "Country"
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
