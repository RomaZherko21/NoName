import { AxiosRequestConfig } from 'axios'

import { RootStore } from 'stores'

export function setAuthInterceptor(config: AxiosRequestConfig) {
  const token = RootStore.authorization.accessToken

  if (config.headers) {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // eslint-disable-next-line no-param-reassign
      delete config.headers.Authorization
    }
  }
  return config
}
