<script lang="ts">
  import { Moon, Sun } from 'phosphor-svelte'
  import { portalMode, togglePortalMode } from '../lib/theme'
</script>

<button
  class="icon-button mode-toggle mcky-v6-press"
  type="button"
  aria-label={$portalMode === 'day' ? 'เปลี่ยนเป็นโหมดกลางคืน' : 'เปลี่ยนเป็นโหมดกลางวัน'}
  aria-pressed={$portalMode === 'night'}
  title={$portalMode === 'day' ? 'โหมดกลางคืน' : 'โหมดกลางวัน'}
  onclick={togglePortalMode}
>
  {#if $portalMode === 'night'}<Sun size={18} weight="bold" />{:else}<Moon size={18} weight="bold" />{/if}
</button>
