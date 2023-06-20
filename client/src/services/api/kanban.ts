import { KanbanBoard, KanbanColumn, KanbanComment, KanbanTask } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban'

export const getBoards = async () => await fetch.get<KanbanBoard[]>(`${ENDPOINT_BASE}/boards`)

export const getColumns = async (id: number) =>
  await fetch.get<KanbanColumn[]>(`${ENDPOINT_BASE}/boards/${id}/columns`)

export const deleteColumn = async (id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/columns/${id}`)

export const createKanbanColumn = async (column: { name: string; position: number }, id: number) =>
  await fetch.post(`${ENDPOINT_BASE}/boards/${id}/columns`, column)

export const getColumnTaskById = async (id: number) =>
  await fetch.get<KanbanTask>(`${ENDPOINT_BASE}/tasks/${id}`)

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

export const editTask = async (columnId: number, taskId: number, task: { name?: string }) =>
  await fetch.put(`${ENDPOINT_BASE}/columns/${columnId}/tasks/${taskId}`, task)
