import { motion } from 'framer-motion';
import { Divider, Rosette, Star8 } from '../components/Ornaments.jsx';
import { rise, sequence } from '../lib/hooks.js';

import { useStrings } from '../i18n.js';

// The Arabic is shown as-is in every language; the label, translation and source come from i18n.js.
const ARABIC = [
  {
    text: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  },
  {
    text: 'بَارَكَ اللَّهُ لَكُمَا، وَبَارَكَ عَلَيْكُمَا، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    large: true,
  },
];

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 }, variants: sequence };

/** Scene 5 — a calm passage: Arabic first, then the translation, then the reference. */
export default function Blessings({ sectionRef }) {
  const t = useStrings().blessings;
  return (
    <section ref={sectionRef} id="blessings" className="scene flow blessings" aria-label="Blessings">
      <motion.header className="blessings__intro" {...inView}>
        <Rosette className="spin-on-scroll blessings__rosette" />
        <motion.p className="eyebrow" variants={rise} custom={0}>
          {t.eyebrow}
        </motion.p>
        <motion.h2 className="section-title" variants={rise} custom={0.2}>
          {t.title} <em>{t.titleEm}</em>
        </motion.h2>
        <motion.p className="section-lede" variants={rise} custom={0.4}>
          {t.lede}
        </motion.p>
      </motion.header>

      {t.duas.map((d, i) => (
        <motion.article key={i} className="dua" {...inView}>
          {i > 0 && <Divider className="dua__divider" reveal="view" />}
          <motion.p className="dua__label" variants={rise} custom={0}>
            {d.label}
          </motion.p>
          <motion.p
            className={ARABIC[i].large ? 'dua__ar dua__ar--large' : 'dua__ar'}
            lang="ar"
            dir="rtl"
            variants={rise}
            custom={0.15}
          >
            {ARABIC[i].text}
          </motion.p>
          <motion.p className="dua__en" variants={rise} custom={0.95}>
            {d.text}
          </motion.p>
          <motion.p className="dua__source" variants={rise} custom={1.6}>
            {d.source}
          </motion.p>
        </motion.article>
      ))}

      <motion.div className="blessings__coda" {...inView}>
        <motion.span className="coda-star" variants={rise} custom={0}>
          <Star8 />
        </motion.span>
        <motion.p className="coda__ar" lang="ar" dir="rtl" variants={rise} custom={0.15}>
          اللَّهُمَّ بَارِكْ لَنَا وَبَارِكْ عَلَيْنَا وَاجْمَعْ بَيْنَنَا فِي خَيْرٍ
        </motion.p>
        <motion.p className="coda__en" variants={rise} custom={0.9}>
          {t.coda}
        </motion.p>
      </motion.div>
    </section>
  );
}
