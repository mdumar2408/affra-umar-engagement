import { motion, useTransform } from 'framer-motion';
import Countdown from '../components/Countdown.jsx';
import { Rosette, Star8 } from '../components/Ornaments.jsx';
import { EVENT } from '../config.js';
import { useStrings } from '../i18n.js';
import { useExit, useMotionOff, useReveal, useSceneProgress } from '../lib/hooks.js';

/** Scene 4 — the date, ceremony and venue unfold, with the countdown woven into the composition. */
export default function Celebration({ sectionRef }) {
  const off = useMotionOff();
  const { enter, p, exit } = useSceneProgress(sectionRef);
  const t = useStrings().celebrate;

  const leave = useExit(exit);
  const eyebrow = useReveal(enter, [0.55, 1], { y: 16 });
  const weekday = useReveal(p, [0, 0.08], { y: 12 });
  const day = useReveal(p, [0.04, 0.2], { y: 30, scale: 0.9 });
  const month = useReveal(p, [0.14, 0.26], { y: 14 });
  const rule = useTransform(p, [0.22, 0.36], [0, 1]);
  const ceremony = useReveal(p, [0.3, 0.42], { y: 16 });
  const venue = useReveal(p, [0.38, 0.5], { y: 16 });
  const rosettes = useTransform(enter, [0.3, 1], [0, 1]);
  const spinA = useTransform(p, [0, 1], [-30, 30]);
  const spinB = useTransform(p, [0, 1], [20, -40]);

  return (
    <section ref={sectionRef} id="celebration" className="scene pinned celebrate" aria-label="The celebration">
      <div className="stage">
        <motion.div className="celebrate__content" style={leave}>
          <motion.p className="eyebrow" style={eyebrow}>
            {t.eyebrow}
          </motion.p>

          <div className="date">
            <motion.div className="date__rosette date__rosette--a" style={off ? undefined : { opacity: rosettes, rotate: spinA }}>
              <Rosette />
            </motion.div>
            <motion.div className="date__rosette date__rosette--b" style={off ? undefined : { opacity: rosettes, rotate: spinB }}>
              <Rosette />
            </motion.div>
            <motion.p className="date__weekday" style={weekday}>
              {t.weekdayTime}
            </motion.p>
            <motion.p className="date__day" style={day}>
              09
            </motion.p>
            <motion.p className="date__month" style={month}>
              <span>{t.month}</span>
              <Star8 className="inline-star" />
              <span>2026</span>
            </motion.p>
          </div>

          <motion.span className="rule" style={off ? undefined : { scaleX: rule }} aria-hidden="true" />

          <motion.h2 className="ceremony" style={ceremony}>
            {t.ceremony}
          </motion.h2>
          <motion.p className="venue-line" style={venue}>
            {EVENT.venue}
            <span>{t.city}</span>
          </motion.p>

          <Countdown p={p} iso={EVENT.dateISO} endIso={EVENT.dayEndISO} />
        </motion.div>
      </div>
    </section>
  );
}
