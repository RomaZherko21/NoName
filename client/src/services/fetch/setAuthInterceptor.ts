import { AxiosRequestConfig } from 'axios'

import rootStore from 'stores/Root'

export default function setAuthInterceptor(config: AxiosRequestConfig) {
  const accessToken = rootStore.authorization.getAccessToken()

  if (config.headers) {
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      // eslint-disable-next-line no-param-reassign
      delete config.headers.Authorization
    }
  }
  return config
}
