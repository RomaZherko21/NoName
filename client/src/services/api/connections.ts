import { getQueryParams } from 'shared/helpers'
import { Connection, ConnectionStatus } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/connections'

export const get = async ({
  status,
  isReceived = true,
  isSent = true,
  userId
}: {
  status: ConnectionStatus
  isReceived?: boolean
  isSent?: boolean
  userId: number
}) =>
  await fetch.get<Connection[]>(
    `${ENDPOINT_BASE}${getQueryParams({
      status,
      isReceived,
      isSent,
      user_id: userId
    })}`
  )

export const update = async (id: number, status: ConnectionStatus) =>
  await fetch.put(`${ENDPOINT_BASE}/${id}`, { status })

export const remove = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)
