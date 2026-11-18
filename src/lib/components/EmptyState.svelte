<script lang="ts">
  import type { Snippet } from 'svelte';
  let { title, description, action, class: className = '' }: { title: string; description?: string; action?: Snippet; class?: string } = $props();
</script>
<div class={['ui-empty-state', className].filter(Boolean).join(' ')}>
  <span class="ui-empty-state__mark" aria-hidden="true">✳</span>
  <div><h3>{title}</h3>{#if description}<p>{description}</p>{/if}</div>
  {#if action}{@render action()}{/if}
</div>
<style>
  .ui-empty-state { display:grid; justify-items:center; gap:12px; padding:36px 20px; text-align:center; }.ui-empty-state__mark { display:grid; width:52px; height:52px; place-items:center; border:1.5px solid var(--hard); border-radius:16px; background:var(--acc-tint); color:var(--acc-ink); box-shadow:3px 3px 0 var(--hard); font-size:28px; }.ui-empty-state h3 { margin:0; font-size:16px; }.ui-empty-state p { margin:4px 0 0; color:var(--ink-soft); font-size:13px; }
</style>
