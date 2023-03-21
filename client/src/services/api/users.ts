import { getQueryParams } from 'shared/helpers'
import { QueryParams, User, BasicUserInfo, MetaUserInfo, UserCredentials } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/users'

export const list = async ({ searchParams }: { searchParams?: QueryParams }) =>
  await fetch.get<{ users: (BasicUserInfo & MetaUserInfo)[]; count: number }>(
    `${ENDPOINT_BASE}${getQueryParams({
      ...searchParams,
      offset: Number(searchParams?.limit) * Number(searchParams?.page)
    })}`
  )

export const getById = async (id: number) => await fetch.get<User>(`${ENDPOINT_BASE}/${id}`)

export const create = async (user: BasicUserInfo & MetaUserInfo & UserCredentials) => {
  const formData = new FormData()

  Object.entries(user).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return await fetch.post(`${ENDPOINT_BASE}`, formData)
}

export const update = async (user: BasicUserInfo & MetaUserInfo & UserCredentials, id: number) =>
  await fetch.put(`${ENDPOINT_BASE}/${id}`, user)

export const remove = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)
