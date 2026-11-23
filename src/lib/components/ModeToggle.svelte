<script lang="ts">
  import { onMount } from 'svelte';
  import {
    applyV6Mode,
    onV6ModeChange,
    readV6Preference,
    resolveV6Mode,
    toggleV6Mode,
    type V6Mode,
  } from '../theme';

  let mode = $state<V6Mode>(resolveV6Mode(readV6Preference()));

  onMount(() => {
    // Startup resolves the stored preference (including `auto`) before paint.
    applyV6Mode();
    return onV6ModeChange((next) => { mode = next; });
  });
</script>

<button
  class="mcky-v6-mode-toggle mcky-v6-press"
  type="button"
  aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  aria-pressed={mode === 'dark'}
  title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
  onclick={toggleV6Mode}
>
  <span aria-hidden="true">{mode === 'dark' ? '☀' : '☾'}</span>
</button>

<style>
  .mcky-v6-mode-toggle {
    display: inline-grid;
    place-items: center;
    width: 36px;
    height: 36px;
    padding: 0;
    color: var(--mcky-v6-ink);
    background: var(--mcky-v6-paper);
    border: var(--mcky-v6-outline);
    border-radius: var(--mcky-v6-radius-sm);
    box-shadow: var(--mcky-v6-shadow-sm);
    font: 700 16px/1 var(--mcky-v6-font-body);
    cursor: pointer;
  }
</style>
