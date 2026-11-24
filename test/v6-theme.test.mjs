import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test('V6 exposes the theme, scenery and mode-toggle entry points', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  assert.equal(pkg.exports['./v6-theme.css'], './src/styles/v6-theme.css');
  assert.equal(pkg.exports['./theme'], './src/lib/theme.ts');
  assert.equal(pkg.exports['./scenery'], './src/lib/components/Scenery.svelte');
  assert.equal(pkg.exports['./mode-toggle'], './src/lib/components/ModeToggle.svelte');

  const entry = await read('../src/styles/v6.css');
  assert.match(entry, /@import '\.\/v6-theme\.css'/);
  assert.match(entry, /\.mcky-v6-scenery-content/);
  assert.match(entry, /--mcky-v6-on-accent:\s*#111111/);
  assert.match(entry, /color: var\(--mcky-v6-on-accent\)/);
});

test('V6 dark mode is explicit and keeps the light theme as the default', async () => {
  const css = await read('../src/styles/v6-theme.css');
  assert.match(css, /:root\[data-v6-mode='dark'\]/);
  assert.match(css, /:root\[data-mode='dark'\]/);
  assert.match(css, /color-scheme: dark/);
  // Never auto-dark by OS alone: existing V6 apps must stay light until opted in.
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark[\s\S]*?--mcky-v6-sky/);

  const motion = await read('../src/styles/v6-motion.css');
  assert.match(motion, /background: var\(--mcky-v6-overlay\)/);
  assert.doesNotMatch(motion, /background:\s*rgba\(157, 210, 247/);
});

test('V6 night palette keeps every text pair at WCAG AA or better', async () => {
  const css = await read('../src/styles/v6-theme.css');
  const night = css.slice(css.indexOf(":root[data-v6-mode='dark']"));
  const value = (name) => {
    const match = night.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`));
    assert.ok(match, `missing dark token --${name}`);
    return match[1];
  };

  const paper = value('mcky-v6-paper');
  const pairs = [
    ['body text on card', value('mcky-v6-ink'), paper],
    ['secondary text on card', value('mcky-v6-muted'), paper],
    ['faint text on card', value('mcky-v6-subtle'), paper],
    ['body text on window shell', value('mcky-v6-ink'), value('mcky-v6-cream')],
    ['primary button label', value('mcky-v6-on-accent'), value('mcky-v6-yellow')],
  ];
  for (const [name, foreground, background] of pairs) {
    const ratio = contrast(foreground, background);
    assert.ok(ratio >= 4.5, `${name}: ${ratio.toFixed(2)}:1 is below 4.5:1`);
  }

  const outline = night.match(/--mcky-v6-outline:\s*2\.5px solid (#[0-9a-f]{6})/)?.[1];
  assert.ok(outline, 'dark outline needs a solid color');
  assert.ok(contrast(outline, paper) >= 3, 'card outline needs 3:1 against the card');
});

test('V6 scenery is the Portal view, kept in sync by a reference snapshot', async () => {
  const shared = await read('../src/lib/components/Scenery.svelte');
  const portal = await read('../references/portal/scenery.snapshot.svelte');

  // Same cloud/star/skyline data, byte for byte, so the two views cannot drift.
  for (const name of ['clouds', 'stars', 'buildings', 'grass']) {
    const pattern = new RegExp(`const ${name} = \\[([^\\]]*)\\]`);
    const fromShared = shared.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim();
    const fromPortal = portal.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim();
    assert.ok(fromShared, `shared scenery is missing ${name}`);
    assert.equal(fromShared, fromPortal, `${name} drifted from the Portal reference`);
  }

  for (const marker of [
    '☁️',
    'class="star mcky-v6-twinkle"',
    'class="cloud mcky-v6-float"',
    'mcky-v6-float--delay',
    'mcky-v6-float--slow',
    'class="moon"',
    'class="night-hill"',
    'tree-left',
    'tree-right',
    'class="tuft"',
    'class:lit={building.lit.includes(cell)}',
    'pointer-events: none',
    '@media (prefers-reduced-motion: reduce)',
    '.star { animation: none; }',
  ]) {
    assert.ok(shared.includes(marker), `missing Portal scenery marker: ${marker}`);
  }

  assert.match(shared, /mode\?: 'day' \| 'night'/);
  assert.match(shared, /onV6ModeChange/);
  // The shared copy uses canonical V6 token names where Portal used its alias.
  assert.doesNotMatch(shared, /var\(--ink\)/);
});

test('V6 theme helper is dependency-free, persistent and system-aware', async () => {
  const ts = await read('../src/lib/theme.ts');
  for (const name of [
    'systemPrefersDark',
    'resolveV6Mode',
    'readV6Preference',
    'applyV6Mode',
    'setV6Mode',
    'toggleV6Mode',
    'onV6ModeChange',
  ]) {
    assert.match(ts, new RegExp(`export function ${name}\\b`), `missing ${name}`);
  }
  assert.match(ts, /V6_MODE_STORAGE_KEY = 'mcky-v6-mode'/);
  assert.match(ts, /root\.dataset\.v6Mode = mode/);
  assert.match(ts, /matchMedia\('\(prefers-color-scheme: dark\)'\)/);
  assert.match(ts, /addEventListener\('change'/);
  assert.match(ts, /withoutTransitions\(commit\)/);
  assert.doesNotMatch(ts, /from ['"]svelte/);
});

test('V6 mode toggle matches the Portal control without an icon dependency', async () => {
  const component = await read('../src/lib/components/ModeToggle.svelte');
  const portal = await read('../references/portal/mode-toggle.snapshot.svelte');
  assert.match(component, /type="button"/);
  assert.match(component, /aria-label=\{night \?/);
  assert.match(component, /aria-pressed=\{night\}/);
  assert.match(component, /onclick=\{toggleV6Mode\}/);
  assert.match(component, /mcky-v6-press/);
  assert.match(component, /<svg aria-hidden="true" width="18" height="18"/);
  assert.doesNotMatch(component, /phosphor|lucide|canvas-confetti/);
  // Same Thai labels and pressed semantics as the Portal button.
  for (const label of ['เปลี่ยนเป็นโหมดกลางคืน', 'เปลี่ยนเป็นโหมดกลางวัน', 'โหมดกลางคืน', 'โหมดกลางวัน']) {
    assert.ok(component.includes(label), `missing Portal label ${label}`);
    assert.ok(portal.includes(label), `Portal reference lost label ${label}`);
  }
});
