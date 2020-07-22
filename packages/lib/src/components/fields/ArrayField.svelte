<script lang="ts">
  import { isObjectLike } from "is-what";
  import type { ErrorRecord, JSONSchema } from "@pyoner/svelte-form-common";
  import {
    createProps,
    defaultValue,
    getComponent,
    getProps,
    getComponentFromContainer,
    getPropsFromContainer,
  } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";

  type T = Array<any>;
  const p = createProps<T, ErrorRecord>([]);
  export let value = p.value;
  export let errors = p.errors;
  export let schema = p.schema;
  export let components = p.components;

  /* recalc a default value */
  $: if (schema && value === null) {
    value = defaultValue<T>(schema, value);
  }

  const removeItem = (index: number) => {
    if (!value) {
      return;
    }
    value.splice(index, 1);
    value = [...value];
  };

  const moveItem = (index: number, pos: number) => {
    if (!value) {
      return;
    }
    const current = value[index];
    value[index] = value[pos];
    value[pos] = current;
    value = [...value];
  };

  const submit = (event: CustomEvent) => {
    if (!value) {
      return;
    }
    value = value.concat([event.detail]);
    showItemForm = false;
    console.log("Submit", event);
  };

  const reset = (event: CustomEvent) => {
    console.log("Reset", event);
  };

  const addItem = () => {
    if (schema && isObjectLike<JSONSchema>(schema.items)) {
      const item = defaultValue<T>(schema.items, null);
      value = value ? value.concat([item]) : [item];
    }
  };
</script>

{#if components && schema && schema.items && schema.items.type}
  <Wrap {schema} {errors} component={components.wrapper}>
    {#if value}
      {#each value as v, i (i)}
        <svelte:component
          this={getComponent(schema, components.itemWrapper, 'itemWrapper')}
          {schema}
          props={getProps(schema, components.itemWrapper, 'itemWrapper')}>

          <div slot="field">
            <svelte:component
              this={getComponent(schema.items, components.fields[schema.items.type], 'field')}
              props={getProps(schema.items, components.fields[schema.items.type], 'field')}
              {components}
              schema={schema.items}
              bind:value={v}
              errors={errors && errors[i]} />
          </div>

          <div slot="ctrl">
            <svelte:component
              this={getComponent(schema, components.itemCtrl, 'itemCtrl')}
              {schema}
              props={getProps(schema, components.itemCtrl, 'itemCtrl')}
              remove={() => {
                removeItem(i);
              }}
              moveUp={() => {
                moveItem(i, i - 1);
              }}
              moveDown={() => {
                moveItem(i, i + 1);
              }}
              position={i}
              length={value.length} />
          </div>

        </svelte:component>
      {/each}
    {/if}

    <button type="button" on:click={addItem}>New</button>
  </Wrap>
{/if}
