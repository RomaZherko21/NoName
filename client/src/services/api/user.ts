import { fetch } from 'services'
import { User } from 'shared/types'

const ENDPOINT_BASE = '/user'

export const self = () => fetch.get<User>(`${ENDPOINT_BASE}`)

export const selfUpdate = (user: any) => fetch.put(`${ENDPOINT_BASE}`, user)

export const uploadPhoto = async (avatar: any, id: number) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  formData.append('id', String(id))
  return fetch.post<any>(`${ENDPOINT_BASE}/uploadPhoto`, formData)
}
