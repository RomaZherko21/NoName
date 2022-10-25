import { Book } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/books'

export const list = () => fetch.get<{ books: Book[] }>(`${ENDPOINT_BASE}/`)

export const get = (id: number) => fetch.get<{ book: Book }>(`${ENDPOINT_BASE}/${id}`)
