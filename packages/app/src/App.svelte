<script lang="ts">
  import Ajv from "ajv";
  import { Form, components } from "@pyoner/svelte-form";
  import jsonSchemaDraft4 from "ajv/lib/refs/json-schema-draft-04.json";

  import * as simple from "./samples/simple";
  import * as single from "./samples/single";

  let samples = [
    ["Simple", simple],
    ["Single", single]
  ];

  const ajv = new Ajv({ schemaId: "auto" });
  ajv.addMetaSchema(jsonSchemaDraft4);

  const options = {
    ajv
  };

  let schema, data;
</script>

<ul>
  {#each samples as [name, module] (name)}
    <li>
      <a
        on:click={() => {
          schema = module.schema;
          data = module.data;
        }}>
        {name}
      </a>
    </li>
  {/each}
</ul>

{#if schema}
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
{/if}
