import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Rosette, Star8 } from '../components/Ornaments.jsx';
import { COMPACT, useExit, useMediaQuery, useMotionOff, useReveal, useSceneProgress } from '../lib/hooks.js';

const LINES = [
  { text: 'In the name of Allah, the Most Gracious, the Most Merciful,', at: 0.08, kind: 'lead' },
  { text: 'and with the blessings of our families,', at: 0.17 },
  { text: 'we warmly invite you and your loved ones', at: 0.26 },
  { text: 'to join us as we celebrate', at: 0.35 },
  { text: 'the engagement of', at: 0.46, kind: 'key' },
];

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

  const card = useReveal(enter, [0.35, 1], { y: 40, scale: 0.96 });
  const leave = useExit(exit);
  const edgeX = useTransform(enter, [0.45, 1], [0, 1]);
  const edgeY = useTransform(enter, [0.6, 1], [0, 1]);
  const inner = useTransform(p, [0, 0.08], [0, 1]);
  const eyebrow = useReveal(p, [0, 0.08], { y: 10 });
  const note = useReveal(p, [0.58, 0.7], { y: 14 });
  const cue = useReveal(p, [0.68, 0.8], { y: -10 });

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
              <motion.p className="eyebrow" style={eyebrow}>
                Bismillāh · With gratitude
              </motion.p>
              {LINES.map((l) => (
                <Line key={l.text} p={p} at={l.at} kind={l.kind}>
                  {l.text}
                </Line>
              ))}
              <motion.p className="invite-note" style={note}>
                Your presence and duas would mean the world to us.
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
