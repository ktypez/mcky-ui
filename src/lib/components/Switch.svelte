<script lang="ts">
  let { checked = $bindable(false), label, id, disabled = false, name, onchange, class: className = "", ...rest }: {
    checked?: boolean;
    label?: string;
    id?: string;
    disabled?: boolean;
    name?: string;
    onchange?: (event: Event) => void;
    class?: string;
  } = $props();
  const generatedId = $props.id();
  let controlId = $derived(id ?? generatedId);
</script>

<label class={["ui-switch", disabled && "ui-switch--disabled", className].filter(Boolean).join(" ")} for={controlId}>
  <input class="ui-switch__input" type="checkbox" role="switch" bind:checked id={controlId} {disabled} {name} {onchange} {...rest} />
  <span class="ui-switch__track" aria-hidden="true"><span></span></span>
  {#if label}<span>{label}</span>{/if}
</label>

<style>
  .ui-switch { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; }
  .ui-switch__input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; clip-path: inset(50%); }
  .ui-switch__track { display: inline-flex; width: 34px; height: 20px; padding: 2px; align-items: center; border: 1px solid var(--ui-border-strong); border-radius: 999px; background: var(--ui-bg-muted); transition: background var(--ui-duration-fast) var(--ui-ease); }
  .ui-switch__track span { width: 14px; height: 14px; border-radius: 50%; background: var(--ui-fg-muted); transition: transform var(--ui-duration-fast) var(--ui-ease), background var(--ui-duration-fast) var(--ui-ease); }
  .ui-switch__input:checked + .ui-switch__track { background: var(--ui-inverse-bg); border-color: var(--ui-inverse-bg); }
  .ui-switch__input:checked + .ui-switch__track span { transform: translateX(14px); background: var(--ui-inverse-fg); }
  .ui-switch__input:focus-visible + .ui-switch__track { outline: 2px solid var(--ui-fg); outline-offset: 3px; }
  .ui-switch--disabled { opacity: .5; cursor: not-allowed; }
</style>
