import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Arch, Star8 } from '../components/Ornaments.jsx';
import { EVENT } from '../config.js';
import { useStrings } from '../i18n.js';
import { COMPACT, LANDSCAPE, useMediaQuery, useMotionOff } from '../lib/hooks.js';

function Letters({ text, start }) {
  return [...text].map((ch, i) => (
    <span key={i} className="letter" style={{ '--d': `${start + i * 0.08}s` }}>
      {ch}
    </span>
  ));
}

/** Scene 1 — the arch draws itself, the names arrive, then the whole composition dissolves as you scroll. */
export default function Opening() {
  const ref = useRef(null);
  const off = useMotionOff();
  const compact = useMediaQuery(COMPACT);
  const landscape = useMediaQuery(LANDSCAPE);
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Content drifts down while the page moves up, so it lingers and dissolves rather than scrolling away.
  const drift = useTransform(exit, [0, 1], ['0%', compact ? '26%' : '40%']);
  const fade = useTransform(exit, [0, 0.6], [1, 0]);
  const settle = useTransform(exit, [0, 1], [1, 0.94]);
  const archScale = useTransform(exit, [0, 1], [1, compact ? 1.2 : 1.4]);
  const archFade = useTransform(exit, [0.1, 0.75], [1, 0]);
  const cueFade = useTransform(exit, [0, 0.08], [1, 0]);
  const t = useStrings().opening;

  return (
    <section ref={ref} className="scene opening" id="top" aria-label="Opening">
      <motion.div className="opening__stage" style={off ? undefined : { y: drift }}>
        <motion.div style={off ? undefined : { opacity: fade, scale: settle }}>
          <p className="bismillah load" style={{ '--d': '0.2s' }} lang="ar" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </motion.div>

        <div className={landscape ? 'opening__frame opening__frame--wide' : 'opening__frame'}>
          <motion.div className="opening__arch" style={off ? undefined : { scale: archScale, opacity: archFade }}>
            <Arch key={landscape ? 'wide' : 'tall'} shape={landscape ? 'wide' : 'tall'} reveal="load" delay={0.4} />
          </motion.div>

          <motion.div className="opening__content" style={off ? undefined : { opacity: fade, scale: settle }}>
            <p className="kicker load" style={{ '--d': '0.9s' }}>
              {t.kicker}
            </p>
            <h1 className="opening__names" aria-label={t.namesLabel}>
              <span className="opening__name" aria-hidden="true">
                <Letters text={EVENT.brideShort} start={1.05} />
              </span>
              <span className="opening__amp load" style={{ '--d': '1.55s' }} aria-hidden="true">
                &amp;
              </span>
              <span className="opening__name" aria-hidden="true">
                <Letters text={EVENT.groomShort} start={1.7} />
              </span>
            </h1>
            <p className="opening__date load" style={{ '--d': '2.4s' }}>
              <span>{t.weekday}</span>
              <Star8 className="inline-star" />
              <span>{t.date}</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.a href="#invitation" className="scroll-cue" style={off ? undefined : { opacity: cueFade }}>
        <span className="scroll-cue__inner load" style={{ '--d': '3s' }}>
          {t.cue}
          <span className="scroll-cue__line" />
        </span>
      </motion.a>
    </section>
  );
}
