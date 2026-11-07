import { motion } from 'framer-motion';

const DRAW_EASE = [0.65, 0, 0.35, 1];

// Ogee arches: outer line, inner line and a dotted line.
const ARCHES = {
  // Tall 400 × 600 — portrait screens and the couple scene.
  tall: {
    viewBox: '0 0 400 600',
    apex: 200,
    outer: 'M30 600V300C30 190 100 120 170 80C186 70 196 54 200 30C204 54 214 70 230 80C300 120 370 190 370 300V600',
    inner: 'M54 600V306C54 206 116 142 180 104C191 97 197 87 200 72C203 87 209 97 220 104C284 142 346 206 346 306V600',
    dots: 'M78 600V312C78 222 132 166 200 118C268 166 322 222 322 312V600',
  },
  // Broad 600 × 560 — landscape screens, leaving room for the names.
  wide: {
    viewBox: '0 0 600 560',
    apex: 300,
    outer: 'M30 560V260C30 160 150 102 270 72C288 66 296 54 300 34C304 54 312 66 330 72C450 102 570 160 570 260V560',
    inner: 'M54 560V266C54 178 166 124 280 96C291 92 297 84 300 70C303 84 309 92 320 96C434 124 546 178 546 266V560',
    dots: 'M78 560V272C78 194 180 148 300 110C420 148 522 194 522 272V560',
  },
};

/**
 * One stroke that can be drawn three ways:
 *  draw   – a MotionValue (0→1) mapped to pathLength (scroll-driven)
 *  reveal – 'load' draws once on mount, 'view' draws once when scrolled into view
 */
function Stroke({ d, draw, reveal, delay = 0, duration = 2.4, width = 1.2, opacity = 1, dash }) {
  const base = { d, fill: 'none', stroke: 'currentColor', strokeWidth: width, strokeOpacity: opacity };
  if (dash) {
    const fade = draw
      ? { style: { opacity: draw } }
      : reveal === 'load'
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.4, delay: delay + duration * 0.6 } }
        : reveal === 'view'
          ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 1.4, delay: delay + duration * 0.6 } }
          : {};
    return <motion.path {...base} strokeDasharray={dash} {...fade} />;
  }
  if (draw) return <motion.path {...base} style={{ pathLength: draw }} />;
  const anim = { initial: { pathLength: 0 }, transition: { duration, delay, ease: DRAW_EASE } };
  if (reveal === 'load') return <motion.path {...base} {...anim} animate={{ pathLength: 1 }} />;
  if (reveal === 'view') return <motion.path {...base} {...anim} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }} />;
  return <path {...base} />;
}

export function Arch({ className, draw, drawInner, reveal, delay = 0, shape = 'tall' }) {
  const ARCH = ARCHES[shape];
  return (
    <svg className={className} viewBox={ARCH.viewBox} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <Stroke d={ARCH.outer} draw={draw} reveal={reveal} delay={delay} width={1.3} />
      <Stroke d={ARCH.inner} draw={drawInner ?? draw} reveal={reveal} delay={delay + 0.35} width={0.9} opacity={0.75} />
      <Stroke d={ARCH.dots} draw={drawInner ?? draw} reveal={reveal} delay={delay} width={1.4} opacity={0.5} dash="0.1 7" />
      <g transform={`translate(${ARCH.apex} 14)`}>
        <Stroke d="M-7 -7H7V7H-7Z" draw={drawInner ?? draw} reveal={reveal} delay={delay + 1.4} duration={1} width={0.9} />
        <Stroke d="M0 -9.9L9.9 0L0 9.9L-9.9 0Z" draw={drawInner ?? draw} reveal={reveal} delay={delay + 1.5} duration={1} width={0.9} />
      </g>
    </svg>
  );
}

/** Khatam — the eight-pointed star of two interlaced squares. */
export function Star8({ className, strokeWidth = 1.1 }) {
  return (
    <svg className={className} viewBox="-12 -12 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <rect x="-7.5" y="-7.5" width="15" height="15" />
      <rect x="-7.5" y="-7.5" width="15" height="15" transform="rotate(45)" />
      <circle r="2.6" />
    </svg>
  );
}

/** A larger geometric rosette used as a slowly turning background ornament. */
export function Rosette({ className }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.6">
      <circle r="97" />
      <circle r="90" strokeDasharray="0.6 4.4" strokeWidth="1.2" strokeLinecap="round" />
      {[0, 22.5].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <rect x="-56" y="-56" width="112" height="112" />
          <rect x="-56" y="-56" width="112" height="112" transform="rotate(45)" />
        </g>
      ))}
      <circle r="44" />
      <g transform="scale(2.6)">
        <rect x="-7.5" y="-7.5" width="15" height="15" />
        <rect x="-7.5" y="-7.5" width="15" height="15" transform="rotate(45)" />
      </g>
      <circle r="6" />
    </svg>
  );
}

/** Horizontal ornamental divider; the two rules grow outward from a central star. */
export function Divider({ className, draw, reveal, delay = 0 }) {
  const star = draw
    ? { style: { opacity: draw } }
    : reveal === 'view'
      ? { initial: { opacity: 0, scale: 0.6 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.9, delay } }
      : {};
  return (
    <svg className={className} viewBox="0 0 240 24" aria-hidden="true">
      <Stroke d="M104 12H4" draw={draw} reveal={reveal} delay={delay + 0.2} duration={1.4} width={0.9} />
      <Stroke d="M136 12H236" draw={draw} reveal={reveal} delay={delay + 0.2} duration={1.4} width={0.9} />
      <motion.g {...star} style={{ ...star.style, transformOrigin: '120px 12px' }}>
        <g transform="translate(120 12)" fill="none" stroke="currentColor" strokeWidth="0.9">
          <rect x="-6" y="-6" width="12" height="12" />
          <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" />
          <circle r="2" />
        </g>
      </motion.g>
    </svg>
  );
}
