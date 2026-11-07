import { motion } from 'framer-motion';
import { Arch, Divider } from '../components/Ornaments.jsx';
import { EVENT } from '../config.js';
import { useStrings } from '../i18n.js';
import { rise, sequence } from '../lib/hooks.js';

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.35 }, variants: sequence };

/** Scene 7 — back to ivory and champagne for a final blessing. */
export default function Closing() {
  const t = useStrings().closing;
  return (
    <footer className="scene flow closing" aria-label="Closing">
      <motion.div className="closing__inner" {...inView}>
        <Arch className="closing__arch" reveal="view" />
        <motion.p className="closing__ar" lang="ar" dir="rtl" variants={rise} custom={0.4}>
          بَارَكَ اللَّهُ لَكُمَا
        </motion.p>
        <motion.p className="closing__en" variants={rise} custom={1}>
          {t.blessing}
        </motion.p>
        <Divider className="closing__divider" reveal="view" delay={1.2} />
        <motion.p className="closing__names" variants={rise} custom={1.5}>
          {EVENT.bride} <span>&amp;</span> {EVENT.groom}
        </motion.p>
        <motion.p className="closing__hamd" lang="ar" dir="rtl" variants={rise} custom={2}>
          الْحَمْدُ لِلَّهِ
        </motion.p>
        <motion.p className="closing__small" variants={rise} custom={2.3}>
          {t.small}
        </motion.p>
      </motion.div>
    </footer>
  );
}
