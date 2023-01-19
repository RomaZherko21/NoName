import { getQueryParams } from 'shared/helpers'
import { ConnectionStatus, User } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/connections'

export const get = ({
  status,
  isReceived = true,
  isSent = true,
}: {
  status: ConnectionStatus
  isReceived?: boolean
  isSent?: boolean
}) => fetch.get<User>(`${ENDPOINT_BASE}${getQueryParams({ status, isReceived, isSent })}`)

export const update = (id: number, status: ConnectionStatus) =>
  fetch.put(`${ENDPOINT_BASE}/${id}`, { status })

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
