import { fetch } from 'services'
import { Item } from 'shared/types'

export const list = (limit: number, offset: number, userId: number) =>
  fetch.post<{ items: Item[]; count: number }>('/item/list', {
    userId,
    limit,
    offset,
  })

export const create = async (item: any) => {
  const formData = new FormData()

  // eslint-disable-next-line
  for (const key in item) {
    formData.append(key, item[key])
  }

  return fetch.post<Item>('/item/create', formData)
}

export const remove = async (id: number) =>
  fetch.post<Item>('/item/remove', { id })
