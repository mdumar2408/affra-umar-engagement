import { createContext, useContext, useEffect, useState } from 'react';
import { EVENT } from './config.js';

// Every piece of wording on the invitation, per language. Names, venue and Arabic stay as written.
export const STRINGS = {
  en: {
    title: 'Affra & Umar — Engagement',
    languageLabel: 'Language',
    opening: {
      kicker: 'The engagement of',
      namesLabel: `${EVENT.brideShort} and ${EVENT.groomShort}`,
      weekday: 'Monday',
      date: '09 November 2026',
      cue: 'Scroll to open',
    },
    invite: {
      lines: [
        { text: 'In the name of Allah, the Most Gracious, the Most Merciful', kind: 'lead' },
        { text: 'With the blessings of Allah ﷻ and the duas of our families,' },
        { text: 'we joyfully invite you and your loved ones to join us in celebrating the blessed occasion of our' },
        { text: 'Engagement.', kind: 'key' },
        { text: 'May Allah ﷻ place barakah in this new beginning and bless us with goodness in the journey ahead.' },
      ],
      note: 'Your presence and heartfelt duas would make this occasion even more special.',
    },
    couple: {
      eyebrow: 'Two hearts · One journey',
      and: 'and',
      note: 'Two families, one prayer — a lifetime of barakah, in shā’ Allāh.',
    },
    celebrate: {
      eyebrow: 'Save the date',
      weekdayTime: 'Monday · 11:00 AM',
      month: 'November',
      ceremony: 'Engagement Ceremony',
      city: 'Tirunelveli',
    },
    countdown: {
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      before: 'until we celebrate together, in shā’ Allāh',
      today: 'Today is the day — Alhamdulillah!',
      after: 'Alhamdulillah — thank you for celebrating with us.',
      remaining: (d, h, m) => `${d} days, ${h} hours and ${m} minutes to go`,
    },
    blessings: {
      eyebrow: 'Prayers & blessings',
      title: 'Keep us in',
      titleEm: 'your duas.',
      lede: 'As we begin this new chapter, we ask Allah to place love, mercy and tranquillity between us.',
      duas: [
        {
          label: 'A Qur’anic reminder',
          text: '“And among His signs is that He created for you spouses from among yourselves so that you may find tranquillity in them; and He placed between you affection and mercy. Surely in this are signs for people who reflect.”',
          source: 'Sūrah ar-Rūm · 30:21',
        },
        {
          label: 'A Prophetic blessing',
          text: '“May Allah bless you both, shower His blessings upon you, and bring you together in goodness.”',
          source: 'Sunan Abī Dāwūd 2130 · Jāmiʿ at-Tirmidhī 1091',
        },
      ],
      coda: 'O Allah, place barakah in our journey and unite us upon goodness.',
    },
    venue: {
      eyebrow: 'Finding the venue',
      ceremony: 'Engagement Ceremony',
      dateLine: 'Monday, 09 November 2026 · 11:00 AM',
      city: 'Tirunelveli',
      maps: 'Open in Google Maps',
      qrTitle: 'Scan to find us',
      qrHint: 'Point your phone camera at the code to open directions.',
      qrAlt: `QR code — opens directions to ${EVENT.venue} in Google Maps`,
    },
    closing: {
      blessing: '“May Allah bless you both.”',
      small: 'Alhamdulillah · 09 · 11 · 2026',
    },
  },

  ta: {
    title: 'அஃப்ரா & உமர் — நிச்சயதார்த்தம்',
    languageLabel: 'மொழி',
    opening: {
      kicker: 'நிச்சயதார்த்த விழா',
      namesLabel: `${EVENT.brideShort} மற்றும் ${EVENT.groomShort}`,
      weekday: 'திங்கள்',
      date: '09 நவம்பர் 2026',
      cue: 'திறக்க கீழே உருட்டவும்',
    },
    invite: {
      lines: [
        { text: 'அளவற்ற அருளாளனும், நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால்.', kind: 'lead' },
        { text: 'அல்லாஹ்வின் அருளுடனும், எங்கள் குடும்பத்தினரின் துஆக்களுடனும்,' },
        { text: 'எங்களின்' },
        { text: 'நிச்சயதார்த்த நிகழ்வில்', kind: 'key' },
        { text: 'தங்களையும், தங்கள் குடும்பத்தினரையும் அன்புடன் கலந்து கொண்டு சிறப்பிக்குமாறு மகிழ்ச்சியுடன் அழைக்கிறோம்.' },
        { text: 'எங்களின் இந்தப் புதிய பயணத்தில் அல்லாஹ் பரக்கத்தையும், நன்மைகளையும் அருள்வானாக!' },
      ],
      note: 'தங்களின் வருகையும், அன்பான துஆக்களும் எங்களுக்கு மிகுந்த மகிழ்ச்சியைத் தரும்.',
    },
    couple: {
      eyebrow: 'இரு இதயங்கள் · ஒரே பயணம்',
      and: 'மற்றும்',
      note: 'இரு குடும்பங்கள், ஒரே பிரார்த்தனை — இன்ஷா அல்லாஹ், வாழ்நாள் முழுவதும் பரக்கத்.',
    },
    celebrate: {
      eyebrow: 'நாளைக் குறித்துக்கொள்ளுங்கள்',
      weekdayTime: 'திங்கள் · காலை 11:00 மணி',
      month: 'நவம்பர்',
      ceremony: 'நிச்சயதார்த்த விழா',
      city: 'திருநெல்வேலி',
    },
    countdown: {
      units: ['நாட்கள்', 'மணி', 'நிமிடம்', 'விநாடி'],
      before: 'இன்ஷா அல்லாஹ், நாம் ஒன்றாகக் கொண்டாடும் வரை',
      today: 'இன்றுதான் அந்த நாள் — அல்ஹம்துலில்லாஹ்!',
      after: 'அல்ஹம்துலில்லாஹ் — எங்களுடன் கொண்டாடியதற்கு நன்றி.',
      remaining: (d, h, m) => `இன்னும் ${d} நாட்கள், ${h} மணி நேரம், ${m} நிமிடங்கள்`,
    },
    blessings: {
      eyebrow: 'பிரார்த்தனைகள் & ஆசிகள்',
      title: 'உங்கள் துஆக்களில்',
      titleEm: 'எங்களை நினைவுகூருங்கள்.',
      lede: 'இந்தப் புதிய அத்தியாயத்தைத் தொடங்கும் வேளையில், எங்களிடையே அன்பையும் கருணையையும் அமைதியையும் அல்லாஹ் நிலைநாட்டுமாறு பிரார்த்திக்கிறோம்.',
      duas: [
        {
          label: 'திருக்குர்ஆன் நினைவூட்டல்',
          text: '“நீங்கள் அமைதி பெறுவதற்காக உங்களிலிருந்தே உங்களுக்குத் துணைகளைப் படைத்திருப்பதும், உங்களுக்கிடையே அன்பையும் கருணையையும் ஏற்படுத்தியிருப்பதும் அவனுடைய அத்தாட்சிகளில் உள்ளவையாகும். சிந்திக்கும் மக்களுக்கு நிச்சயமாக இதில் அத்தாட்சிகள் இருக்கின்றன.”',
          source: 'சூரா அர்-ரூம் · 30:21',
        },
        {
          label: 'நபிவழி வாழ்த்து',
          text: '“அல்லாஹ் உங்கள் இருவருக்கும் பரக்கத் செய்வானாக, உங்கள் மீது தன் அருளைப் பொழிவானாக, உங்கள் இருவரையும் நன்மையில் ஒன்றிணைப்பானாக.”',
          source: 'சுனன் அபூதாவூத் 2130 · ஜாமிஉத் திர்மிதீ 1091',
        },
      ],
      coda: 'யா அல்லாஹ், எங்கள் பயணத்தில் பரக்கத் செய்து, எங்களை நன்மையில் ஒன்றிணைப்பாயாக.',
    },
    venue: {
      eyebrow: 'விழா நடைபெறும் இடம்',
      ceremony: 'நிச்சயதார்த்த விழா',
      dateLine: 'திங்கள், 09 நவம்பர் 2026 · காலை 11:00 மணி',
      city: 'திருநெல்வேலி',
      maps: 'Google Maps-இல் திறக்க',
      qrTitle: 'ஸ்கேன் செய்து வழி அறியுங்கள்',
      qrHint: 'வழிகாட்டலைத் திறக்க உங்கள் கைபேசி கேமராவை இந்தக் குறியீட்டின் மீது காட்டுங்கள்.',
      qrAlt: `QR குறியீடு — ${EVENT.venue} செல்லும் வழியை Google Maps-இல் திறக்கும்`,
    },
    closing: {
      blessing: '“அல்லாஹ் உங்கள் இருவருக்கும் பரக்கத் செய்வானாக.”',
      small: 'அல்ஹம்துலில்லாஹ் · 09 · 11 · 2026',
    },
  },
};

export const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
];

export const LangContext = createContext('en');
export const useStrings = () => STRINGS[useContext(LangContext)];

function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && fromUrl in STRINGS) return fromUrl;
    const saved = window.localStorage.getItem('lang');
    if (saved && saved in STRINGS) return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to English.
  }
  return 'en';
}

/** Current language, kept in sync with <html lang>, the page title, storage and a shareable ?lang= URL. */
export function useLangState() {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = STRINGS[lang].title;
    try {
      window.localStorage.setItem('lang', lang);
    } catch {
      // Ignore: the choice just won't be remembered.
    }
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  }, [lang]);

  return [lang, setLang];
}
