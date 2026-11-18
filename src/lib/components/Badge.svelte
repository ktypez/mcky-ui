<script lang="ts">
  let { tone = "neutral", size = "md", class: className = "", children, ...rest }: {
    tone?: "neutral" | "solid" | "outline" | "acc" | "pop" | "credit" | "pen";
    size?: "sm" | "md";
    class?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

<span class={["ui-badge", `ui-badge--${tone}`, `ui-badge--${size}`, className].filter(Boolean).join(" ")} {...rest}>
  {@render children?.()}
</span>

<style>
  .ui-badge { display: inline-flex; align-items: center; width: fit-content; border: 1px solid var(--ui-border-strong); border-radius: 999px; font-weight: 600; line-height: 1.4; white-space: nowrap; }
  .ui-badge--sm { padding: 2px 7px; font-size: 10px; }
  .ui-badge--md { padding: 3px 9px; font-size: 11px; }
  .ui-badge--solid { background: var(--acc); border-color: var(--hard); color: #fff; box-shadow: 2px 2px 0 var(--hard); }
  .ui-badge--outline { background: transparent; }
  .ui-badge--acc { background: var(--acc-tint); color: var(--acc-ink); border-color: color-mix(in srgb,var(--acc) 28%,transparent); }
  .ui-badge--pop { background: var(--pop-tint); color: var(--pop-ink); border-color: color-mix(in srgb,var(--pop) 28%,transparent); }
  .ui-badge--credit { background: var(--credit-tint); color: var(--credit-ink); border-color: color-mix(in srgb,var(--credit) 28%,transparent); }
  .ui-badge--pen { background: var(--penpay-tint); color: var(--penpay-ink); border-color: color-mix(in srgb,var(--penpay) 28%,transparent); }
</style>
