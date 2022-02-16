import fetch from 'services/fetch'
import { User } from 'types/user'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = (user: User) => fetch.post<User>('/user/create', user)

export const update = () => fetch.post('/user/update')

export const remove = () => fetch.delete('/user/delete')

export const list = () => fetch.get<User[]>('/user/list')

export const self = (email: string, password: string) =>
  fetch.post('/user/self', { email, password })
