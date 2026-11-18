<script lang="ts">
  import { Badge, Button, Card, Checkbox, Chip, CountSticker, Input, Kbd, Monogram, Select, Segmented, Squiggle, Switch, Textarea, TopBar } from '../src/lib';
  let theme = $state<'light' | 'dark'>('light');
  let palette = $state('matcha');
  let texture = $state(true);
  let email = $state('hello@mcky.space');
  let count = $state(0);
  let accepted = $state(true);
  let notifications = $state(true);
  let category = $state('design');
  let notes = $state('Paper Pop makes the interface feel tactile without getting in the way.');
  let filter = $state('all');
  $effect(() => {
    const root = document.documentElement;
    root.dataset.mode = theme;
    root.dataset.theme = theme;
    root.dataset.palette = palette;
    root.dataset.texture = texture ? 'on' : 'off';
    root.classList.toggle('dark', theme === 'dark');
  });
  const nav = [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'foundations', label: 'Foundations', href: '#foundations' },
    { id: 'components', label: 'Components', href: '#components' },
    { id: 'usage', label: 'Usage', href: '#usage' }
  ];
</script>

<svelte:head>
  <title>mcky-ui · V5 Paper Pop</title>
  <meta name="description" content="V5 Paper Pop design system for the mcky.space ecosystem." />
  <meta name="theme-color" content={theme === 'dark' ? '#17181d' : '#f6f2e9'} />
</svelte:head>

<TopBar brand="mcky-ui" active="overview" items={nav}>
  {#snippet actions()}
    <Button variant="ghost" onclick={() => theme = theme === 'light' ? 'dark' : 'light'}>{theme === 'light' ? '☾ Dark' : '☀ Light'}</Button>
  {/snippet}
</TopBar>

<main class="page" id="top">
  <section class="hero" id="overview">
    <div class="hero-copy">
      <div class="eyebrow"><span class="eyebrow-dot"></span> SHARED DESIGN SYSTEM · V5</div>
      <h1>Make it feel<br /><span>like paper.</span></h1>
      <p>A tactile, expressive visual language for the mcky.space ecosystem. Warm paper, confident ink, playful color, and components that work everywhere.</p>
      <div class="hero-actions"><Button variant="primary" onclick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}>Explore components ↘</Button><Chip tone="acc">Svelte 5 · CSS first</Chip></div>
      <div class="hero-meta"><span>● Paper Pop</span><span>● Thai / English</span><span>● Light / Dark</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="art-card art-card--back"></div>
      <div class="art-card art-card--main"><div class="art-spark">✳</div><div class="art-word">paper<br /><b>pop!</b></div><Squiggle width={150}/><div class="art-dots">●　●　●</div></div>
      <div class="art-sticker">V5<br /><small>DESIGN KIT</small></div>
      <div class="art-orbit">✦</div>
    </div>
  </section>

  <section class="section" id="foundations">
    <div class="section-heading"><div><div class="eyebrow">01 / FOUNDATIONS</div><h2>Warm paper. Bold ink.</h2><p>Tokens are semantic, palette-aware, and switch cleanly between light and dark.</p></div><CountSticker value="04" label="palettes"/></div>
    <Card padding="20px" class="palette-card">
      <div class="palette-row"><div><b>Color palettes</b><p>Choose the accent language.</p></div><Segmented bind:value={palette} options={[{label:'Matcha',value:'matcha'},{label:'Coral',value:'coral'},{label:'Blueberry',value:'blueberry'},{label:'Butter',value:'butter'}]}/></div>
      <div class="swatches"><div class="swatch swatch-paper"><i></i><b>Paper</b><code>--paper</code></div><div class="swatch swatch-card"><i></i><b>Card</b><code>--card</code></div><div class="swatch swatch-ink"><i></i><b>Ink</b><code>--ink</code></div><div class="swatch swatch-rule"><i></i><b>Rule</b><code>--rule</code></div><div class="swatch swatch-acc"><i></i><b>Accent</b><code>--acc</code></div><div class="swatch swatch-pop"><i></i><b>Pop</b><code>--pop</code></div><div class="swatch swatch-credit"><i></i><b>Credit</b><code>--credit</code></div><div class="swatch swatch-pen"><i></i><b>Pen</b><code>--penpay</code></div></div>
      <div class="appearance-row"><Switch label="Dotted paper texture" bind:checked={texture}/><span class="appearance-spacer"></span><span class="mode-label">Appearance</span><Segmented bind:value={theme} options={[{label:'Light',value:'light'},{label:'Dark',value:'dark'}]}/></div>
    </Card>
    <div class="foundation-grid">
      <Card padding="20px"><div class="mini-label">TYPOGRAPHY</div><div class="type-sample">Aa กข</div><b>Sora + Noto Sans Thai</b><p class="muted">JetBrains Mono for identifiers, counts, and technical details.</p><div class="font-sample">The quick brown fox jumps over the lazy dog.<br/>ระบบเดียว ใช้ร่วมกันได้ทุกแอป</div></Card>
      <Card padding="20px"><div class="mini-label">SPACING & SHAPE</div><div class="spacing-list">{#each [4,8,12,16,20,24,32,40] as n}<div><code>{n}px</code><i style={`width:${n * 2}px`}></i></div>{/each}</div><div class="shape-row"><span class="shape shape-1">10</span><span class="shape shape-2">14</span><span class="shape shape-3">20</span><span class="shape shape-4">28</span><span class="hard-shadow">3×3</span></div></Card>
    </div>
  </section>

  <section class="section" id="components">
    <div class="section-heading"><div><div class="eyebrow">02 / COMPONENTS</div><h2>Small set. Full character.</h2><p>Reusable primitives with native behavior and accessible defaults.</p></div><CountSticker value="14" label="primitives" rotation={2}/></div>
    <div class="component-grid">
      <Card padding="20px"><div class="mini-label">BUTTONS</div><div class="demo-row"><Button variant="primary" onclick={() => count++}>Accent action</Button><Button>Outline</Button><Button variant="ghost">Ghost</Button></div><div class="demo-row"><Button variant="primary" disabled>Disabled</Button><Button onclick={() => count = 0}>Reset</Button></div><p class="muted">Pressed {count} times</p></Card>
      <Card padding="20px"><div class="mini-label">BADGES & CHIPS</div><div class="demo-row"><Badge tone="solid">Active</Badge><Badge>Neutral</Badge><Badge tone="outline">Outline</Badge></div><div class="demo-row"><Chip tone="acc" pressed={filter === 'all'} onclick={() => filter = 'all'}>All items</Chip><Chip tone="pop" pressed={filter === 'recent'} onclick={() => filter = 'recent'} count={12}>Recent</Chip><Chip pressed={filter === 'saved'} onclick={() => filter = 'saved'}>Saved</Chip></div></Card>
      <Card padding="20px"><div class="mini-label">FORM INPUTS</div><div class="control-stack"><Input label="Email address" type="email" bind:value={email} placeholder="you@example.com"/><Select label="Category" bind:value={category} options={[{label:'Design',value:'design'},{label:'Engineering',value:'engineering'},{label:'Product',value:'product'}]}/><Textarea label="Notes" bind:value={notes} rows={3}/></div></Card>
      <Card padding="20px"><div class="mini-label">CONTROLS</div><div class="control-stack"><Checkbox label="Accept terms and conditions" bind:checked={accepted}/><Switch label="Notifications enabled" bind:checked={notifications}/><div><span class="label">Density</span><Segmented value="cozy" options={[{label:'Cozy',value:'cozy'},{label:'Compact',value:'compact'}]}/></div></div></Card>
      <Card padding="20px"><div class="mini-label">STICKERS & IDENTITY</div><div class="demo-row identity-row"><CountSticker value="128" label="records"/><Monogram name="Mcky Design" size={46}/><Monogram name="Paper Pop" size={46}/><span class="sticker sample-sticker">New!</span></div><p class="muted">Hard edges, slight rotation, and offset shadows give the interface its paper-cut feel.</p></Card>
      <Card padding="20px"><div class="mini-label">KEYBOARD & EMPTY STATE</div><div class="demo-row"><Kbd>⌘</Kbd><Kbd>K</Kbd><span class="muted">Open command palette</span></div><div class="empty-demo"><span class="empty-mark">✳</span><b>Nothing here yet</b><span class="muted">Your next great thing starts here.</span></div></Card>
    </div>
  </section>

  <section class="section usage-section" id="usage">
    <div class="section-heading"><div><div class="eyebrow">03 / USAGE</div><h2>One import away.</h2><p>CSS foundation for static sites. Svelte components for interactive apps.</p></div></div>
    <Card padding="20px"><div class="mini-label">CSS FOUNDATION</div><pre>@import '@mcky/ui/core.css';</pre><div class="mini-label">SVELTE COMPONENTS</div><pre>import &#123; Button, Card, Chip, Input, TopBar &#125; from '@mcky/ui/svelte';</pre><div class="mini-label">THEME ATTRIBUTES</div><pre>&lt;html data-palette="matcha" data-mode="light" data-texture="on"&gt;</pre></Card>
  </section>
  <footer><b>mcky-ui <span>V5 · PAPER POP</span></b><span>Built for the mcky.space ecosystem</span><span>0.2.0 · Svelte 5</span></footer>
</main>

<style>
  :global(body) { font-size: 14px; }
  .page { width: min(100% - 40px, 1120px); margin-inline: auto; }
  .hero { display: grid; grid-template-columns: 1.1fr .9fr; align-items: center; gap: 36px; min-height: 490px; padding: 72px 0 64px; border-bottom: 1px dashed var(--rule-2); }
  .eyebrow,.mini-label { color: var(--ink-faint); font: 800 10px var(--font-mono); letter-spacing: .13em; }
  .eyebrow-dot { display: inline-block; width: 7px; height: 7px; margin-right: 6px; border-radius: 50%; background: var(--acc); }
  h1 { margin: 24px 0 18px; font-size: clamp(56px,8vw,94px); line-height: .94; letter-spacing: -.075em; font-weight: 800; }
  h1 span { color: var(--acc); }
  .hero-copy > p { max-width: 490px; color: var(--ink-soft); font-size: 16px; line-height: 1.8; }
  .hero-actions,.hero-meta,.demo-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
  .hero-actions { margin-top: 26px; }
  .hero-meta { gap: 20px; margin-top: 30px; color: var(--ink-faint); font: 10px var(--font-mono); }
  .hero-art { position: relative; display: grid; min-height: 340px; place-items: center; }
  .art-card { position: absolute; width: 250px; height: 300px; border: 1.5px solid var(--hard); border-radius: 26px; }
  .art-card--back { background: var(--pop-tint); transform: rotate(9deg) translate(16px,4px); box-shadow: 5px 5px 0 var(--hard); }
  .art-card--main { display: flex; flex-direction: column; justify-content: center; padding: 26px; background: var(--card); transform: rotate(-5deg); box-shadow: 7px 7px 0 var(--hard); }
  .art-spark { color: var(--acc); font-size: 36px; }
  .art-word { margin: 14px 0; font-size: 44px; line-height: .95; letter-spacing: -.07em; font-weight: 800; }
  .art-word b { color: var(--pop); }
  .art-dots { margin-top: 22px; color: var(--acc); letter-spacing: 4px; }
  .art-sticker { position: absolute; right: 4%; bottom: 15%; padding: 11px 15px; border: 1.5px solid var(--hard); border-radius: 12px; background: var(--banana); color: #28251d; font: 800 20px var(--font-mono); line-height: 1; transform: rotate(8deg); box-shadow: 3px 3px 0 var(--hard); }
  .art-sticker small { font-size: 8px; }
  .art-orbit { position: absolute; top: 7%; right: 10%; color: var(--pop); font-size: 36px; }
  .section { padding: 62px 0; border-bottom: 1px dashed var(--rule-2); scroll-margin-top: 100px; }
  .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
  h2 { margin: 8px 0 4px; font-size: clamp(27px,4vw,36px); line-height: 1.15; letter-spacing: -.045em; }
  .section-heading p,.palette-row p { margin: 6px 0 0; color: var(--ink-soft); font-size: 13px; }
  :global(.palette-card) { display: grid; gap: 24px; }
  .palette-row,.appearance-row { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; }
  .palette-row > div:first-child { margin-right: auto; }
  .swatches { display: grid; grid-template-columns: repeat(8,minmax(0,1fr)); gap: 12px; }
  .swatch i { display: block; height: 58px; margin-bottom: 8px; border: 1px solid var(--rule-2); border-radius: 10px; background: var(--swatch); }
  .swatch b,.swatch code { display: block; font-size: 10px; }
  .swatch code { margin-top: 2px; color: var(--ink-faint); font: 9px var(--font-mono); }
  .swatch-paper { --swatch: var(--paper); }.swatch-card { --swatch: var(--card); }.swatch-ink { --swatch: var(--ink); }.swatch-rule { --swatch: var(--rule); }.swatch-acc { --swatch: var(--acc); }.swatch-pop { --swatch: var(--pop); }.swatch-credit { --swatch: var(--credit); }.swatch-pen { --swatch: var(--penpay); }
  .appearance-row { padding-top: 18px; border-top: 1px dashed var(--rule); }.appearance-spacer { flex: 1; }.mode-label { color: var(--ink-soft); font-size: 12px; font-weight: 700; }
  .foundation-grid,.component-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 16px; margin-top: 16px; }
  .type-sample { margin: 18px 0 8px; font-size: 46px; font-weight: 800; letter-spacing: -.06em; }
  .muted { color: var(--ink-soft); font-size: 12px; }.font-sample { margin-top: 18px; padding-top: 14px; border-top: 1px dashed var(--rule); color: var(--ink-soft); font-size: 12px; line-height: 2; }
  .spacing-list { display: grid; gap: 7px; margin-top: 15px; }.spacing-list > div { display: flex; align-items: center; gap: 12px; }.spacing-list code { width: 34px; color: var(--ink-faint); font: 10px var(--font-mono); }.spacing-list i { display: block; height: 6px; border-radius: 999px; background: var(--acc); }
  .shape-row { display: flex; align-items: center; gap: 10px; margin-top: 18px; }.shape { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid var(--rule-2); background: var(--paper-2); color: var(--ink-soft); font: 10px var(--font-mono); }.shape-1 { border-radius: 10px; }.shape-2 { border-radius: 14px; }.shape-3 { border-radius: 20px; }.shape-4 { border-radius: 28px; }.hard-shadow { margin-left: auto; padding: 8px 10px; border: 1.5px solid var(--hard); border-radius: 8px; box-shadow: 3px 3px 0 var(--hard); font: 10px var(--font-mono); }
  .component-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }.component-grid :global(.ui-surface) { min-width: 0; }.mini-label { margin-bottom: 16px; }.demo-row { margin: 12px 0; }.control-stack { display: grid; gap: 14px; }.identity-row { min-height: 56px; }.sample-sticker { padding: 7px 12px; color: var(--pop-ink); font-weight: 800; transform: rotate(4deg); }.empty-demo { display: grid; justify-items: center; gap: 4px; padding: 18px 10px 4px; text-align: center; }.empty-mark { display: grid; width: 40px; height: 40px; place-items: center; border: 1.5px solid var(--hard); border-radius: 12px; background: var(--acc-tint); color: var(--acc-ink); box-shadow: 3px 3px 0 var(--hard); font-size: 22px; }.usage-section pre { overflow-x: auto; padding: 14px; border: 1px solid var(--rule); border-radius: 12px; background: var(--paper-2); color: var(--ink); font: 12px/1.7 var(--font-mono); white-space: pre; }.usage-section .mini-label:not(:first-child) { margin-top: 18px; }
  footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 24px 0 36px; color: var(--ink-faint); font-size: 10px; } footer b { color: var(--ink); } footer b span { margin-left: 8px; color: var(--acc); font: 10px var(--font-mono); }
  @media (max-width:800px) { .hero { grid-template-columns: 1fr .75fr; gap: 10px; }.art-card { width: 210px; height: 260px; }.art-word { font-size: 38px; }.swatches { grid-template-columns: repeat(4,minmax(0,1fr)); } }
  @media (max-width:620px) { .page { width: min(100% - 32px,1120px); }.hero { grid-template-columns: 1fr; padding: 52px 0 42px; }.hero-art { min-height: 300px; margin-top: 12px; }.section { padding: 46px 0; }.section-heading { align-items: start; }.foundation-grid,.component-grid { grid-template-columns: 1fr; }.palette-row { align-items: start; }.palette-row :global(.segmented) { width: 100%; justify-content: center; }.appearance-row { align-items: center; }.appearance-spacer { flex-basis: 100%; }.mode-label { margin-right: auto; }footer { flex-direction: column; gap: 8px; } }
</style>
