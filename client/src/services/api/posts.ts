import { getQueryParams } from 'shared/helpers'
import { Comment, Post, QueryParams, BasicUserInfo, MetaUserInfo } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/posts'

export const list = async ({ searchParams }: { searchParams?: QueryParams }) =>
  await fetch.get<{ posts: Post[]; count: number }>(
    `${ENDPOINT_BASE}${getQueryParams({
      ...searchParams,
      offset: Number(searchParams?.limit) * Number(searchParams?.page)
    })}`
  )

export const get = async (id: number) =>
  await fetch.get<Post & { user: BasicUserInfo & MetaUserInfo }>(`${ENDPOINT_BASE}/${id}`)

export const create = async (post: any) => {
  const formData = new FormData()

  Object.entries(post).forEach(([key, value]: any) => {
    if (value) {
      formData.append(key, value)
    }
  })

  return await fetch.post(`${ENDPOINT_BASE}`, formData)
}

export const createComment = async (id: number, comment: any) =>
  await fetch.post<Comment>(`${ENDPOINT_BASE}/${id}/comments`, comment)

export const editComment = async ({
  postId,
  commentId,
  comment
}: {
  postId: number
  commentId: number
  comment: { created_at: number; message: string }
}) => await fetch.put<Comment>(`${ENDPOINT_BASE}/${postId}/comments/${commentId}`, comment)

export const deleteComment = async (postId: number, id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/${postId}/comments/${id}`)

export const remove = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const like = async (id: number) => await fetch.put(`${ENDPOINT_BASE}/${id}/likes`)
