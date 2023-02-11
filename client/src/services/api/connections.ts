import { getQueryParams } from 'shared/helpers'
import { Connection, ConnectionStatus } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/connections'

export const get = ({
  status,
  isReceived = true,
  isSent = true,
  user_id,
}: {
  status: ConnectionStatus
  isReceived?: boolean
  isSent?: boolean
  user_id: number
}) =>
  fetch.get<Connection[]>(
    `${ENDPOINT_BASE}${getQueryParams({ status, isReceived, isSent, user_id })}`
  )

export const update = (id: number, status: ConnectionStatus) =>
  fetch.put(`${ENDPOINT_BASE}/${id}`, { status })

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
