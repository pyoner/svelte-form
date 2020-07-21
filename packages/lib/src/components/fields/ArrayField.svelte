<script lang="ts">
  import type { ErrorRecord } from "@pyoner/svelte-form-common";
  import {
    createProps,
    defaultValue,
    getComponent,
    getProps,
    getComponentFromContainer,
    getPropsFromContainer,
  } from "../../helpers";
  import Wrap from "../helpers/Wrap.svelte";
  import ItemWrapper from "../ItemWrapper.svelte";

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

  let showItemForm = false;
  const renderItemForm = () => {
    showItemForm = true;
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
            <button
              type="button"
              on:click={(e) => {
                removeItem(i);
              }}>
              Remove
            </button>
            <button
              type="button"
              disabled={i <= 0}
              on:click={(e) => {
                moveItem(i, i - 1);
              }}>
              Move Up
            </button>
            <button
              type="button"
              disabled={i + 1 == value.length}
              on:click={(e) => {
                moveItem(i, i + 1);
              }}>
              Move Down
            </button>
          </div>

        </svelte:component>
      {/each}
    {/if}

    {#if showItemForm}
      <svelte:component
        this={getComponentFromContainer(components.form)}
        {...getPropsFromContainer(components.form)}
        schema={schema.items}
        {components}
        on:submit={submit}
        on:reset={reset}>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </svelte:component>
    {/if}
    <button type="button" on:click={renderItemForm}>New</button>
  </Wrap>
{/if}
