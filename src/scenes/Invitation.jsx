import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Rosette, Star8 } from '../components/Ornaments.jsx';
import { useStrings } from '../i18n.js';
import { COMPACT, useExit, useMediaQuery, useMotionOff, useReveal, useSceneProgress } from '../lib/hooks.js';

// Each line starts revealing a little after the one before it.
const lineStart = (i) => 0.06 + i * 0.085;

function Line({ p, at, kind, children }) {
  const style = useReveal(p, [at, at + 0.1], { y: 18 });
  return (
    <motion.p className={kind ? `invite-line invite-line--${kind}` : 'invite-line'} style={style}>
      {children}
    </motion.p>
  );
}

/** Scene 2 — a pinned card whose borders draw in as it arrives, then its words appear line by line. */
export default function Invitation() {
  const ref = useRef(null);
  const off = useMotionOff();
  const compact = useMediaQuery(COMPACT);
  const { enter, p, exit } = useSceneProgress(ref);
  const t = useStrings().invite;

  const card = useReveal(enter, [0.35, 1], { y: 40, scale: 0.96 });
  const leave = useExit(exit);
  const edgeX = useTransform(enter, [0.45, 1], [0, 1]);
  const edgeY = useTransform(enter, [0.6, 1], [0, 1]);
  const inner = useTransform(p, [0, 0.08], [0, 1]);
  const eyebrow = useReveal(p, [0, 0.08], { y: 10 });
  const note = useReveal(p, [0.64, 0.76], { y: 14 });
  const cue = useReveal(p, [0.74, 0.84], { y: -10 });

  const floatA = useTransform(p, [0, 1], compact ? [16, -16] : [90, -90]);
  const floatB = useTransform(p, [0, 1], compact ? [-12, 12] : [-70, 70]);
  const spin = useTransform(p, [0, 1], [0, 40]);

  return (
    <section ref={ref} id="invitation" className="scene pinned invite" aria-label="The invitation">
      <div className="stage">
        <motion.div className="float float--a" style={off ? undefined : { y: floatA, rotate: spin }}>
          <Rosette />
        </motion.div>
        <motion.div className="float float--b" style={off ? undefined : { y: floatB, rotate: spin }}>
          <Rosette />
        </motion.div>

        <motion.div className="invite__wrap" style={leave}>
          <motion.article className="invite-card" style={card}>
            <motion.span className="edge edge--t" style={off ? undefined : { scaleX: edgeX }} />
            <motion.span className="edge edge--b" style={off ? undefined : { scaleX: edgeX }} />
            <motion.span className="edge edge--l" style={off ? undefined : { scaleY: edgeY }} />
            <motion.span className="edge edge--r" style={off ? undefined : { scaleY: edgeY }} />
            <motion.span className="invite-card__inner" style={off ? undefined : { opacity: inner }} />
            {['tl', 'tr', 'bl', 'br'].map((c) => (
              <motion.span key={c} className={`corner corner--${c}`} style={off ? undefined : { opacity: inner }}>
                <Star8 />
              </motion.span>
            ))}

            <div className="invite-card__body">
              <motion.p className="invite-ar" style={eyebrow} lang="ar" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>
              {t.lines.map((l, i) => (
                <Line key={i} p={p} at={lineStart(i)} kind={l.kind}>
                  {l.text}
                </Line>
              ))}
              <motion.p className="invite-note" style={note}>
                {t.note}
              </motion.p>
              <motion.span className="invite-cue" style={cue} aria-hidden="true">
                <span />
              </motion.span>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
