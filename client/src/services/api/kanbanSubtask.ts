import { KanbanSubtask } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban'

export const getKanbanSubtasks = async (id: number) =>
  await fetch.get<KanbanSubtask>(`${ENDPOINT_BASE}/tasks/${id}/subtasks`)

export const createKanbanSubtask = async (subtask: KanbanSubtask, id: number) =>
  await fetch.post(`${ENDPOINT_BASE}/tasks/${id}/subtasks`, subtask)

export const updateKanbanSubtask = async (id: number, subtask: KanbanSubtask) =>
  await fetch.put(`${ENDPOINT_BASE}/tasks/${id}/subtasks/${id}`, subtask)

export const removeKanbanSubtask = async (id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/subtasks/${id}`)
