import { KanbanColumn, KanbanComment } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban'

export const getColumns = async (id: number) => await fetch.get<KanbanColumn[]>(`${ENDPOINT_BASE}/boards/${id}/columns`)

export const createComment = async (id: number, comment: any) =>
  await fetch.post<KanbanComment>(`${ENDPOINT_BASE}/${id}/comments`, comment)

export const editComment = async ({
  taskId,
  commentId,
  comment
}: {
  taskId: number
  commentId: number
  comment: { message: string }
}) => await fetch.put<KanbanComment>(`${ENDPOINT_BASE}/${taskId}/comments/${commentId}`, comment)

export const deleteComment = async (taskId: number, id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/${taskId}/comments/${id}`)
