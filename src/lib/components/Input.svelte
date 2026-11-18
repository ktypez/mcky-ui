<script lang="ts">
  let { value = $bindable(""), label, id, type = "text", placeholder = "", disabled = false, required = false, readonly = false, name, autocomplete, invalid = false, describedby, oninput, class: className = "", ...rest }: {
    value?: string;
    label?: string;
    id?: string;
    type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    name?: string;
    autocomplete?: import("svelte/elements").HTMLInputAttributes["autocomplete"];
    invalid?: boolean;
    describedby?: string;
    oninput?: (event: Event) => void;
    class?: string;
  } = $props();
  const generatedId = $props.id();
  let controlId = $derived(id ?? generatedId);
</script>

<div class={["ui-field", className].filter(Boolean).join(" ")}>
  {#if label}<label class="ui-field__label" for={controlId}>{label}</label>{/if}
  <input class="ui-input" bind:value id={controlId} {type} {placeholder} {disabled} {required} {readonly} {name} {autocomplete} {oninput} aria-invalid={invalid ? "true" : undefined} aria-describedby={describedby} {...rest} />
</div>

<style>
  .ui-field { display: grid; gap: 6px; }
  .ui-field__label { color: var(--ui-fg-muted); font-size: 12px; font-weight: 600; }
  .ui-input[aria-invalid="true"] { border-color: var(--ui-fg); outline-color: var(--ui-fg); }
</style>
