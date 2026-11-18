<script lang="ts">
  import type { Snippet } from "svelte";
  let { padding = "16px", title, right, class: className = "", children }: {
    padding?: string; title?: string; right?: Snippet;
    class?: string; children?: Snippet;
  } = $props();
</script>

<section class={["ui-surface", className].filter(Boolean).join(" ")} style:padding>
  {#if title || right}<header class="ui-card__header">{#if title}<h3>{title}</h3>{/if}{#if right}{@render right()}{/if}</header>{/if}
  {@render children?.()}
</section>
<style>
  .ui-card__header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
  .ui-card__header h3 { margin:0; font-size:15px; font-weight:800; }
</style>
