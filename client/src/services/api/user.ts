import fetch from 'services/fetch'
import { User } from 'types/user'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = ({ email, password, name, surname, role_id }: User) =>
  fetch.post('/user/create', { email, password, name, surname, role_id })

export const update = () => fetch.post('/user/update')

export const remove = () => fetch.delete('/user/delete')

export const list = () => fetch.get('/user/list')

export const self = (email: string, password: string) =>
  fetch.post('/user/self', { email, password })
