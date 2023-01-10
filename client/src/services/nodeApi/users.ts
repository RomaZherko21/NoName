import { getQueryParams } from 'shared/helpers'
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
  fetch.get<{ users: User[]; count: number }>(
    `${ENDPOINT_BASE}${getQueryParams({ ...filters, limit, offset })}`
  )

export const getById = (id: number) => fetch.get<User>(`${ENDPOINT_BASE}/${id}`)

export const create = (user: User) => fetch.post<User>(`${ENDPOINT_BASE}`, user)

export const update = (user: User, id: number) => fetch.put(`${ENDPOINT_BASE}/${id}`, user)

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
