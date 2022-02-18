import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const LANGUAGES = new Map([
  ['uk', 'Укр'],
  ['en', 'Eng'],
]);

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    fallbackLng: ["en", "uk"],
    lng: 'uk',
    supportedLngs: Array.from(LANGUAGES.keys()),

    // XHR Backend
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolation
    interpolation: {
      // not needed for react
      escapeValue: false,
    },
  });

export default i18n
