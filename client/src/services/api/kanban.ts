import { KanbanColumn, KanbanComment } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban'

export const get = (id: number) => fetch.get<KanbanColumn>(`${ENDPOINT_BASE}/${id}`)

export const createComment = (id: number, comment: any) =>
  fetch.post<KanbanComment>(`${ENDPOINT_BASE}/${id}/comments`, comment)

export const editComment = ({
  task_id,
  comment_id,
  comment,
}: {
  task_id: number
  comment_id: number
  comment: { created_at: number; message: string }
}) => fetch.put<KanbanComment>(`${ENDPOINT_BASE}/${task_id}/comments/${comment_id}`, comment)

export const deleteComment = (task_id: number, id: number) =>
  fetch.delete(`${ENDPOINT_BASE}/${task_id}/comments/${id}`)
