import { User } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/users'

export const list = ({
  limit,
  offset,
  filters,
}: {
  limit: number
  offset: number
  filters?: any
}) =>
  fetch.post<{ users: User[]; count: number }>(`${ENDPOINT_BASE}/list`, {
    filters,
    limit,
    offset,
  })

console.log('heere')

export const create = (user: User) => fetch.post<User>(`${ENDPOINT_BASE}`, user)

export const update = (user: User, id: number) => fetch.put(`${ENDPOINT_BASE}/${id}`, user)

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
