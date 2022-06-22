import { fetch } from 'services'
import { TItem } from 'shared/types'

export const list = (limit: number, offset: number, userId: number) =>
  fetch.post<{ items: TItem[]; count: number }>('/item/list', {
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

  return fetch.post<TItem>('/item/create', formData)
}

export const remove = async (id: number) =>
  fetch.post<TItem>('/item/remove', { id })
