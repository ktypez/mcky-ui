<script lang="ts">
  let { checked = $bindable(false), label, id, disabled = false, required = false, name, value, onchange, class: className = "", ...rest }: {
    checked?: boolean;
    label?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onchange?: (event: Event) => void;
    class?: string;
  } = $props();
  const generatedId = $props.id();
  let controlId = $derived(id ?? generatedId);
</script>

<label class={["ui-check", disabled && "ui-check--disabled", className].filter(Boolean).join(" ")} for={controlId}>
  <input class="ui-check__control" type="checkbox" bind:checked id={controlId} {disabled} {required} {name} {value} {onchange} {...rest} />
  {#if label}<span>{label}</span>{/if}
</label>

<style>
  .ui-check { display: inline-flex; align-items: center; gap: 9px; color: var(--ui-fg); cursor: pointer; }
  .ui-check__control { width: 16px; height: 16px; margin: 0; accent-color: var(--ui-fg); }
  .ui-check--disabled { opacity: .5; cursor: not-allowed; }
</style>
