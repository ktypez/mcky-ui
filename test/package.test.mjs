import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('package exposes the framework-independent styles and Svelte entry', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  assert.equal(pkg.exports['./tokens.css'], './src/styles/tokens.css');
  assert.equal(pkg.exports['./core.css'], './src/styles/core.css');
  assert.equal(pkg.exports['./svelte'], './src/lib/index.ts');
});

test('all public Svelte components are exported', async () => {
  const entry = await read('../src/lib/index.ts');
  for (const name of ['Badge', 'Button', 'Card', 'Checkbox', 'Input', 'Select', 'Switch', 'Textarea']) {
    assert.match(entry, new RegExp(`as ${name}\\b`), `${name} should be exported`);
  }
});

test('design tokens provide semantic light and dark theme values', async () => {
  const css = await read('../src/styles/tokens.css');
  for (const token of ['--ui-bg:', '--ui-fg:', '--ui-border:', '--ui-radius-md:']) {
    assert.ok(css.includes(token), `missing ${token}`);
  }
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /\[data-theme="light"\]/);
});
