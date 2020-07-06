<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";

  import type { JSONSchema, Errors, Validator } from "@pyoner/svelte-form-common";
  import type { FormComponents } from "../types";
  import {
    defaultValue,
    normalizeValue,
    getSchemaComponent,
    getSchemaComponentProps,
    getComponent,
    getComponentProps,
  } from "../helpers";

  type T = any;
  export let schema: JSONSchema;
  export let value: T = null;
  export let components: FormComponents | undefined;
  export let validator: Validator | undefined;

  let errors: Errors | null = null;

  const dispatch = createEventDispatcher();
  const submit = (e: Event) => {
    if (!validator) {
      throw new Error('Missing a "validator" property');
    }
    console.log("Form submit event", e);
    const v = normalizeValue(value);
    errors = validator(schema, v);

    if (errors) {
      console.log("Form error", errors);
    } else {
      console.log("Form submit", v);
      dispatch("submit", v);
    }
  };

  const reset = async (e: Event) => {
    errors = null;
    value = null;
    await tick();
    dispatch("reset", normalizeValue(value));
  };

  $: if (components && validator) {
    components = {
      ...components,
      form: [getComponent(components.form), { validator, ...getComponentProps(components.form) }],
    };
  }
</script>

<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
  <svelte:component
    this={getComponent(components.layout)}
    {...getComponentProps(components.layout)}>
    <div slot="fields">
      <svelte:component
        this={getSchemaComponent(schema, components)}
        props={getSchemaComponentProps(schema, components)}
        {components}
        {schema}
        bind:value
        {errors} />
    </div>
    <div slot="ctrl">
      <slot />
    </div>
  </svelte:component>
</form>
