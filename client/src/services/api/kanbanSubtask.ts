import { KanbanSubtask } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/subtasks'

export const getKanbanSubtasks = async (id: number) =>
  await fetch.get<KanbanSubtask>(`/kanban/tasks/${id}/${ENDPOINT_BASE}`)

export const createKanbanSubtask = async (subtask: KanbanSubtask, id: number) =>
  await fetch.post(`/kanban/tasks/${id}/${ENDPOINT_BASE}`, subtask)

export const updateKanbanSubtask = async (id: number, subtask: KanbanSubtask) =>
  await fetch.put(`/kanban/tasks/${id}/${ENDPOINT_BASE}/${id}`, subtask)

export const removeKanbanSubtask = async (id: number) =>
  await fetch.delete(`/kanban/${ENDPOINT_BASE}/${id}`)
