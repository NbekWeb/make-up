import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import uz from './locales/uz.json'
import kk from './locales/kk.json'
import ko from './locales/ko.json'

const messages = {
  en,
  ru,
  uz,
  kk,
  ko
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
})

export default i18n 