import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('package exposes the framework-independent styles and Svelte entry', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  assert.equal(pkg.exports['./tokens.css'], './src/styles/tokens.css');
  assert.equal(pkg.exports['./v5-tokens.css'], './src/styles/v5-tokens.css');
  assert.equal(pkg.exports['./core.css'], './src/styles/core.css');
  assert.equal(pkg.exports['./svelte'], './src/lib/index.ts');
});

test('all public Svelte components are exported', async () => {
  const entry = await read('../src/lib/index.ts');
  for (const name of ['Badge', 'Button', 'Card', 'Checkbox', 'Chip', 'CountSticker', 'EmptyState', 'Field', 'Input', 'Kbd', 'Monogram', 'Select', 'Segmented', 'Squiggle', 'Switch', 'Textarea', 'TopBar']) {
    assert.match(entry, new RegExp(`as ${name}\\b`), `${name} should be exported`);
  }
});

test('design tokens provide semantic light and dark theme values', async () => {
  const css = await read('../src/styles/tokens.css') + await read('../src/styles/v5-tokens.css');
  for (const token of ['--ui-bg:', '--ui-fg:', '--ui-border:', '--ui-radius-md:']) {
    assert.ok(css.includes(token), `missing ${token}`);
  }
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /data-palette=\"matcha\"/);
  assert.match(css, /data-density=\"compact\"/);
  for (const palette of ['matcha', 'coral', 'blueberry', 'butter']) assert.ok(css.includes(`data-palette=\"${palette}\"`), `missing ${palette} palette`);
});


test('V5 tokens cover static-site motion and reading-measure contracts', async () => {
  const css = await read('../src/styles/v5-tokens.css');
  for (const token of ['--ease:', '--measure:', '--motion-fast:', '--motion-normal:', '--motion-slow:']) {
    assert.ok(css.includes(token), `missing ${token}`);
  }
});
