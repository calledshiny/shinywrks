import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'swx-lang';
const LANGS = ['de', 'en'];

const UI = {
  loading:          { de: 'Lädt …',            en: 'Loading …' },
  navProjects:      { de: 'Projekte',          en: 'Projects' },
  navContact:       { de: 'Kontakt',           en: 'Contact' },
  role:             { de: 'Kommunikationsdesigner', en: 'Communication Designer' },
  available:        { de: 'Verfügbar',         en: 'Available' },
  myProjects:       { de: 'Meine Projekte',    en: 'My Projects' },
  contactCta:       { de: 'Kontakt',           en: 'Contact' },
  more:             { de: 'mehr',              en: 'more' },
  less:             { de: 'weniger',           en: 'less' },
  contactLabel:     { de: 'Kontakt',           en: 'Contact' },
  location:         { de: 'Standort',          en: 'Location' },
  description:      { de: 'Beschreibung',      en: 'Description' },
  liveAt:           { de: 'Live unter',        en: 'Live at' },
  claim:            { de: 'Claim:',            en: 'Claim:' },
  prev:             { de: 'Vorheriges',        en: 'Previous' },
  next:             { de: 'Nächstes',          en: 'Next' },
};

const LangContext = createContext(null);

function readInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored)) return stored;
  } catch (e) { /* ignore */ }
  return 'de';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang: (l) => LANGS.includes(l) && setLangState(l),
    t: (key) => (UI[key] ? UI[key][lang] : key),
  }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) return { lang: 'de', setLang: () => {}, t: (k) => (UI[k] ? UI[k].de : k) };
  return ctx;
}

// Deep-clone project data and, for German (default) or English, collapse every
// `<field>En` sibling into `<field>` so downstream components stay language-agnostic.
export function localizeProjects(projects, lang) {
  if (!projects) return projects;
  const clone = JSON.parse(JSON.stringify(projects));
  const walk = (node) => {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      Object.keys(node).forEach((key) => {
        if (key.length > 2 && key.endsWith('En')) {
          const base = key.slice(0, -2);
          if (Object.prototype.hasOwnProperty.call(node, base)) {
            if (lang === 'en') node[base] = node[key];
            delete node[key];
          }
        }
      });
      Object.values(node).forEach(walk);
    }
  };
  walk(clone);
  return clone;
}
