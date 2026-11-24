<script lang="ts">
  import { portalMode } from '../lib/theme';

  /** Portal scenery — kept in sync with @mcky/ui/scenery. */
  interface SceneryProps {
    mode?: 'day' | 'night';
  }

  let { mode }: SceneryProps = $props();
  const activeMode = $derived(mode ?? $portalMode);

  // Same spatial rhythm as the Portal view, drawn as soft layered shapes.
  const clouds = [
    { left: '5%', top: '9%', width: 196, scale: 1, delay: '-3s', duration: '28s' },
    { left: '66%', top: '15%', width: 152, scale: 0.82, delay: '-11s', duration: '33s' },
    { left: '35%', top: '25%', width: 112, scale: 0.62, delay: '-19s', duration: '39s' },
  ];

  const stars = [
    { left: '7%', top: '9%', size: 2.2, delay: '0s', opacity: 0.8, warm: true },
    { left: '18%', top: '18%', size: 1.4, delay: '0.8s', opacity: 0.55, warm: false },
    { left: '29%', top: '7%', size: 2.6, delay: '1.6s', opacity: 0.75, warm: true },
    { left: '41%', top: '15%', size: 1.6, delay: '0.4s', opacity: 0.6, warm: false },
    { left: '53%', top: '6%', size: 2.1, delay: '1.2s', opacity: 0.85, warm: true },
    { left: '64%', top: '21%', size: 1.3, delay: '2s', opacity: 0.5, warm: false },
    { left: '76%', top: '10%', size: 2.4, delay: '0.6s', opacity: 0.7, warm: true },
    { left: '87%', top: '19%', size: 1.5, delay: '1.9s', opacity: 0.55, warm: false },
    { left: '94%', top: '8%', size: 2, delay: '1.1s', opacity: 0.75, warm: true },
    { left: '12%', top: '32%', size: 1.4, delay: '2.4s', opacity: 0.5, warm: false },
    { left: '59%', top: '34%', size: 1.7, delay: '0.9s', opacity: 0.6, warm: true },
    { left: '82%', top: '39%', size: 1.2, delay: '1.7s', opacity: 0.45, warm: false },
  ];

  // Distant, hazy silhouettes give the skyline depth before the lit row.
  const skylineBack = [
    { left: '3%', width: 84, height: 106 },
    { left: '19%', width: 66, height: 78 },
    { left: '34%', width: 92, height: 124 },
    { left: '51%', width: 72, height: 92 },
    { left: '67%', width: 98, height: 132 },
    { left: '86%', width: 78, height: 100 },
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
</script>

<div class="mcky-v6-scenery" data-mode={activeMode} aria-hidden="true">
  {#if activeMode === 'night'}
    <div class="sky sky-night"></div>
    <div class="horizon-glow"></div>
    <div class="stars">
      {#each stars as star, index (index)}
        <span
          class="star"
          class:star-warm={star.warm}
          style:left={star.left}
          style:top={star.top}
          style:width={`${star.size}px`}
          style:height={`${star.size}px`}
          style:opacity={star.opacity}
          style:animation-delay={star.delay}
        ></span>
      {/each}
    </div>
    <div class="moon"></div>
    <div class="city-back">
      {#each skylineBack as far, index (index)}
        <span style:left={far.left} style:width={`${far.width}px`} style:height={`${far.height}px`}></span>
      {/each}
    </div>
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
              <span class:lit={building.lit.includes(cell)} class:dim={cell % 5 === 3}></span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="night-ground"></div>
  {:else}
    <div class="sky sky-day"></div>
    <div class="sun"></div>
    <div class="clouds">
      {#each clouds as cloud, index (index)}
        <div
          class="cloud"
          style:left={cloud.left}
          style:top={cloud.top}
          style:width={`${cloud.width}px`}
          style:--cloud-scale={cloud.scale}
          style:animation-delay={cloud.delay}
          style:animation-duration={cloud.duration}
        >
          <span class="puff puff-a"></span>
          <span class="puff puff-b"></span>
          <span class="puff puff-c"></span>
          <span class="cloud-base"></span>
          <span class="cloud-shade"></span>
        </div>
      {/each}
    </div>
    <div class="ridge ridge-far"></div>
    <div class="ridge ridge-mid"></div>
    <div class="tree tree-left">
      <span class="trunk"></span><span class="leaf leaf-a"></span><span class="leaf leaf-b"></span><span class="leaf leaf-c"></span>
    </div>
    <div class="tree tree-right">
      <span class="trunk"></span><span class="leaf leaf-a"></span><span class="leaf leaf-b"></span><span class="leaf leaf-c"></span>
    </div>
    <div class="ridge ridge-near"></div>
    <div class="meadow"></div>
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
  .sky { position: absolute; inset: 0; }
  .sky-day {
    background:
      radial-gradient(120% 70% at 82% 16%, rgba(255, 246, 206, 0.5), transparent 58%),
      linear-gradient(180deg, #86c2ec 0%, var(--mcky-v6-sky) 48%, #d9ecf8 100%);
  }
  .sky-night {
    background:
      radial-gradient(90% 50% at 50% 108%, rgba(255, 190, 130, 0.09), transparent 70%),
      linear-gradient(180deg, #101a33 0%, var(--mcky-v6-sky) 56%, #2a3558 100%);
  }

  /* Day — soft light, layered distance, no ink outlines. */
  .sun {
    position: absolute;
    top: 8%;
    right: 13%;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: radial-gradient(circle at 38% 34%, #fff3bd 0%, var(--mcky-v6-yellow) 68%, #f5c412 100%);
    box-shadow: 0 0 0 16px rgba(255, 224, 130, 0.12), 0 0 60px 24px rgba(255, 220, 120, 0.16);
  }
  .cloud {
    position: absolute;
    height: 58px;
    opacity: 0.9;
    transform-origin: center;
    filter: drop-shadow(0 8px 9px rgba(54, 91, 120, 0.09));
    animation: scenery-cloud-drift 30s ease-in-out infinite alternate;
  }
  .puff,
  .cloud-base,
  .cloud-shade { position: absolute; display: block; }
  .puff {
    border-radius: 50%;
    background: linear-gradient(180deg, #ffffff 0%, #e6f0f8 100%);
  }
  .puff-a { width: 48%; height: 76%; left: 5%; bottom: 24%; }
  .puff-b { width: 58%; height: 92%; left: 28%; bottom: 18%; }
  .puff-c { width: 34%; height: 60%; left: 62%; bottom: 25%; }
  .cloud-base {
    left: 2%; right: 4%; bottom: 6%; height: 42%;
    border-radius: 999px;
    background: linear-gradient(180deg, #f7fbff 0%, #dceaf5 100%);
  }
  .cloud-shade {
    left: 12%; right: 12%; bottom: 4%; height: 22%;
    border-radius: 999px;
    background: rgba(152, 183, 205, 0.24);
    filter: blur(4px);
  }
  .ridge {
    position: absolute;
    left: -12%;
    width: 124%;
    border-radius: 50% 50% 0 0 / 38% 42% 0 0;
  }
  .ridge-far { bottom: -118px; height: 220px; background: linear-gradient(180deg, #bcdcb8, #a4cba2); opacity: 0.72; }
  .ridge-mid { bottom: -132px; height: 218px; background: linear-gradient(180deg, #8dc083, #79af76); }
  .ridge-near { bottom: -160px; height: 230px; background: linear-gradient(180deg, #63a164, #4f8a57); }
  .meadow {
    position: absolute;
    inset: auto 0 0;
    height: 78px;
    background: linear-gradient(180deg, rgba(86, 148, 91, 0.35), #447a4c 78%, #3c7046);
  }
  .meadow::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(97deg, transparent 0 13px, rgba(29, 79, 43, 0.16) 13px 14px, transparent 14px 27px);
    -webkit-mask-image: linear-gradient(180deg, transparent, #000 62%);
    mask-image: linear-gradient(180deg, transparent, #000 62%);
  }
  .tree { position: absolute; bottom: 70px; width: 54px; height: 92px; opacity: 0.92; }
  .tree-left { left: 13%; }
  .tree-right { right: 15%; transform: scale(0.82); }
  .trunk {
    position: absolute;
    bottom: 0; left: 24px; width: 7px; height: 40px;
    border-radius: 4px 4px 1px 1px;
    background: linear-gradient(90deg, #6f5138, #8a6848 55%, #5f452f);
  }
  .leaf {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle at 36% 28%, #79b374, #4e8c58 78%);
  }
  .leaf-a { width: 34px; height: 34px; left: 4px; top: 16px; }
  .leaf-b { width: 40px; height: 40px; left: 12px; top: 4px; }
  .leaf-c { width: 30px; height: 30px; left: 22px; top: 20px; }

  /* Night — low-contrast depth, warm windows, a soft crescent. */
  .horizon-glow {
    position: absolute;
    inset: auto 0 0;
    height: 34%;
    background: linear-gradient(180deg, transparent, rgba(96, 118, 168, 0.16) 72%, rgba(34, 47, 82, 0.4));
  }
  .stars .star {
    position: absolute;
    border-radius: 50%;
    background: #d8e4ff;
    animation: scenery-star-breathe 4.2s ease-in-out infinite;
  }
  .stars .star-warm { background: #fff1cf; }
  .moon {
    position: absolute;
    top: 11%;
    right: 14%;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: radial-gradient(circle at 36% 30%, #fffaf0, #e8e0c8 78%);
    box-shadow: 0 0 34px 10px rgba(246, 239, 210, 0.12);
  }
  .moon::after {
    content: '';
    position: absolute;
    top: -8px; left: 13px;
    width: 52px; height: 52px;
    border-radius: 50%;
    background: radial-gradient(circle at 32% 22%, #142039, #1b2440 82%);
    filter: blur(0.4px);
  }
  .city-back, .city { position: absolute; inset: auto 0 0; height: 220px; }
  .city-back span {
    position: absolute;
    bottom: 0;
    border-radius: 2px 2px 0 0;
    background: linear-gradient(180deg, #2b385d, #24304f);
    opacity: 0.62;
  }
  .city { height: 210px; }
  .building {
    position: absolute;
    bottom: 0;
    border-radius: 2px 2px 0 0;
    background: linear-gradient(180deg, #1b2542 0%, #121a31 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .building::before {
    content: '';
    position: absolute;
    top: -5px; left: 16%; width: 68%; height: 5px;
    border-radius: 2px 2px 0 0;
    background: #1b2542;
  }
  .windows {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 9px;
    padding: 16px 10px;
  }
  .windows span { width: 7px; height: 9px; border-radius: 1px; background: rgba(187, 205, 240, 0.05); }
  .windows span.lit { background: linear-gradient(180deg, #ffd98a, #e2a955); opacity: 0.88; }
  .windows span.lit.dim { opacity: 0.5; background: linear-gradient(180deg, #cbd9f5, #9db3dc); }
  .night-ground {
    position: absolute;
    inset: auto 0 0;
    height: 26px;
    background: linear-gradient(180deg, transparent, rgba(8, 13, 27, 0.7));
  }

  @keyframes scenery-cloud-drift {
    from { transform: scale(var(--cloud-scale)) translate(-6px, 2px); }
    to { transform: scale(var(--cloud-scale)) translate(18px, -7px); }
  }
  @keyframes scenery-star-breathe {
    0%, 100% { filter: brightness(0.78); }
    50% { filter: brightness(1.25); }
  }

  @media (prefers-reduced-motion: reduce) {
    .cloud, .stars .star { animation: none; }
  }

  @media (max-width: 620px) {
    .sun { top: 7%; right: 9%; width: 52px; height: 52px; }
    .cloud { opacity: 0.72; }
    .tree-left { left: 5%; }
    .tree-right { right: 5%; }
    .building { opacity: 0.94; }
  }
</style>
