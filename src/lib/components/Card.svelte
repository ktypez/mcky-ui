<script lang="ts">
  import type { Snippet } from "svelte";
  let { padding = "16px", class: className = "", children }: {
    padding?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<section class={["ui-surface", className].filter(Boolean).join(" ")} style:padding>
  {@render children?.()}
</section>
