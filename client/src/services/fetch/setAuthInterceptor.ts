import { AxiosRequestConfig } from 'axios'

import rootStore from 'stores/Root'

export default function setAuthInterceptor(config: AxiosRequestConfig) {
  const token = rootStore.authorization.accessToken

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
