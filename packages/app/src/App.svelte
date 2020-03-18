<script lang="ts">
  import Ajv from "ajv";
  import { Form, components } from "@pyoner/svelte-form";
  import { createAjvValidator } from "@pyoner/svelte-form-ajv";
  import jsonSchemaDraft4 from "ajv/lib/refs/json-schema-draft-04.json";

  import * as simple from "./samples/simple";
  import * as single from "./samples/single";
  import * as array from "./samples/array";

  let samples = [
    ["Simple", simple],
    ["Single", single],
    ["Array", array]
  ];

  const ajv = new Ajv({
    schemaId: "auto",
    jsonPointers: true,
    allErrors: true,
    coerceTypes: true
  });
  ajv.addMetaSchema(jsonSchemaDraft4);

  const validator = createAjvValidator(ajv);

  let schema, value;
  let data = "";
</script>

<ul>
  {#each samples as [name, module] (name)}
    <li>
      <a
        href="#{name}"
        on:click={() => {
          schema = module.schema;
          value = module.value;
        }}>
        {name}
      </a>
    </li>
  {/each}
</ul>

{#if schema}
  <h1>Form</h1>
  <Form
    {schema}
    {components}
    {value}
    {validator}
    on:submit={e => {
      console.log('submit', e);
      data = JSON.stringify(e.detail);
    }}
    on:reset={e => {
      console.log('reset', e);
    }}>
    <button type="reset">Reset</button>
    <button type="submit">Submit</button>
  </Form>

  <h1>Result</h1>
  <textarea cols="30" id="" name="" rows="10">{data}</textarea>
{/if}
