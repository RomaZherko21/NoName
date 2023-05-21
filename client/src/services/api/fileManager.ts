import { Folder } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/folders'

export const get = async () => await fetch.get<Folder[]>(`${ENDPOINT_BASE}`)

export const getById = async (id: number) => await fetch.get<Folder>(`${ENDPOINT_BASE}/${id}`)

export const editFolder = async ({ id, folder }: { id: number; folder: Folder }) =>
  await fetch.put<Folder>(`${ENDPOINT_BASE}/${id}`, folder)

export const deleteFolder = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)
