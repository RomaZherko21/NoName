import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { RootStore } from 'stores'

export function unauthorizedInterceptor(error: AxiosError) {
  const { response } = error

  if (response?.status === 400 || response?.status === 401 || response?.status === 500) {
    toast.error(response.data.message)
  }
  if (response?.status === 403) {
    RootStore.authorization.unauthorize()
  }

  return Promise.reject(error)
}
