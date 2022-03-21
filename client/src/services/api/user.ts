import fetch from 'services/fetch'
import { UserMeta } from 'types/user'

export const create = (user: UserMeta) =>
  fetch.post<UserMeta>('/user/create', user)

export const update = (user: UserMeta) => fetch.post('/user/update', user)

export const remove = (id: number) => fetch.post('/user/remove', { id })

export const list = (limit: number, offset: number) =>
  fetch.post<{ users: UserMeta[]; count: number }>('/user/list', {
    limit,
    offset,
  })

export const self = () => fetch.get<UserMeta>('/user/self')
