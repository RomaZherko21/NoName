import { getQueryParams } from 'shared/helpers'
import { Comment, Post, User } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/posts'

export const list = ({
  limit,
  offset,
  filters,
}: {
  limit: number
  offset: number
  filters?: any
}) =>
  fetch.get<{ posts: Post[]; count: number }>(
    `${ENDPOINT_BASE}${getQueryParams({ ...filters, limit, offset })}`
  )

export const get = (id: number) => fetch.get<Post & { user: User }>(`${ENDPOINT_BASE}/${id}`)

export const create = async (post: any) => {
  const formData = new FormData()

  for (const key in post) {
    formData.append(key, post[key])
  }

  return fetch.post(`${ENDPOINT_BASE}`, formData)
}

export const createComment = (id: number, comment: any) =>
  fetch.post<Comment>(`${ENDPOINT_BASE}/${id}/comments`, comment)

export const editComment = ({
  post_id,
  comment_id,
  comment,
}: {
  post_id: number
  comment_id: number
  comment: { created_at: number; message: string }
}) => fetch.put<Comment>(`${ENDPOINT_BASE}/${post_id}/comments/${comment_id}`, comment)

export const deleteComment = (post_id: number, id: number) =>
  fetch.delete(`${ENDPOINT_BASE}/${post_id}/comments/${id}`)

export const remove = async (id: number) => fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const like = async (id: number) => fetch.put(`${ENDPOINT_BASE}/${id}/likes`)
