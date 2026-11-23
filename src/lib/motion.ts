/** MCKY UI V6 — optional motion helpers.
 *
 * Framework-free, dependency-free and SSR-safe. Import from
 * `@mcky/ui/motion` only when the surface needs scripted motion; the CSS in
 * `v6-motion.css` covers everything else.
 */

export const V6_CONFETTI_COLORS = [
  '#FFD21F',
  '#4D83FF',
  '#8B73E8',
  '#F47B20',
  '#E34E4E',
  '#3DD6A3',
] as const;

export interface ConfettiOrigin {
  /** 0–1 fraction of the viewport width. Defaults to 0.5. */
  x?: number;
  /** 0–1 fraction of the viewport height. Defaults to 0.65. */
  y?: number;
}

export interface ConfettiOptions {
  /** Number of pieces. Defaults to 140. */
  count?: number;
  /** Horizontal fan in degrees. Defaults to 80. */
  spread?: number;
  origin?: ConfettiOrigin;
  colors?: readonly string[];
  /** Total fall time in ms; pieces are staggered up to +700ms. Defaults to 900. */
  duration?: number;
}

/** True when the user asked for reduced motion, or when there is no window. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fire a short confetti burst from a viewport point.
 *
 * Returns the layer element (removed automatically) or `null` when there is
 * no document or the user prefers reduced motion — motion is never the only
 * success cue, so callers should still update their own state first.
 */
export function burstConfetti(options: ConfettiOptions = {}): HTMLElement | null {
  if (typeof document === 'undefined' || typeof window === 'undefined') return null;
  if (prefersReducedMotion()) return null;

  const { count = 140, spread = 80, origin = {}, colors = V6_CONFETTI_COLORS, duration = 900 } = options;
  const originX = (origin.x ?? 0.5) * window.innerWidth;
  const originY = (origin.y ?? 0.65) * window.innerHeight;

  const layer = document.createElement('div');
  layer.className = 'mcky-v6-confetti-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  let maxDuration = duration;
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'mcky-v6-confetti-piece';
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.background = colors[index % colors.length];
    layer.appendChild(piece);

    const angle = ((Math.random() - 0.5) * spread * Math.PI) / 180;
    const velocity = 220 + Math.random() * 260;
    const dx = Math.sin(angle) * velocity;
    const dy = -Math.cos(angle) * velocity;
    const gravity = 620;
    const pieceDuration = duration + Math.random() * 700;
    maxDuration = Math.max(maxDuration, pieceDuration);

    piece.animate(
      [
        { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5}px)) rotate(${Math.random() * 360}deg)`,
          opacity: 1,
          offset: 0.45,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + gravity * 0.35}px)) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: pieceDuration, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' },
    );
  }

  window.setTimeout(() => layer.remove(), maxDuration + 200);
  return layer;
}

/**
 * Apply a theme change without smearing every color transition.
 *
 * Sets `data-v6-no-transition` on <html>, forces a style flush, runs the
 * update, then restores transitions on the next frame.
 */
export function withoutTransitions(update: () => void): void {
  if (typeof document === 'undefined') {
    update();
    return;
  }
  const root = document.documentElement;
  root.setAttribute('data-v6-no-transition', '');
  // Force a style flush so the suppress rule is committed before the swap.
  void root.offsetHeight;
  update();
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => root.removeAttribute('data-v6-no-transition')));
}
