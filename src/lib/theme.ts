/** MCKY UI V6 — framework-free light/dark mode helper.
 *
 * Import from `@mcky/ui/theme`. The library's CSS only reacts to an explicit
 * `data-v6-mode` on <html>; this helper resolves `auto` from the OS, persists
 * the user's preference and keeps it in sync with system changes. It has no
 * Svelte dependency and is safe to import during SSR.
 */

import { withoutTransitions } from './motion';

export type V6Mode = 'light' | 'dark';
export type V6Preference = V6Mode | 'auto';
export type V6ModeListener = (mode: V6Mode, preference: V6Preference) => void;

export const V6_MODE_STORAGE_KEY = 'mcky-v6-mode';

let currentPreference: V6Preference = 'auto';
let currentMode: V6Mode = 'light';
let mediaQuery: MediaQueryList | null = null;
let systemListener: (() => void) | null = null;
const listeners = new Set<V6ModeListener>();

function hasWindow(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

function hasDocument(): boolean {
  return typeof document !== 'undefined';
}

/** True when the OS currently asks for a dark palette. */
export function systemPrefersDark(): boolean {
  return hasWindow() && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Collapse `auto` into the palette that should actually be painted. */
export function resolveV6Mode(preference: V6Preference = 'auto'): V6Mode {
  return preference === 'auto' ? (systemPrefersDark() ? 'dark' : 'light') : preference;
}

/** Read the persisted preference; unrecognised or blocked storage means `auto`. */
export function readV6Preference(): V6Preference {
  if (!hasWindow()) return currentPreference;
  try {
    const value = window.localStorage.getItem(V6_MODE_STORAGE_KEY);
    return value === 'light' || value === 'dark' || value === 'auto' ? value : 'auto';
  } catch {
    return currentPreference;
  }
}

function notify(): void {
  for (const listener of listeners) listener(currentMode, currentPreference);
}

function stopSystemWatch(): void {
  if (mediaQuery && systemListener && typeof mediaQuery.removeEventListener === 'function') {
    mediaQuery.removeEventListener('change', systemListener);
  }
  mediaQuery = null;
  systemListener = null;
}

function watchSystem(preference: V6Preference): void {
  stopSystemWatch();
  if (preference !== 'auto' || !hasWindow()) return;
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemListener = () => { applyV6Mode('auto'); };
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', systemListener);
  }
}

/**
 * Paint a mode without persisting it — useful at startup with the stored
 * preference, or for a preview button. Returns the resolved mode.
 */
export function applyV6Mode(preference: V6Preference = readV6Preference()): V6Mode {
  const mode = resolveV6Mode(preference);
  const commit = (): void => {
    currentPreference = preference;
    currentMode = mode;
    if (!hasDocument()) return;
    const root = document.documentElement;
    root.dataset.v6Mode = mode;
    root.style.colorScheme = mode;
  };

  const changed = preference !== currentPreference
    || (hasDocument() && document.documentElement.dataset.v6Mode !== mode);
  if (changed) withoutTransitions(commit);
  else commit();

  watchSystem(preference);
  notify();
  return mode;
}

/** Persist a preference and apply it immediately. */
export function setV6Mode(preference: V6Preference): V6Mode {
  if (hasWindow()) {
    try {
      window.localStorage.setItem(V6_MODE_STORAGE_KEY, preference);
    } catch {
      // Private browsing or blocked storage: the in-memory mode still works.
    }
  }
  return applyV6Mode(preference);
}

/** Flip between light and dark, using the currently painted mode as the base. */
export function toggleV6Mode(): V6Mode {
  const painted = hasDocument()
    ? (document.documentElement.dataset.v6Mode as V6Mode | undefined) ?? currentMode
    : currentMode;
  return setV6Mode(painted === 'dark' ? 'light' : 'dark');
}

/** Subscribe to applied mode changes. Returns an unsubscribe function. */
export function onV6ModeChange(listener: V6ModeListener): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
