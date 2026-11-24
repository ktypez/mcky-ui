<script lang="ts">
  import { onMount } from 'svelte';
  import {
    onV6ModeChange,
    readV6Preference,
    resolveV6Mode,
    type V6Mode,
  } from '../theme';

  /** Ported verbatim from the Portal implementation so every app sees one view. */
  interface SceneryProps {
    /** Override the theme; otherwise the component follows the shared V6 mode. */
    mode?: 'day' | 'night';
  }

  let { mode }: SceneryProps = $props();

  let activeModeState = $state<V6Mode>(resolveV6Mode(readV6Preference()));
  const activeMode = $derived(mode ?? (activeModeState === 'dark' ? 'night' : 'day'));

  onMount(() => {
    // The app normally sets this through applyV6Mode(); read it once at mount.
    activeModeState = (document.documentElement.dataset.v6Mode as V6Mode | undefined)
      ?? resolveV6Mode(readV6Preference());
    return onV6ModeChange((next) => { activeModeState = next; });
  });

  // The two primary clouds match the Attendance Terminal originals: 3.2rem
  // ☁️ glyphs at ~45% opacity, drifting on the shared 7s float loop.
  const clouds = [
    { left: '6%', top: '5%', size: '3.2rem', delay: '0s', duration: '7s' },
    { left: '68%', top: '12%', size: '2.6rem', delay: '2.5s', duration: '7s' },
    { left: '38%', top: '20%', size: '2rem', delay: '4s', duration: '10s' },
  ];

  const stars = [
    { left: '7%', top: '9%', size: 3, delay: '0s' },
    { left: '18%', top: '18%', size: 2, delay: '0.8s' },
    { left: '29%', top: '7%', size: 3, delay: '1.6s' },
    { left: '41%', top: '15%', size: 2, delay: '0.4s' },
    { left: '53%', top: '6%', size: 4, delay: '1.2s' },
    { left: '64%', top: '21%', size: 2, delay: '2s' },
    { left: '76%', top: '10%', size: 3, delay: '0.6s' },
    { left: '87%', top: '19%', size: 2, delay: '1.9s' },
    { left: '94%', top: '8%', size: 3, delay: '1.1s' },
    { left: '12%', top: '32%', size: 2, delay: '2.4s' },
    { left: '59%', top: '36%', size: 2, delay: '0.9s' },
    { left: '82%', top: '41%', size: 3, delay: '1.7s' },
  ];

  const buildings = [
    { left: '0%', width: 78, height: 132, lit: [0, 4, 9] },
    { left: '8%', width: 58, height: 96, lit: [2, 7] },
    { left: '15%', width: 92, height: 158, lit: [1, 5, 6, 11] },
    { left: '27%', width: 66, height: 112, lit: [3, 8] },
    { left: '36%', width: 84, height: 144, lit: [0, 2, 7, 10] },
    { left: '48%', width: 62, height: 92, lit: [1, 6] },
    { left: '57%', width: 96, height: 168, lit: [3, 4, 9, 11] },
    { left: '70%', width: 70, height: 118, lit: [0, 5, 8] },
    { left: '79%', width: 88, height: 150, lit: [2, 6, 10] },
    { left: '91%', width: 62, height: 104, lit: [1, 7] },
  ];

  const grass = [4, 14, 23, 34, 46, 58, 69, 81, 92];
</script>

<div class="mcky-v6-scenery" data-mode={activeMode} aria-hidden="true">
  <div class="scene-sky"></div>

  {#if activeMode === 'night'}
    <div class="scene-stars">
      {#each stars as star, index (index)}
        <span
          class="star mcky-v6-twinkle"
          style:left={star.left}
          style:top={star.top}
          style:width={`${star.size}px`}
          style:height={`${star.size}px`}
          style:animation-delay={star.delay}
        ></span>
      {/each}
    </div>
    <div class="moon"></div>
    <div class="night-hill"></div>
    <div class="city">
      {#each buildings as building, index (index)}
        <div
          class="building"
          style:left={building.left}
          style:width={`${building.width}px`}
          style:height={`${building.height}px`}
        >
          <div class="windows">
            {#each Array.from({ length: 12 }) as _, cell (cell)}
              <span class:lit={building.lit.includes(cell)}></span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="sun"></div>
    <div class="clouds">
      {#each clouds as cloud, index (index)}
        <span
          class="cloud mcky-v6-float"
          class:mcky-v6-float--delay={index === 1}
          class:mcky-v6-float--slow={index === 2}
          style:left={cloud.left}
          style:top={cloud.top}
          style:font-size={cloud.size}
          style:animation-delay={cloud.delay}
          style:animation-duration={cloud.duration}
        >☁️</span>
      {/each}
    </div>
    <div class="hill hill-back"></div>
    <div class="tree tree-left"><span class="trunk"></span><span class="canopy"></span></div>
    <div class="tree tree-right"><span class="trunk"></span><span class="canopy"></span></div>
    <div class="hill hill-front"></div>
    <div class="meadow">
      {#each grass as offset, index (index)}
        <span class="tuft" style:left={`${offset}%`} style:animation-delay={`${index * 0.3}s`}></span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .mcky-v6-scenery {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    background: var(--mcky-v6-sky);
  }
  .scene-sky { position: absolute; inset: 0; background: var(--mcky-v6-sky); }

  /* Day — calm meadow under the Attendance-style clouds. */
  .sun {
    position: absolute;
    top: 9%;
    right: 12%;
    width: 62px;
    height: 62px;
    border: 2.5px solid var(--mcky-v6-ink);
    border-radius: 50%;
    background: var(--mcky-v6-yellow);
    box-shadow: 0 0 0 12px rgba(255, 210, 31, 0.2);
  }
  .clouds .cloud {
    position: absolute;
    display: block;
    line-height: 1;
    opacity: 0.45;
    will-change: transform;
  }
  .hill {
    position: absolute;
    left: -10%;
    width: 120%;
    border-radius: 50% 50% 0 0;
  }
  .hill-back { bottom: -110px; height: 230px; background: #8ccb7a; }
  .hill-front { bottom: -150px; height: 230px; background: #69b45f; }
  .tree { position: absolute; bottom: 58px; width: 44px; height: 74px; }
  .tree-left { left: 12%; }
  .tree-right { right: 14%; transform: scale(0.8); }
  .trunk {
    position: absolute;
    bottom: 0;
    left: 18px;
    width: 8px;
    height: 34px;
    border: 2px solid var(--mcky-v6-ink);
    border-radius: 3px;
    background: #8a5a35;
  }
  .canopy {
    position: absolute;
    top: 0;
    left: 2px;
    width: 40px;
    height: 48px;
    border: 2px solid var(--mcky-v6-ink);
    border-radius: 50% 50% 45% 45%;
    background: #4f9c55;
  }
  .meadow { position: absolute; inset: auto 0 0; height: 60px; }
  .tuft {
    position: absolute;
    bottom: 0;
    width: 14px;
    height: 22px;
    border-bottom: 16px solid #3f8447;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }

  /* Night — stars, a crescent moon and a lit city skyline. */
  .star {
    position: absolute;
    border-radius: 50%;
    background: #fff6d8;
    animation: mcky-v6-twinkle 2.6s var(--mcky-v6-ease-in-out) infinite;
  }
  .moon {
    position: absolute;
    top: 12%;
    right: 14%;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: #f6efd2;
  }
  .moon::after {
    content: '';
    position: absolute;
    top: -7px;
    left: 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--mcky-v6-sky);
  }
  .night-hill {
    position: absolute;
    left: -10%;
    bottom: -100px;
    width: 120%;
    height: 190px;
    border-radius: 50% 50% 0 0;
    background: #263354;
  }
  .city { position: absolute; inset: auto 0 0; height: 220px; }
  .building {
    position: absolute;
    bottom: 0;
    border: 2px solid #42557f;
    border-bottom: 0;
    background: #16203c;
  }
  .windows {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px 9px;
    padding: 14px 10px;
  }
  .windows span { width: 9px; height: 11px; background: #2b3b64; }
  .windows span.lit { background: #ffd84d; box-shadow: 0 0 0 2px rgba(255, 216, 77, 0.2); }

  @media (prefers-reduced-motion: reduce) {
    .star { animation: none; }
  }

  @media (max-width: 620px) {
    .sun { top: 7%; right: 8%; width: 46px; height: 46px; }
    .clouds .cloud { opacity: 0.35; }
    .tree-left { left: 5%; }
    .tree-right { right: 5%; }
    .building { opacity: 0.9; }
  }
</style>
