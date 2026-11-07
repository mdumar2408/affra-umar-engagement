import { LANGS, STRINGS } from '../i18n.js';

/** Fixed EN / தமிழ் switch in the top corner. */
export default function LangToggle({ lang, onChange }) {
  return (
    <div className="lang-toggle" role="group" aria-label={STRINGS[lang].languageLabel}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className="lang-toggle__btn"
          aria-pressed={lang === l.code}
          onClick={() => onChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
