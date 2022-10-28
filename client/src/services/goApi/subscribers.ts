import { Book, Subscriber } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/subscribers'

export const list = () => fetch.get<{ subscribers: Subscriber[] }>(`${ENDPOINT_BASE}/`)

export const get = (id: number) =>
  fetch.get<{ subscriber: Subscriber & { books: Book[] } }>(`${ENDPOINT_BASE}/${id}`)

export const create = (value: Subscriber) => fetch.post<Subscriber>(`${ENDPOINT_BASE}`, value)

export const update = (value: Subscriber, id: number) => fetch.put(`${ENDPOINT_BASE}/${id}`, value)

export const remove = (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)
