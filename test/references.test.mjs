import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const exists = (path) => access(new URL(path, import.meta.url)).then(() => true, () => false);

const REQUIRED_SECTIONS = ['## Stack', '## V6 entry', '## Token overrides', '## Theme', '## Scenery', '## Apply checklist', '## Verification'];

test('the reference manifest points at a note for every consumer app', async () => {
  const manifest = JSON.parse(await read('../references/manifest.json'));
  const ids = new Set();
  for (const project of manifest.projects) {
    assert.ok(project.id, 'project needs an id');
    assert.ok(project.name, `${project.id} needs a name`);
    assert.ok(project.note, `${project.id} needs a note path`);
    assert.ok(!ids.has(project.id), `duplicate project id ${project.id}`);
    ids.add(project.id);

    assert.ok(await exists(`../references/${project.note}`), `${project.id}: missing ${project.note}`);
    const note = await read(`../references/${project.note}`);
    for (const section of REQUIRED_SECTIONS) {
      assert.ok(note.includes(section), `${project.id}: missing ${section}`);
    }
    for (const snapshot of project.snapshots ?? []) {
      assert.ok(await exists(`../references/${snapshot}`), `${project.id}: missing snapshot ${snapshot}`);
    }
  }
  for (const id of ['portal', 'truck', 'data', 'dashboard', 'work-shell', 'mem-web', 'vaultctl-web']) {
    assert.ok(ids.has(id), `manifest is missing ${id}`);
  }
});

test('the Portal reference keeps the snapshots the shared components were ported from', async () => {
  for (const file of [
    'portal/scenery.snapshot.svelte',
    'portal/mode-toggle.snapshot.svelte',
    'portal/v6-tokens.snapshot.css',
  ]) {
    assert.ok(await exists(`../references/${file}`), `missing ${file}`);
  }
});
