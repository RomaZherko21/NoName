import { Genre } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/genres'

export const list = () => fetch.get<{ genres: Genre[] }>(`${ENDPOINT_BASE}/`)
