import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const namespaces = ['translation', 'validation', 'user', 'notification', 'item', 'pages', 'crypto']

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: namespaces,
    fallbackLng: 'en',
    debug: true,
    react: {
      useSuspense: false,
      nsMode: 'fallback',
    },
  })

export default i18n
