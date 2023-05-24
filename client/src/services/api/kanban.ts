import { KanbanColumn, KanbanColumnItem, KanbanComment } from 'shared/types'

import fetch from './fetch'
// import id from 'date-fns/locale/id'

const ENDPOINT_BASE = '/kanban'

export const getColumns = async (id: number) => await fetch.get<KanbanColumn[]>(`${ENDPOINT_BASE}/boards/${id}/columns`)
export const deleteColumn = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/columns/${id}`)
export const postColumn = async (KanbanColumnItem: KanbanColumnItem) => await fetch.post<KanbanColumnItem>(`${ENDPOINT_BASE}/boards/1/columns`, KanbanColumnItem)// может передавать name и position?

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



// на PHP MyAdmin находится 3 колонки, но я получаю только 2 по итогу
// нужно добавить ID для каждого KanbanColumn, не могу сделать delete (хотя на PHP MyAdmin есть ID)
// чтоб перейти на master нужно сделать commit, но мне нечего коммитить, я тупо шарился по проекту
