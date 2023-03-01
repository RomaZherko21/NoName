import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const namespaces = [
  'translation',
  'validation',
  'user',
  'notification',
  'post',
  'page',
  'sentences',
  'file',
  'chat',
]
const initTranslation = () => {
  return i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
      ns: namespaces,
      fallbackLng: 'en',
      debug: false,
      react: {
        useSuspense: false,
        nsMode: 'fallback',
      },
    })
}

export default initTranslation
