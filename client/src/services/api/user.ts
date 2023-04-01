import { User, BasicUserInfo, MetaUserInfo, UserCredentials } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/user'

export const get = async () => await fetch.get<User>(`${ENDPOINT_BASE}`)

export const getPermissions = async () =>
  await fetch.get<{ [key: string]: string[] }>(`${ENDPOINT_BASE}/permissions`)

export const update = async (user: BasicUserInfo & MetaUserInfo & UserCredentials) =>
  await fetch.put(`${ENDPOINT_BASE}`, user)

export const remove = async () => await fetch.delete(`${ENDPOINT_BASE}`)

export const uploadPhoto = async (avatar: File) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return await fetch.post<any>(`${ENDPOINT_BASE}/uploadPhoto`, formData)
}
