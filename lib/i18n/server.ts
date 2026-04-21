import type { Locale } from './config';

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  nl: () => import('./dictionaries/nl.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
