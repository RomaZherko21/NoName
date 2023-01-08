import { User } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/user'

export const get = () => fetch.get<User>(`${ENDPOINT_BASE}`)

export const update = (user: any) => fetch.put(`${ENDPOINT_BASE}`, user)

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const uploadPhoto = async (avatar: any, id: number) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  formData.append('id', String(id))
  return fetch.post<any>(`${ENDPOINT_BASE}/uploadPhoto`, formData)
}
