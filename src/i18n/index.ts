import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '@/i18n/locales/en.json';
import fil from '@/i18n/locales/fil.json';
import ja from '@/i18n/locales/ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fil: {
        translation: fil,
      },
      ja: {
        translation: ja,
      },
    },

    fallbackLng: 'en',

    supportedLngs: ['en', 'fil', 'ja'],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
