import { Folder } from 'shared/types'

import fetch from '../fetch'

const ENDPOINT_BASE = '/folders'

export const getFolders = async () => await fetch.get<Folder[]>(`${ENDPOINT_BASE}`)

export const getFolderById = async (id: number) => await fetch.get<Folder>(`${ENDPOINT_BASE}/${id}`)

export const editFolder = async (id: number, folder: { name?: string }) =>
  await fetch.put(`${ENDPOINT_BASE}/${id}`, folder)

export const deleteFolder = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/${id}`)

export const getTagById = async (foderId: number, id: number) =>
  await fetch.get<[]>(`${ENDPOINT_BASE}/${foderId}/tags/${id}`)

export const deleteTag = async (foderId: number, tagId: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/${foderId}/tags/${tagId}`)

export const createTag = async (foderId: number, tagId: number, tag: string) =>
  await fetch.post(`${ENDPOINT_BASE}/${foderId}/tags/${tagId}`, tag)

export const getTags = async () => await fetch.get<[]>(`/file-manager/tags`)
