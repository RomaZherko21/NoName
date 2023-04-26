import { KanbanBoard, KanbanColumnItem, } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban/boards'
const ENDPOINT_BASE_COLUMNS = '/kanban/columns'

export const  getKanbanBoards = async () => await fetch.get<KanbanBoard[]>(`${ENDPOINT_BASE}`)

export const createKanbanBoard = async ( board: KanbanBoard ) => await fetch.post(`${ENDPOINT_BASE}`, board)

export const  getKanbanBoard = async (id: number) => await fetch.get<KanbanBoard>(`${ENDPOINT_BASE}/${id}`)

export const  editKanbanBoard = async (id: number, board: KanbanBoard ) => await fetch.put(`${ENDPOINT_BASE}/${id}`, board)

export const  deleteKanbanBoard = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const  getKanbanColumns = async (id: number) => await fetch.get<KanbanColumnItem[]>(`${ENDPOINT_BASE}/${id}`)

export const  createKanbanColumns = async (columns: any, id: number ) => await fetch.get(`${ENDPOINT_BASE}/${id}`, columns)// ответ от Back с ошибкой 500

export const  editKanbanColumns = async (column: any, id: number ) => await fetch.put(`${ENDPOINT_BASE}/${id}/columns/${id}`, column)

export const  deleteKanbanColumns = async (id: number) => await fetch.delete(`${ENDPOINT_BASE_COLUMNS}/${id}`)

 