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
  assert.equal(pkg.exports['./v6-scenery.css'], './src/styles/v6-scenery.css');
  assert.equal(pkg.exports['./theme'], './src/lib/theme.ts');
  assert.equal(pkg.exports['./mode-toggle'], './src/lib/components/ModeToggle.svelte');

  const entry = await read('../src/styles/v6.css');
  assert.match(entry, /@import '\.\/v6-theme\.css'/);
  assert.match(entry, /@import '\.\/v6-scenery\.css'/);
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

test('V6 scenery paints an animated day meadow and a night city', async () => {
  const css = await read('../src/styles/v6-scenery.css');
  for (const selector of ['.mcky-v6-scenery', '.mcky-v6-scenery-content', '.mcky-v6-scenery::before', '.mcky-v6-scenery::after']) {
    assert.ok(css.includes(selector), `missing ${selector}`);
  }
  for (const keyframe of ['mcky-v6-scenery-drift', 'mcky-v6-scenery-drift-night', 'mcky-v6-scenery-twinkle']) {
    assert.match(css, new RegExp(`@keyframes ${keyframe}\\b`), `missing @keyframes ${keyframe}`);
  }
  assert.match(css, /:is\(:root\[data-v6-mode='dark'\], :root\[data-mode='dark'\]\) \.mcky-v6-scenery/);
  assert.match(css, /\.mcky-v6-scenery\[data-v6-mode='dark'\]/);
  assert.match(css, /clip-path: polygon\(/);
  assert.match(css, /var\(--mcky-v6-scenery-window\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none !important/);
  assert.match(css, /pointer-events: none/);
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

test('V6 mode toggle is an accessible, icon-library-free control', async () => {
  const component = await read('../src/lib/components/ModeToggle.svelte');
  assert.match(component, /type="button"/);
  assert.match(component, /aria-label=\{mode === 'dark'/);
  assert.match(component, /aria-pressed=\{mode === 'dark'\}/);
  assert.match(component, /onclick=\{toggleV6Mode\}/);
  assert.match(component, /mcky-v6-press/);
  assert.doesNotMatch(component, /phosphor|lucide|canvas-confetti/);
});
