<script lang="ts">
  type Option = { label: string; value: string; disabled?: boolean };
  let { value = $bindable(''), options = [], label, name, disabled = false, onchange, class: className = '' }: { value?: string; options?: Option[]; label?: string; name?: string; disabled?: boolean; onchange?: (value: string) => void; class?: string } = $props();
</script>
<div class={['segmented', className].filter(Boolean).join(' ')} role="group" aria-label={label}>
  {#each options as option (option.value)}
    <button type="button" class:active={value === option.value} aria-pressed={value === option.value} disabled={disabled || option.disabled} onclick={() => { value = option.value; onchange?.(value); }}>{option.label}</button>
  {/each}
</div>
<style>
  .segmented { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; border: 1px solid var(--rule); border-radius: 999px; background: var(--paper-2); }
  button { min-height: 36px; padding: 7px 14px; border: 1.5px solid transparent; border-radius: 999px; background: transparent; color: var(--ink-soft); font-weight: 650; cursor: pointer; }
  button:hover { color: var(--ink); } button.active { border-color: var(--hard); background: var(--card); color: var(--ink); box-shadow: 2px 2px 0 var(--hard); }
  button:disabled { opacity: .45; cursor: not-allowed; }
</style>
