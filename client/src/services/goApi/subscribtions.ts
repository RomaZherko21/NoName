import { Subscribtion } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/subscribtions'

export const list = () => fetch.get<{ subscribtions: Subscribtion[] }>(`${ENDPOINT_BASE}/`)

export const update = (value: Subscribtion, id: number) =>
  fetch.put(`${ENDPOINT_BASE}/${id}`, value)
