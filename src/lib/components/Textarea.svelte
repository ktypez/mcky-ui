<script lang="ts">
  let { value = $bindable(""), label, id, placeholder = "", rows = 4, disabled = false, required = false, name, oninput, class: className = "", ...rest }: {
    value?: string;
    label?: string;
    id?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    oninput?: (event: Event) => void;
    class?: string;
  } = $props();
  const generatedId = $props.id();
  let controlId = $derived(id ?? generatedId);
</script>

<div class={["ui-field", className].filter(Boolean).join(" ")}>
  {#if label}<label class="ui-field__label" for={controlId}>{label}</label>{/if}
  <textarea class="ui-textarea" bind:value id={controlId} {placeholder} {rows} {disabled} {required} {name} {oninput} {...rest}></textarea>
</div>

<style>
  .ui-field { display: grid; gap: 6px; }
  .ui-field__label { color: var(--ui-fg-muted); font-size: 12px; font-weight: 600; }
  .ui-textarea { width: 100%; min-height: 80px; padding: 9px 12px; border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-md); background: var(--ui-bg); color: var(--ui-fg); font: inherit; resize: vertical; }
  .ui-textarea::placeholder { color: var(--ui-fg-subtle); }
  .ui-textarea:focus-visible { outline: 2px solid var(--ui-fg); outline-offset: 2px; }
  .ui-textarea:disabled { opacity: .5; cursor: not-allowed; }
</style>
