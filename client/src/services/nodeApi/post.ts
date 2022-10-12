import { Post } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/posts'

export const list = (limit: number, offset: number) =>
  fetch.get<{ posts: Post[]; count: number }>(`${ENDPOINT_BASE}?limit=${limit}&offset=${offset}`)

export const create = async (post: any) => {
  const formData = new FormData()

  for (const key in post) {
    formData.append(key, post[key])
  }

  return fetch.post<Post>(`${ENDPOINT_BASE}`, formData)
}

export const remove = async (id: number) => fetch.delete<Post>(`${ENDPOINT_BASE}/${id}`)
