import { getQueryParams } from 'shared/helpers'
import fetch from './fetch'

const ENDPOINT_BASE = '/chat'

export const getUserChats = () => fetch.get<any>(`${ENDPOINT_BASE}`)

export const getChatMessages = (chatId: number) =>
  fetch.get<any>(
    `${ENDPOINT_BASE}/messages${getQueryParams({
      chatId,
    })}`
  )
