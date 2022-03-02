import fetch from 'services/fetch'
import { UserMeta } from 'types/user'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = (user: UserMeta) =>
  fetch.post<UserMeta>('/user/create', user)

export const update = (user: UserMeta) => fetch.post('/user/update', user)

export const remove = (id: number) => fetch.post('/user/delete', { id })

export const list = () => fetch.get<UserMeta[]>('/user/list')

export const self = (id: number) => fetch.post<UserMeta>('/user/self', { id })
