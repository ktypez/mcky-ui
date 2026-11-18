<script lang="ts">
  let { value = $bindable(""), label, id, options = [], placeholder = "Select an option", disabled = false, required = false, name, onchange, class: className = "", ...rest }: {
    value?: string;
    label?: string;
    id?: string;
    options?: Array<{ label: string; value: string; disabled?: boolean }>;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    onchange?: (event: Event) => void;
    class?: string;
  } = $props();
  const generatedId = $props.id();
  let controlId = $derived(id ?? generatedId);
</script>

<div class={["ui-field", className].filter(Boolean).join(" ")}>
  {#if label}<label class="ui-field__label" for={controlId}>{label}</label>{/if}
  <select class="ui-select" bind:value id={controlId} {disabled} {required} {name} {onchange} {...rest}>
    <option value="" disabled>{placeholder}</option>
    {#each options as option (option.value)}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .ui-field { display: grid; gap: 6px; }
  .ui-field__label { color: var(--ui-fg-muted); font-size: 12px; font-weight: 600; }
  .ui-select { width: 100%; min-height: 44px; padding: 10px 34px 10px 14px; border: 1.5px solid var(--rule-2); border-radius: var(--r2); background: var(--card); color: var(--ink); font: inherit; }
  .ui-select:focus-visible { outline: 2px solid var(--ui-fg); outline-offset: 2px; }
  .ui-select:disabled { opacity: .5; cursor: not-allowed; }
</style>
