// i18n initialization using i18next and react-i18next
// This file sets up language resources and default language.
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en/common.json'
import hi from '../locales/hi/common.json'

// Human-friendly language names used by the switcher
export const supportedLanguages = {
    en: 'English',
    hi: 'हिन्दी',
}

// Initialize i18next
void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            hi: { translation: hi },
        },
        lng: (() => {
            try {
                const saved = localStorage.getItem('app_lang')
                if (saved) return saved
            } catch { }
            // Try browser language map
            const browser = (navigator.language || 'en').slice(0, 2)
            return ['en', 'hi'].includes(browser) ? browser : 'en'
        })(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
