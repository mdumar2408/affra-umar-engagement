import { useRef } from 'react';
import { MotionConfig, motion, useScroll } from 'framer-motion';
import Backdrop from './components/Backdrop.jsx';
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
  const refs = { celebration: useRef(null), blessings: useRef(null), venue: useRef(null) };

  return (
    <MotionConfig reducedMotion="user">
      <MotionOffContext.Provider value={motionOff}>
        <Backdrop refs={refs} />
        <ProgressThread />
        <main className="journey">
          <Opening />
          <Invitation />
          <Couple />
          <Celebration sectionRef={refs.celebration} />
          <Blessings sectionRef={refs.blessings} />
          <Venue sectionRef={refs.venue} />
          <Closing />
        </main>
      </MotionOffContext.Provider>
    </MotionConfig>
  );
}
