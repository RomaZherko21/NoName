import { getQueryParams } from 'shared/helpers'
import fetch from './fetch'

const ENDPOINT_BASE = '/chat'

export const getUserChats = async () => await fetch.get<any>(`${ENDPOINT_BASE}`)

export const getChatMessages = async (chatId: number) =>
  await fetch.get<any>(
    `${ENDPOINT_BASE}/messages${getQueryParams({
      chatId
    })}`
  )
