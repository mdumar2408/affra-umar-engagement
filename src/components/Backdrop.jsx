import { motion, useScroll, useTransform } from 'framer-motion';
import { COMPACT, useMediaQuery, useMotionOff } from '../lib/hooks.js';

/**
 * Fixed layers behind the whole journey. Background tones cross-fade (opacity only) as scenes pass,
 * and the geometric pattern turns slowly with overall scroll, evolving from an eight-point khatam
 * lattice into interlaced circles during the blessings.
 */
export default function Backdrop({ refs }) {
  const off = useMotionOff();
  const compact = useMediaQuery(COMPACT);
  const { scrollYProgress: whole } = useScroll();
  const { scrollYProgress: celebration } = useScroll({ target: refs.celebration, offset: ['start end', 'end start'] });
  const { scrollYProgress: blessings } = useScroll({ target: refs.blessings, offset: ['start end', 'end start'] });
  const { scrollYProgress: venue } = useScroll({ target: refs.venue, offset: ['start end', 'end start'] });

  const champagneMid = useTransform(celebration, [0, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const champagneEnd = useTransform(venue, [0.45, 1], [0, 1]);
  const champagne = useTransform([champagneMid, champagneEnd], ([a, b]) => Math.max(a, b));
  const sage = useTransform(blessings, [0, 0.16, 0.5, 0.62], [0, 1, 1, 0]);
  const lavender = useTransform(blessings, [0.42, 0.58, 0.88, 1], [0, 1, 1, 0]);

  const circles = useTransform([sage, lavender], ([a, b]) => Math.max(a, b));
  const khatam = useTransform(circles, (v) => 1 - v);
  const rotate = useTransform(whole, [0, 1], [0, off || compact ? 0 : 24]);
  const scale = useTransform(whole, [0, 0.5, 1], [1, off || compact ? 1 : 1.08, 1]);
  const y = useTransform(whole, [0, 1], [0, off || !compact ? 0 : -90]);

  return (
    <div className="backdrop" aria-hidden="true">
      <motion.div className="backdrop__tone tone-champagne" style={{ opacity: champagne }} />
      <motion.div className="backdrop__tone tone-sage" style={{ opacity: sage }} />
      <motion.div className="backdrop__tone tone-lavender" style={{ opacity: lavender }} />
      <div className="backdrop__glow" />
      <motion.div className="backdrop__pattern" style={{ rotate, scale, y }}>
        <motion.svg className="pattern pattern--khatam" style={{ opacity: khatam }}>
          <defs>
            <pattern id="pat-khatam" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="0.7">
                <rect x="23" y="23" width="34" height="34" />
                <rect x="23" y="23" width="34" height="34" transform="rotate(45 40 40)" />
                <path d="M40 16V0M40 64V80M16 40H0M64 40H80M23 23L0 0M57 23L80 0M23 57L0 80M57 57L80 80" />
                <circle cx="40" cy="40" r="6" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-khatam)" />
        </motion.svg>
        <motion.svg className="pattern pattern--circles" style={{ opacity: circles }}>
          <defs>
            <pattern id="pat-circles" width="60" height="104" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="0.7">
                {[[0, 0], [60, 0], [30, 52], [-30, 52], [90, 52], [0, 104], [60, 104]].map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="34.64" />
                ))}
                <circle cx="30" cy="52" r="4" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-circles)" />
        </motion.svg>
      </motion.div>
      <div className="backdrop__vignette" />
    </div>
  );
}
