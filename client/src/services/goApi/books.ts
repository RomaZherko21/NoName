import fetch from './fetch'

const ENDPOINT_BASE = '/books'

export const list = () => fetch.get<{ books: any }>(`${ENDPOINT_BASE}`)

export const get = (id: number) => fetch.get<{ book: any }>(`${ENDPOINT_BASE}/${id}`)
