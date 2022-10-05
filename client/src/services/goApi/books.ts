import fetch from './fetch'

const ENDPOINT_BASE = '/books'

export const list = () => fetch.get<{ books: any }>(`${ENDPOINT_BASE}`)
