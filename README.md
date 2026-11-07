# Affra & Umar — Engagement Invitation

A scroll-driven digital invitation built with Vite, React and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Live at https://mdumar2408.github.io/affra-umar-engagement/ — every push to `main` rebuilds and redeploys
via `.github/workflows/deploy.yml`.

## Where things live

- `src/config.js` — names, date, venue, city, Maps link. Edit details here.
- `src/scenes/` — the seven scenes, in scroll order.
- `src/components/Backdrop.jsx` — fixed background tones and the geometric pattern.
- `src/assets/venue-qr.png` — the venue QR code (encodes the Maps link).

## How the scrolling works

Pinned scenes (Invitation, Couple, Celebration) are tall sections with a `position: sticky` 100svh stage.
`useSceneProgress` gives each one three Framer Motion scroll values: `enter`, `p` (while pinned) and `exit`.
Elements map slices of those values to opacity/transform, so nothing re-renders on scroll.
Blessings, Venue and Closing flow normally and reveal on view (IntersectionObserver via `whileInView`).

With `prefers-reduced-motion` or on short landscape phones, scenes unpin and render fully revealed.
