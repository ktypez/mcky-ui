<script lang="ts">
  let { tone = "neutral", size = "md", class: className = "", children, ...rest }: {
    tone?: "neutral" | "solid" | "outline";
    size?: "sm" | "md";
    class?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

<span class={["ui-badge", `ui-badge--${tone}`, `ui-badge--${size}`, className].filter(Boolean).join(" ")} {...rest}>
  {@render children?.()}
</span>

<style>
  .ui-badge { display: inline-flex; align-items: center; width: fit-content; border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-full); font-weight: 600; line-height: 1.4; white-space: nowrap; }
  .ui-badge--sm { padding: 2px 7px; font-size: 10px; }
  .ui-badge--md { padding: 3px 9px; font-size: 11px; }
  .ui-badge--solid { background: var(--ui-inverse-bg); border-color: var(--ui-inverse-bg); color: var(--ui-inverse-fg); }
  .ui-badge--outline { background: transparent; }
</style>
