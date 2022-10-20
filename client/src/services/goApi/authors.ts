import { Author, Book } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/authors'

export const get = (id: number) => fetch.get<{ author: Author }>(`${ENDPOINT_BASE}/${id}`)

export const getAuthorBooks = (id: number) =>
  fetch.get<{ books: Book[] }>(`${ENDPOINT_BASE}/${id}/books`)
