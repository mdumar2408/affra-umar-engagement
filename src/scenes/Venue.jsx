import { motion } from 'framer-motion';
import { Divider } from '../components/Ornaments.jsx';
import { EVENT } from '../config.js';
import { EASE, rise, sequence } from '../lib/hooks.js';
import qrUrl from '../assets/venue-qr.png';

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 }, variants: sequence };

const qrFrame = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.5 } },
};
// The code wipes in from the top and ends with no transform applied, so it scans cleanly.
const qrImage = {
  hidden: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE, delay: 1 } },
};

/** Scene 6 — where to go: venue, directions and a scannable QR code. */
export default function Venue({ sectionRef }) {
  return (
    <section ref={sectionRef} id="venue" className="scene flow venue" aria-label="Finding the venue">
      <Divider className="venue__divider" reveal="view" />
      <motion.div className="venue__grid" {...inView}>
        <div className="venue__copy">
          <motion.p className="eyebrow" variants={rise} custom={0}>
            Finding the venue
          </motion.p>
          <motion.h2 className="venue__name" variants={rise} custom={0.15}>
            {EVENT.venue}
          </motion.h2>
          <motion.p className="venue__meta" variants={rise} custom={0.3}>
            <span>{EVENT.ceremony}</span>
            <span>
              {EVENT.weekday}, {EVENT.dateLong} · {EVENT.time}
            </span>
            <span>{EVENT.city}</span>
          </motion.p>
          <motion.a
            className="maps-btn"
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={rise}
            custom={0.45}
          >
            Open in Google Maps <span aria-hidden="true">↗</span>
          </motion.a>
        </div>

        <motion.figure className="qr" variants={qrFrame}>
          <span className="qr__corner qr__corner--tl" />
          <span className="qr__corner qr__corner--tr" />
          <span className="qr__corner qr__corner--bl" />
          <span className="qr__corner qr__corner--br" />
          <a className="qr__code" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
            <motion.img
              src={qrUrl}
              width="410"
              height="410"
              alt={`QR code — opens directions to ${EVENT.venue} in Google Maps`}
              variants={qrImage}
            />
          </a>
          <figcaption>
            <span className="qr__title">Scan to find us</span>
            <span className="qr__hint">Point your phone camera at the code to open directions.</span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}
