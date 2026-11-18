<script lang="ts">let { children, class: className = '' }: { children?: import('svelte').Snippet; class?: string } = $props();</script>
<kbd class={['kbd', className].filter(Boolean).join(' ')}>{@render children?.()}</kbd>
