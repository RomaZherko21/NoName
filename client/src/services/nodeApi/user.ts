import { User } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/user'

export const get = () => fetch.get<User>(`${ENDPOINT_BASE}`)

export const update = (user: any) => fetch.put(`${ENDPOINT_BASE}`, user)

export const remove = () => fetch.delete(`${ENDPOINT_BASE}`)

export const uploadPhoto = async (avatar: any) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return fetch.post<any>(`${ENDPOINT_BASE}/uploadPhoto`, formData)
}
