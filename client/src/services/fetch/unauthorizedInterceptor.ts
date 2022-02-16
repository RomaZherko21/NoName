import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import RootStore from 'stores/Root'

export default function unauthorizedInterceptor(error: AxiosError) {
  const { response } = error

  if (response && response.status === 400) {
    toast(response.data.message)
  }
  if (response && response.status === 403) {
    RootStore.authorization.unauthorize()
  }

  return Promise.reject(error)
}
