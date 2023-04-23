import { KanbanColumn } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban/boards'

export const  get = async () => await fetch.get<KanbanColumn[]>(`${ENDPOINT_BASE}`)

export const createBoard = async ( board: KanbanColumn ) => await fetch.post<KanbanColumn>(`${ENDPOINT_BASE}`, board)

export const  getById = async (id: number) => await fetch.get<KanbanColumn>(`${ENDPOINT_BASE}/${id}`)

export const  editBoard = async (id: number, board: KanbanColumn ) => await fetch.put<KanbanColumn>(`${ENDPOINT_BASE}/${id}`, board)

export const  deleteBoard = async (id: number) => await fetch.delete<KanbanColumn>(`${ENDPOINT_BASE}/${id}`)


// export const  getByIdColumns = async (id: number) => await fetch.get<KanbanColumn[]>(`${ENDPOINT_BASE}/${id}/columns`) 


