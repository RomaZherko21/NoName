import { Genre } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/genres'

export const get = async () => await fetch.get<Genre[]>(`${ENDPOINT_BASE}`)
