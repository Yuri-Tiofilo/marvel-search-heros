import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { ptBR, enUs } from './locales'

const resources = {
  'pt-BR': {
    translation: ptBR
  },
  'en-US': {
    translation: enUs
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
