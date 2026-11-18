import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('every V5 primitive has a direct Svelte subpath export', async () => {
  const pkg = JSON.parse(await read('../package.json'));
  const components = ['badge','button','card','checkbox','chip','empty-state','field','count-sticker','input','kbd','monogram','select','segmented','squiggle','switch','textarea','top-bar'];
  for (const name of components) {
    assert.ok(pkg.exports[`./${name}`], `missing export for ${name}`);
  }
  assert.equal(pkg.exports['./svelte'], './src/lib/index.ts');
});
