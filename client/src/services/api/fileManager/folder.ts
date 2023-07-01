import { Folder } from 'shared/types'

import fetch from '../fetch'

const ENDPOINT_BASE = '/folders'

export const getFolders = async () => await fetch.get<Folder[]>(`${ENDPOINT_BASE}`)

export const getFolderById = async (id: number) => await fetch.get<Folder>(`${ENDPOINT_BASE}/${id}`)

export const editFolder = async (id: number, folder: { name?: string }) =>
  await fetch.put(`${ENDPOINT_BASE}/${id}`, folder)

export const deleteFolder = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const deleteTag = async (foderId: number, id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/${foderId}/folders_tags/${id}`)

export const createTag = async (tag: string) =>
  await fetch.post(`${ENDPOINT_BASE}/folders_tags`, tag)
