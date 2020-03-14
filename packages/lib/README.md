# Svelte JSON Schema Form library
A library that helps you build a HTML form from a JSON Schema

### Usage

Install the library:
```bash
npm install @pyoner/svelte-form 
```

Install a validator:
```bash
npm install @pyoner/svelte-form-ajv 
```

Create App component:
```svelte
<script lang="ts">
  import Ajv from "ajv";
  import { Form, components } from "@pyoner/svelte-form";
  import { createAjvValidator } from "@pyoner/svelte-form-ajv";
  import jsonSchemaDraft4 from "ajv/lib/refs/json-schema-draft-04.json";
  import schema from "./schema.json";
  
  const ajv = new Ajv({
    schemaId: "auto",
    jsonPointers: true,
    allErrors: true,
    coerceTypes: true
  });
  ajv.addMetaSchema(jsonSchemaDraft4);
  const validator = createAjvValidator(ajv);
  let value;
</script>

{#if schema}
  <Form
    {schema}
    {components}
    {value}
    {validator}
    on:submit={e => {
      console.log('submit', e);
    }}
    on:reset={e => {
      console.log('reset', e);
    }}>
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Form>
{/if}
```
