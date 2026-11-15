<script lang="ts">
  let { value = $bindable(""), label, id, type = "text", placeholder = "", disabled = false, required = false, name, oninput }: {
    value?: string;
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    oninput?: (event: Event) => void;
  } = $props();
</script>

{#if label}
  <label class="field-label" for={id}>{label}</label>
{/if}
<input class="ui-input" bind:value {id} {type} {placeholder} {disabled} {required} {name} {oninput} />

<style>
  .field-label { display: block; margin-bottom: 6px; color: var(--ui-fg-muted); font-size: 12px; font-weight: 600; }
</style>
