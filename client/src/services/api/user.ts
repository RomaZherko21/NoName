import fetch from 'services/fetch'
import { UserMeta } from 'types/user'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = (user: UserMeta) =>
  fetch.post<UserMeta>('/user/create', user)

export const update = () => fetch.post('/user/update')

export const remove = () => fetch.delete('/user/delete')

export const list = () => fetch.get<UserMeta[]>('/user/list')

export const self = (email: string, password: string) =>
  fetch.post('/user/self', { email, password })
