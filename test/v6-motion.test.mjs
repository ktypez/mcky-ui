import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V6 entry exposes the motion layer', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  assert.equal(pkg.exports['./v6.css'], './src/styles/v6.css');
  assert.equal(pkg.exports['./v6-base.css'], './src/styles/v6-base.css');
  assert.equal(pkg.exports['./v6-motion.css'], './src/styles/v6-motion.css');
  assert.equal(pkg.exports['./motion'], './src/lib/motion.ts');

  const entry = await read('../src/styles/v6.css');
  assert.match(entry, /fonts\.googleapis\.com/);
  assert.match(entry, /@import '\.\/v6-base\.css'/);
  const base = await read('../src/styles/v6-base.css');
  assert.doesNotMatch(base, /fonts\.googleapis\.com/);
  assert.match(base, /@import '\.\/v6-theme\.css'/);
  assert.match(base, /@import '\.\/v6-motion\.css'/);
});

test('V6 motion tokens cover duration, easing and interaction geometry', async () => {
  const css = await read('../src/styles/v6-motion.css');
  for (const token of [
    '--mcky-v6-ease:',
    '--mcky-v6-dur-fast:',
    '--mcky-v6-dur:',
    '--mcky-v6-dur-ambient:',
    '--mcky-v6-stagger:',
    '--mcky-v6-lift:',
    '--mcky-v6-press:',
    '--mcky-v6-strip-width:',
  ]) {
    assert.ok(css.includes(token), `missing ${token}`);
  }
});

test('V6 motion ships the attendance-derived keyframes', async () => {
  const css = await read('../src/styles/v6-motion.css');
  for (const keyframe of [
    'mcky-v6-float',
    'mcky-v6-spin',
    'mcky-v6-wiggle',
    'mcky-v6-pulse',
    'mcky-v6-twinkle',
    'mcky-v6-shimmer',
    'mcky-v6-bar',
    'mcky-v6-enter-up',
    'mcky-v6-pop-in',
    'mcky-v6-fade-in',
    'mcky-v6-toast-in',
    'mcky-v6-toast-out',
  ]) {
    assert.match(css, new RegExp(`@keyframes ${keyframe}\\b`), `missing @keyframes ${keyframe}`);
  }
});

test('V6 decoration and transition utilities are present', async () => {
  const css = await read('../src/styles/v6-motion.css');
  for (const selector of [
    '.mcky-v6-lift',
    '.mcky-v6-tilt',
    '.mcky-v6-press',
    '.mcky-v6-canvas',
    '.mcky-v6-dotted',
    '.mcky-v6-rule',
    '.mcky-v6-strip',
    '.mcky-v6-dot-live',
    '.mcky-v6-spark',
    '.mcky-v6-orbit',
    '.mcky-v6-loading-bar',
    '.mcky-v6-shimmer',
    '.mcky-v6-stagger',
    '.mcky-v6-toast',
    '.mcky-v6-overlay',
    '.mcky-v6-confetti-piece',
  ]) {
    assert.ok(css.includes(selector), `missing ${selector}`);
  }
});

test('V6 motion is gated behind reduced-motion and names transition properties', async () => {
  const css = await read('../src/styles/v6-motion.css');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(hover: hover\)/);
  // Never animate everything.
  assert.doesNotMatch(css, /transition:\s*all/);
});

test('V6 motion helper is dependency-free and reduced-motion aware', async () => {
  const ts = await read('../src/lib/motion.ts');
  assert.match(ts, /export function burstConfetti/);
  assert.match(ts, /export function prefersReducedMotion/);
  assert.match(ts, /export function withoutTransitions/);
  assert.doesNotMatch(ts, /from ['"]canvas-confetti['"]/);
});
