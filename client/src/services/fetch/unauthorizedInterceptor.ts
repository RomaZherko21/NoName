import { AxiosError } from 'axios'

import RootStore from 'stores/Root'

export default function unauthorizedInterceptor(error: AxiosError) {
  const { response } = error

  console.log(response)

  if (response && response.status === 403) {
    RootStore.authorization.unauthorize()
  }

  return Promise.reject(error)
}
