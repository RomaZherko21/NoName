import { Book } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/books'

export const list = () => fetch.get<{ books: Book[] }>(`${ENDPOINT_BASE}/`)

export const get = (id: number) => fetch.get<{ book: Book }>(`${ENDPOINT_BASE}/${id}`)

export const getStats = (id: number) =>
  fetch.get<{
    bookStats: {
      remains_counter: number
      books_taken_percentage: number
      quantity: number
      subscriptions_counter: number
      popularity_percentage: number
    }
  }>(`${ENDPOINT_BASE}/${id}/stats`)
