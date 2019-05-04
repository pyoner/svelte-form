<svelte:component this={wrapper} {schema} {error}>
  <input type="number" value />
</svelte:component>

<script lang="ts">
  /* import { onMount } from 'svelte' */
  import { makeProps } from './helpers'

 const props = makeProps<number>();
 console.log(makeProps)
 export let value = props.value;
 export let error = props.error
 export let schema = props.schema
 export let wrapper = props.wrapper

  /* onMount(() => {
   *   if (value === null && schema && 'default' in schema) {
   *     value = schema.default
   *   }
   * }) */
</script>
