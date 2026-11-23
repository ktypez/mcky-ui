<script lang="ts">
  import { burstConfetti, withoutTransitions } from '../src/lib/motion';

  let replay = $state(0);
  let modal = $state(false);
  let toasts = $state<{ id: number; text: string; variant: 'info' | 'success' | 'error' | 'warning'; out: boolean }[]>([]);
  let toastId = 0;

  const dots = [
    { label: 'ONLINE', variant: '' },
    { label: 'OK', variant: 'mcky-v6-dot-live--ok' },
    { label: 'STALE', variant: 'mcky-v6-dot-live--warn' },
    { label: 'ERROR', variant: 'mcky-v6-dot-live--error' }
  ];

  const staggerItems = ['ภาพรวม', 'เพิ่มบันทึก', 'ประวัติ', 'ตารางเวร', 'รายได้', 'สรุป'];

  function pushToast(text: string, variant: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const id = (toastId += 1);
    toasts = [...toasts, { id, text, variant, out: false }];
    window.setTimeout(() => {
      toasts = toasts.map((t) => (t.id === id ? { ...t, out: true } : t));
    }, 2200);
    window.setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
    }, 2450);
  }

  function celebrate() {
    pushToast('อัปเดตสถานะสำเร็จ', 'success');
    burstConfetti({ count: 140, spread: 80, origin: { y: 0.6 } });
  }

  function swapWithoutSmear() {
    withoutTransitions(() => {
      replay += 1;
    });
  }
</script>

<main class="board">
  <header class="topbar">
    <span class="brand"><span class="brand-mark">m<span>.</span></span> mcky-ui · V6</span>
    <span class="topbar-meta"><span class="mcky-v6-dot-live"></span> MOTION FOUNDATION</span>
  </header>

  <section class="mcky-v6-canvas hero">
    <div class="hero-art" aria-hidden="true">
      <span class="mcky-v6-orbit orbit-one"></span>
      <span class="mcky-v6-orbit orbit-two"></span>
      <span class="mcky-v6-spark spark-a">✳</span>
      <span class="mcky-v6-spark mcky-v6-spark--delay spark-b">✦</span>
      <span class="node node-truck mcky-v6-float">TRUCK</span>
      <span class="node node-data mcky-v6-float mcky-v6-float--delay">DATA</span>
      <span class="core mcky-v6-bob">V6</span>
    </div>
    <div class="mcky-v6-rule hero-eyebrow">WORK SHELL · MOTION</div>
    <h1>Animations,<br /><span>decorations</span>, transitions.</h1>
    <p>Extracted from the Attendance Terminal language and folded into V6: drifting clouds, twinkling sparkles, orbit rings, lift/press transitions, staged entrances, toasts and confetti — all reduced-motion aware.</p>
    <div class="hero-actions">
      <button class="mcky-v6-button mcky-v6-tilt" onclick={celebrate}>🚀 Celebrate</button>
      <button class="mcky-v6-button mcky-v6-lift ghost" onclick={() => pushToast('โหลดข้อมูลแล้ว', 'info')}>Show toast</button>
      <button class="mcky-v6-button mcky-v6-press ghost" onclick={() => (modal = true)}>Open overlay</button>
    </div>
  </section>

  <section class="grid">
    <div class="mcky-v6-card mcky-v6-strip panel">
      <div class="mcky-v6-rule">INTERACTIONS</div>
      <div class="row">
        <button class="mcky-v6-button mcky-v6-lift">Lift</button>
        <button class="mcky-v6-button mcky-v6-tilt">Tilt</button>
        <button class="mcky-v6-button mcky-v6-press">Press</button>
        <button class="mcky-v6-button mcky-v6-lift" disabled>Disabled</button>
      </div>
      <p class="hint">Hover moves −2px with an 8px hard shadow; press scales to 0.96. Hover effects only exist under <code>(hover: hover)</code>, and disabled controls never move.</p>
    </div>

    <div class="mcky-v6-card panel">
      <div class="mcky-v6-rule">LOADING & STATUS</div>
      <div class="mcky-v6-loading-bar"></div>
      <div class="row status-row">
        {#each dots as dot}
          <span class="status"><span class="mcky-v6-dot-live {dot.variant}"></span>{dot.label}</span>
        {/each}
        <button class="mcky-v6-button mcky-v6-lift ghost icon" onclick={() => pushToast('รีเฟรชแล้ว', 'info')} aria-label="refresh">⟳</button>
      </div>
      <div class="mcky-v6-shimmer skeleton mcky-v6-lift">
        <span class="skeleton-line wide"></span><span class="skeleton-line narrow"></span>
      </div>
    </div>

    <div class="mcky-v6-card panel" style={`--mcky-v6-strip-color: var(--mcky-v6-yellow)`}>
      <div class="mcky-v6-rule">STAGED ENTRANCE · 100MS</div>
      {#key replay}
        <div class="stagger mcky-v6-stagger">
          {#each staggerItems as item}
            <span class="stagger-item">{item}</span>
          {/each}
        </div>
      {/key}
      <button class="mcky-v6-button mcky-v6-lift ghost replay" onclick={swapWithoutSmear}>Replay entrance</button>
    </div>

    <div class="mcky-v6-card panel">
      <div class="mcky-v6-rule">DECORATION</div>
      <div class="deco-row">
        <span class="deco-dot mcky-v6-dotted"></span>
        <span class="deco-dot mcky-v6-dotted-light"></span>
        <span class="deco-spark mcky-v6-spark">✳</span>
        <span class="deco-spark mcky-v6-spark mcky-v6-spark--delay">✦</span>
        <span class="deco-badge mcky-v6-shimmer">NEW</span>
      </div>
      <p class="hint">Dotted paper, twinkling sparkles, shimmer sweep, dashed orbit rings and drifting clouds. Every loop stops under reduced motion.</p>
    </div>
  </section>

  <footer class="foot">
    <span class="mcky-v6-dot-live mcky-v6-dot-live--ok"></span>
    <span>V6.1 · MOTION & DECORATION · SVELTE 5 · CSS-FIRST</span>
  </footer>
</main>

{#if modal}
  <div class="mcky-v6-overlay" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) modal = false }}>
    <div class="mcky-v6-card modal" role="dialog" aria-modal="true" aria-label="V6 overlay">
      <div class="mcky-v6-rule">OVERLAY</div>
      <h2>Sky backdrop &amp; pop-in</h2>
      <p>Overlays fade in the backdrop and pop the box with a 300ms ease. Scrolling stays contained.</p>
      <button class="mcky-v6-button mcky-v6-lift" onclick={() => (modal = false)}>Close</button>
    </div>
  </div>
{/if}

<div class="mcky-v6-toast-stack">
  {#each toasts as toast (toast.id)}
    <div
      class="mcky-v6-toast {toast.out ? 'mcky-v6-toast--out' : ''} {toast.variant !== 'info' ? `mcky-v6-toast--${toast.variant}` : ''}"
      role="status"
    >
      {toast.text}
    </div>
  {/each}
</div>

<style>
  :global(body) {
    margin: 0;
    background: var(--mcky-v6-sky);
    color: var(--mcky-v6-ink);
    font-family: var(--mcky-v6-font-body);
  }
  .board { width: min(100% - 28px, 1080px); margin: 22px auto 40px; }
  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 14px; font: 500 10px var(--mcky-v6-font-mono); letter-spacing: 0.1em; }
  .brand { display: inline-flex; align-items: center; gap: 9px; font: 700 13px var(--mcky-v6-font-display); letter-spacing: 0.04em; }
  .brand-mark { display: grid; place-items: center; width: 34px; height: 34px; background: var(--mcky-v6-yellow); border: 2.5px solid var(--mcky-v6-ink); border-radius: 11px; box-shadow: 3px 3px 0 var(--mcky-v6-ink); font: 700 18px var(--mcky-v6-font-display); }
  .brand-mark span { color: var(--mcky-v6-blue); }
  .topbar-meta { display: inline-flex; align-items: center; gap: 8px; }

  .hero { border: 2.5px solid var(--mcky-v6-ink); border-radius: var(--mcky-v6-radius); box-shadow: var(--mcky-v6-shadow); padding: 34px 30px; overflow: clip; display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: center; gap: 26px; }
  .hero-eyebrow { max-width: 320px; }
  .hero h1 { margin: 16px 0 12px; font: 700 clamp(34px, 5vw, 54px) / 0.98 var(--mcky-v6-font-display); letter-spacing: -0.06em; }
  .hero h1 span { color: #fff; text-shadow: 1.5px 1.5px var(--mcky-v6-ink), -1px -1px var(--mcky-v6-ink), 1px -1px var(--mcky-v6-ink), -1px 1px var(--mcky-v6-ink); }
  .hero p { max-width: 520px; margin: 0; font-size: 13px; line-height: 1.75; color: #2c2c2c; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 20px; }
  .hero-art { position: relative; height: 240px; display: grid; place-items: center; }
  .orbit-one { width: 245px; height: 160px; transform: rotate(-24deg); }
  .orbit-two { width: 190px; height: 230px; transform: rotate(52deg); animation-direction: reverse; }
  .core { display: grid; place-items: center; width: 104px; height: 104px; background: var(--mcky-v6-yellow); border: 2.5px solid var(--mcky-v6-ink); border-radius: 30px; box-shadow: 6px 6px 0 var(--mcky-v6-ink); font: 700 34px var(--mcky-v6-font-display); }
  .node { position: absolute; padding: 7px 9px; background: var(--mcky-v6-paper); border: 2px solid var(--mcky-v6-ink); border-radius: 12px; box-shadow: 3px 3px 0 var(--mcky-v6-ink); font: 500 9px var(--mcky-v6-font-mono); letter-spacing: 0.08em; }
  .node-truck { top: 10%; left: 6%; }
  .node-data { bottom: 12%; right: 8%; }
  .spark-a { position: absolute; top: 14px; right: 40px; font-size: 24px; color: var(--mcky-v6-ink); }
  .spark-b { position: absolute; bottom: 18px; left: 30px; font-size: 20px; color: var(--mcky-v6-blue); }

  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 14px; }
  .panel { padding: 16px; display: flex; flex-direction: column; gap: 13px; }
  .row { display: flex; flex-wrap: wrap; gap: 9px; }
  .ghost { background: var(--mcky-v6-paper); }
  .icon { min-width: 40px; padding-inline: 12px; }
  .hint { margin: 0; font-size: 11.5px; line-height: 1.65; color: #4a4a4a; }
  code { font-family: var(--mcky-v6-font-mono); font-size: 10.5px; background: var(--mcky-v6-cream); border: 1px solid rgba(17, 17, 17, 0.18); border-radius: 5px; padding: 1px 4px; }
  .status-row { align-items: center; gap: 14px; }
  .status { display: inline-flex; align-items: center; gap: 7px; font: 500 9.5px var(--mcky-v6-font-mono); letter-spacing: 0.06em; }
  .skeleton { display: flex; flex-direction: column; gap: 10px; padding: 14px; border: 1.5px solid rgba(17, 17, 17, 0.25); border-radius: var(--mcky-v6-radius-sm); background: var(--mcky-v6-cream); }
  .skeleton-line { height: 12px; border-radius: 4px; background: rgba(17, 17, 17, 0.12); }
  .skeleton-line.wide { width: 68%; }
  .skeleton-line.narrow { width: 38%; }
  .stagger { display: flex; flex-wrap: wrap; gap: 7px; }
  .stagger-item { padding: 6px 10px; border: 1.5px solid var(--mcky-v6-ink); border-radius: 9px; background: var(--mcky-v6-cream); font: 700 10px var(--mcky-v6-font-mono); }
  .replay { align-self: flex-start; }
  .deco-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .deco-dot { width: 56px; height: 42px; border: 1.5px solid var(--mcky-v6-ink); border-radius: 10px; }
  .deco-dot.mcky-v6-dotted { background-color: var(--mcky-v6-cream); }
  .deco-dot.mcky-v6-dotted-light { background-color: var(--mcky-v6-blue); }
  .deco-spark { font-size: 26px; }
  .deco-badge { padding: 7px 11px; border: 1.5px solid var(--mcky-v6-ink); border-radius: 9px; background: var(--mcky-v6-yellow); font: 700 10px var(--mcky-v6-font-mono); }
  .modal { width: min(420px, 100%); padding: 22px; display: flex; flex-direction: column; gap: 12px; text-align: left; }
  .modal h2 { margin: 0; font: 700 22px var(--mcky-v6-font-display); letter-spacing: -0.03em; }
  .modal p { margin: 0; font-size: 12.5px; line-height: 1.7; color: #4a4a4a; }
  .modal .mcky-v6-button { align-self: flex-start; }
  .foot { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 22px; font: 500 9.5px var(--mcky-v6-font-mono); letter-spacing: 0.1em; color: #333; }
  @media (max-width: 780px) {
    .hero { grid-template-columns: 1fr; padding: 24px 20px; }
    .hero-art { height: 200px; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
