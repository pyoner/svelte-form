<script lang="ts">
  export let moveUp: Function;
  export let moveDown: Function;
  export let remove: Function;
  export let position: Number;
  export let length: Number;
</script>

<button type="button" on:click={remove}>Remove</button>
<button type="button" disabled={position <= 0} on:click={moveUp}>Move Up</button>
<button type="button" disabled={position + 1 == length} on:click={moveDown}>Move Down</button>
