<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonProps = Omit<HTMLButtonAttributes, "type" | "disabled" | "onclick" | "class"> & {
    variant?: "primary" | "secondary" | "ghost" | "pop" | "danger";
    type?: HTMLButtonAttributes["type"];
    disabled?: boolean | null;
    onclick?: HTMLButtonAttributes["onclick"];
    children?: Snippet;
    class?: string;
  };

  let { variant = "secondary", type = "button", disabled = false, onclick, children, class: className = "", ...rest }: ButtonProps = $props();
</script>

<button class={["ui-button", variant === "primary" && "ui-button--primary", variant === "ghost" && "ui-button--ghost", variant === "pop" && "btn-pop", variant === "danger" && "btn-danger", className].filter(Boolean).join(" ")} type={type ?? "button"} disabled={disabled ?? false} onclick={onclick ?? undefined} {...rest}>
  {@render children?.()}
</button>

<style>
  .ui-button--ghost { border-color: transparent; background: transparent; }
  .ui-button--ghost:hover { background: var(--ui-bg-subtle); }
</style>
