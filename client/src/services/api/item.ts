import fetch from 'services/fetch'
import { Item } from 'types/item'

export const list = (limit: number, offset: number, userId: number) =>
  fetch.post<{ items: Item[]; count: number }>('/item/list', {
    userId,
    limit,
    offset,
  })

export const create = (item: Item) => fetch.post<Item>('/item/create', item)
