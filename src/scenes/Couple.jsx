import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Arch, Divider } from '../components/Ornaments.jsx';
import { EVENT } from '../config.js';
import { useStrings } from '../i18n.js';
import { LANDSCAPE, useExit, useMediaQuery, useMotionOff, useReveal, useSceneProgress } from '../lib/hooks.js';

/** A line of type that slides up out of a mask. */
function MaskLine({ p, range, children }) {
  const off = useMotionOff();
  const y = useTransform(p, range, ['110%', '0%']);
  const opacity = useTransform(p, range, [0, 1]);
  return (
    <span className="name-mask">
      <motion.span className="name-line" style={off ? undefined : { y, opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Scene 3 — the names as the centrepiece, framed by a large arch that draws with scroll. */
export default function Couple() {
  const ref = useRef(null);
  const off = useMotionOff();
  const wide = useMediaQuery(LANDSCAPE);
  const { enter, p, exit } = useSceneProgress(ref);
  const t = useStrings().couple;

  const archOuter = useTransform([enter, p], ([e, v]) => Math.min(1, e * 0.35 + v * 1.3));
  const archInner = useTransform(p, [0.1, 0.55], [0, 1]);
  const archLift = useTransform(exit, [0, 1], [0, -60]);
  const leave = useExit(exit, { fade: [0.35, 1] });
  const eyebrow = useReveal(enter, [0.6, 1], { y: 12 });
  const divider = useTransform(p, [0.3, 0.46], [0, 1]);
  const amp = useReveal(p, [0.33, 0.45], { y: 10, scale: 0.8 });
  const note = useReveal(p, [0.62, 0.76], { y: 14 });

  return (
    <section ref={ref} id="couple" className={wide ? 'scene pinned couple couple--wide' : 'scene pinned couple'} aria-label="The couple">
      <div className="stage">
        <motion.div className="couple__arch" style={off ? undefined : { y: archLift }}>
          <Arch
            shape={wide ? 'wide' : 'tall'}
            draw={off ? undefined : archOuter}
            drawInner={off ? undefined : archInner}
          />
        </motion.div>

        <motion.div className="couple__content" style={leave}>
          <motion.p className="eyebrow" style={eyebrow}>
            {t.eyebrow}
          </motion.p>
          <h2 className="couple__names">
            <MaskLine p={p} range={[0.1, 0.3]}>
              {EVENT.bride}
            </MaskLine>
            <span className="couple__join" aria-label={t.and}>
              <Divider className="couple__divider" draw={off ? undefined : divider} />
              <motion.span className="couple__amp" style={amp} aria-hidden="true">
                &amp;
              </motion.span>
            </span>
            <MaskLine p={p} range={[0.42, 0.62]}>
              {EVENT.groom}
            </MaskLine>
          </h2>
          <motion.p className="couple__note" style={note}>
            {t.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
