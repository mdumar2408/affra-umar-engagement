import { createContext, useContext, useSyncExternalStore } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';

export const EASE = [0.2, 0.7, 0.2, 1];
export const COMPACT = '(max-width: 700px)';
export const LANDSCAPE = '(min-aspect-ratio: 1/1)';
// Phones in landscape are too short to pin a full scene, so scenes fall back to normal flow.
export const SHORT_LANDSCAPE = '(max-height: 540px) and (orientation: landscape)';

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// When true, scroll-mapped styles are dropped and every scene renders in its finished state.
export const MotionOffContext = createContext(false);
export const useMotionOff = () => useContext(MotionOffContext);

export function useMotionOffValue() {
  const reduce = useReducedMotion();
  const short = useMediaQuery(SHORT_LANDSCAPE);
  return Boolean(reduce) || short;
}

/**
 * Progress values for a pinned scene (a tall section with a sticky 100svh stage):
 *  enter – 0→1 while the scene rises into view
 *  p     – 0→1 while the stage is pinned
 *  exit  – 0→1 while the stage scrolls away
 */
export function useSceneProgress(ref) {
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ['end end', 'end start'] });
  return { enter, p, exit };
}

/** Fade + rise mapped onto a slice of a progress value. */
export function useReveal(value, range, { y = 24, scale = 1 } = {}) {
  const off = useMotionOff();
  const opacity = useTransform(value, range, [0, 1]);
  const ty = useTransform(value, range, [y, 0]);
  const s = useTransform(value, range, [scale, 1]);
  if (off) return undefined;
  return scale === 1 ? { opacity, y: ty } : { opacity, y: ty, scale: s };
}

/** Soft dissolve applied to a scene's content while its stage scrolls away. */
export function useExit(exit, { fade = [0.3, 1], scale = 0.96 } = {}) {
  const off = useMotionOff();
  const opacity = useTransform(exit, fade, [1, 0]);
  const s = useTransform(exit, [0, 1], [1, scale]);
  return off ? undefined : { opacity, scale: s };
}

// Variants for in-view (IntersectionObserver-driven) reveals in the flowing scenes.
export const sequence = { hidden: {}, show: {} };
export const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE, delay } }),
};
