import { fetch } from 'services'
import { Post } from 'shared/types'

export const list = (limit: number, offset: number) =>
  fetch.post<{ posts: Post[]; count: number }>('/post/list', {
    limit,
    offset,
  })

export const create = async (post: any) => {
  const formData = new FormData()

  // eslint-disable-next-line
  for (const key in post) {
    formData.append(key, post[key])
  }

  return fetch.post<Post>('/post/create', formData)
}

export const remove = async (id: number) => fetch.post<Post>('/post/remove', { id })
