import { getQueryParams } from 'shared/helpers'
import { QueryParams, User, BasicUserInfo, MetaUserInfo, UserCredentials } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/users'

export const list = ({ searchParams }: { searchParams?: QueryParams }) =>
  fetch.get<{ users: (BasicUserInfo & MetaUserInfo)[]; count: number }>(
    `${ENDPOINT_BASE}${getQueryParams({
      ...searchParams,
      offset: Number(searchParams?.limit) * Number(searchParams?.page),
    })}`
  )

export const getById = (id: number) => fetch.get<User>(`${ENDPOINT_BASE}/${id}`)

export const create = async (user: BasicUserInfo & MetaUserInfo & UserCredentials) => {
  const formData = new FormData()

  Object.entries(user).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return fetch.post(`${ENDPOINT_BASE}`, formData)
}

export const update = (user: BasicUserInfo & MetaUserInfo & UserCredentials, id: number) =>
  fetch.put(`${ENDPOINT_BASE}/${id}`, user)

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
