import { Fragment, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, useReveal } from '../lib/hooks.js';
import { Star8 } from './Ornaments.jsx';

const DAY = 86_400_000;
const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

function remaining(target, now) {
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / DAY),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

function Unit({ value, label, p, index }) {
  const style = useReveal(p, [0.5 + index * 0.05, 0.62 + index * 0.05], { y: 14 });
  return (
    <motion.div className="cd__unit" style={style}>
      <span className="cd__num" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.span
            key={value}
            initial={{ y: '-55%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '55%', opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="cd__label">{label}</span>
    </motion.div>
  );
}

export default function Countdown({ p, iso, endIso }) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  const dayEnd = useMemo(() => new Date(endIso).getTime(), [endIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = remaining(target, now);
  const status =
    now < target
      ? 'until we celebrate together, in shā’ Allāh'
      : now < dayEnd
        ? 'Today is the day — Alhamdulillah!'
        : 'Alhamdulillah — thank you for celebrating with us.';
  const sepStyle = useReveal(p, [0.55, 0.7], { y: 0 });
  const statusStyle = useReveal(p, [0.72, 0.84], { y: 10 });

  return (
    <div className="cd">
      <p className="sr-only">
        {now < target ? `${left.days} days, ${left.hours} hours and ${left.minutes} minutes to go` : status}
      </p>
      <div className="cd__row">
        {UNITS.map(([key, label], i) => (
          <Fragment key={key}>
            {i > 0 && (
              <motion.span className="cd__sep" style={sepStyle}>
                <Star8 />
              </motion.span>
            )}
            <Unit value={pad(left[key])} label={label} p={p} index={i} />
          </Fragment>
        ))}
      </div>
      <motion.p className="cd__status" style={statusStyle}>
        {status}
      </motion.p>
    </div>
  );
}
