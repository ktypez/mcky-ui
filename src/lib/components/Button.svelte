<script lang="ts">
  import type { Snippet } from "svelte";
  let { variant = "secondary", type = "button", disabled = false, onclick, children, class: className = "", ...rest }: {
    variant?: "primary" | "secondary" | "ghost" | "pop" | "danger";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<button class={["ui-button", variant === "primary" && "ui-button--primary", variant === "ghost" && "ui-button--ghost", variant === "pop" && "btn-pop", variant === "danger" && "btn-danger", className].filter(Boolean).join(" ")} {type} {disabled} {onclick} {...rest}>
  {@render children?.()}
</button>

<style>
  .ui-button--ghost { border-color: transparent; background: transparent; }
  .ui-button--ghost:hover { background: var(--ui-bg-subtle); }
</style>
