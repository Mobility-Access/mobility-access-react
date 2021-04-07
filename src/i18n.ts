import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
    // We want to load translations via XHR requests so we don't load all language strings initially
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // Detect user language and store user selected language
    // https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    // https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;