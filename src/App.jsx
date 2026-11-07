import { useRef } from 'react';
import { MotionConfig, motion, useScroll } from 'framer-motion';
import Backdrop from './components/Backdrop.jsx';
import LangToggle from './components/LangToggle.jsx';
import { LangContext, useLangState } from './i18n.js';
import { MotionOffContext, useMotionOffValue } from './lib/hooks.js';
import Opening from './scenes/Opening.jsx';
import Invitation from './scenes/Invitation.jsx';
import Couple from './scenes/Couple.jsx';
import Celebration from './scenes/Celebration.jsx';
import Blessings from './scenes/Blessings.jsx';
import Venue from './scenes/Venue.jsx';
import Closing from './scenes/Closing.jsx';

function ProgressThread() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="thread" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export default function App() {
  const motionOff = useMotionOffValue();
  const [lang, setLang] = useLangState();
  const refs = { celebration: useRef(null), blessings: useRef(null), venue: useRef(null) };

  return (
    <MotionConfig reducedMotion="user">
      <MotionOffContext.Provider value={motionOff}>
        <LangContext.Provider value={lang}>
          <Backdrop refs={refs} />
          <ProgressThread />
          <LangToggle lang={lang} onChange={setLang} />
          <main className="journey">
            <Opening />
            <Invitation />
            <Couple />
            <Celebration sectionRef={refs.celebration} />
            <Blessings sectionRef={refs.blessings} />
            <Venue sectionRef={refs.venue} />
            <Closing />
          </main>
        </LangContext.Provider>
      </MotionOffContext.Provider>
    </MotionConfig>
  );
}
