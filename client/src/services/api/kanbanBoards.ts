import { KanbanBoard, KanbanBoardColumn } from 'shared/types'

import fetch from './fetch'

const ENDPOINT_BASE = '/kanban/boards'
const ENDPOINT_BASE_COLUMNS = '/kanban/columns'

export const  get = async () => await fetch.get<KanbanBoard[]>(`${ENDPOINT_BASE}`)

export const createBoard = async ( board: KanbanBoard ) => await fetch.post(`${ENDPOINT_BASE}`, board)

export const  getById = async (id: number) => await fetch.get<KanbanBoard>(`${ENDPOINT_BASE}/${id}`)

export const  editBoard = async (id: number, board: KanbanBoard ) => await fetch.put(`${ENDPOINT_BASE}/${id}`, board)

export const  deleteBoard = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const  getColumns = async (id: number) => await fetch.get<KanbanBoardColumn[]>(`${ENDPOINT_BASE}/${id}`)

export const  createColumns = async (columns: any, id: number ) => await fetch.get(`${ENDPOINT_BASE}/${id}`, columns)// ответ от Back с ошибкой 500

export const  editColumns = async (column: any, id: number ) => await fetch.put(`${ENDPOINT_BASE}/${id}/columns/${id}`, column)

export const  deleteColumns = async (id: number) => await fetch.delete(`${ENDPOINT_BASE_COLUMNS}/${id}`)

