<script lang="ts">
  import type { Snippet } from 'svelte';
  let { label, hint, error, required = false, children, class: className = '' }: { label?: string; hint?: string; error?: string; required?: boolean; children?: Snippet; class?: string } = $props();
</script>
<fieldset class={['ui-field', className].filter(Boolean).join(' ')} aria-describedby={error ? undefined : hint ? 'field-hint' : undefined}>
  {#if label}<legend class="ui-field__label">{label}{#if required}<span aria-hidden="true"> *</span>{/if}</legend>{/if}
  <div class="ui-field__control">{@render children?.()}</div>
  {#if error}<p class="ui-field__error" role="alert">{error}</p>{:else if hint}<p class="ui-field__hint" id="field-hint">{hint}</p>{/if}
</fieldset>
<style>
  fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
  legend { margin-bottom: 7px; padding: 0; }
  .ui-field__error { margin:0; color:var(--danger-ink); font-size:12px; }.ui-field__hint { margin:0; color:var(--ink-faint); font-size:12px; }
</style>
