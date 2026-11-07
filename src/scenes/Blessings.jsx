import { motion } from 'framer-motion';
import { Divider, Rosette, Star8 } from '../components/Ornaments.jsx';
import { rise, sequence } from '../lib/hooks.js';

const DUAS = [
  {
    label: 'A Qur’anic reminder',
    ar: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    en: '“And among His signs is that He created for you spouses from among yourselves so that you may find tranquillity in them; and He placed between you affection and mercy. Surely in this are signs for people who reflect.”',
    source: 'Sūrah ar-Rūm · 30:21',
  },
  {
    label: 'A Prophetic blessing',
    ar: 'بَارَكَ اللَّهُ لَكُمَا، وَبَارَكَ عَلَيْكُمَا، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    en: '“May Allah bless you both, shower His blessings upon you, and bring you together in goodness.”',
    source: 'Sunan Abī Dāwūd 2130 · Jāmiʿ at-Tirmidhī 1091',
    large: true,
  },
];

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 }, variants: sequence };

/** Scene 5 — a calm passage: Arabic first, then the translation, then the reference. */
export default function Blessings({ sectionRef }) {
  return (
    <section ref={sectionRef} id="blessings" className="scene flow blessings" aria-label="Blessings">
      <motion.header className="blessings__intro" {...inView}>
        <Rosette className="spin-on-scroll blessings__rosette" />
        <motion.p className="eyebrow" variants={rise} custom={0}>
          Prayers &amp; blessings
        </motion.p>
        <motion.h2 className="section-title" variants={rise} custom={0.2}>
          Keep us in <em>your duas.</em>
        </motion.h2>
        <motion.p className="section-lede" variants={rise} custom={0.4}>
          As we begin this new chapter, we ask Allah to place love, mercy and tranquillity between us.
        </motion.p>
      </motion.header>

      {DUAS.map((d, i) => (
        <motion.article key={d.source} className="dua" {...inView}>
          {i > 0 && <Divider className="dua__divider" reveal="view" />}
          <motion.p className="dua__label" variants={rise} custom={0}>
            {d.label}
          </motion.p>
          <motion.p className={d.large ? 'dua__ar dua__ar--large' : 'dua__ar'} lang="ar" dir="rtl" variants={rise} custom={0.15}>
            {d.ar}
          </motion.p>
          <motion.p className="dua__en" variants={rise} custom={0.95}>
            {d.en}
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
          O Allah, place barakah in our journey and unite us upon goodness.
        </motion.p>
      </motion.div>
    </section>
  );
}
