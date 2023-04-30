import fetch from '../fetch'

export interface Tag {
  id: number
  name: string
}

const ENDPOINT_BASE = '/kanban'

export const getKanbanTags = async (boardId: number) =>
  await fetch.get<Tag[]>(`${ENDPOINT_BASE}/boards/${boardId}/tags`)

export const createKanbanTag = async (boardId: number, tag: { name: string }) =>
  await fetch.post(`${ENDPOINT_BASE}/boards/${boardId}/tags`, tag)

export const editKanbanTag = async (boardId: number, tagId: number, tag: { name: string }) =>
  await fetch.put(`${ENDPOINT_BASE}/boards/${boardId}/tags/${tagId}`, tag)

export const removeKanbanTag = async (tagId: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/tags/${tagId}`)
