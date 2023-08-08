import {Tag} from 'shared/types'
import fetch from '../fetch'

const ENDPOINT_BASE = '/file-manager'


export const addTag = async (tag: {name: string}) =>
    await fetch.post(`${ENDPOINT_BASE}/tags`, tag)

export const getTags = async () => await fetch.get<Tag[]>(`${ENDPOINT_BASE}/tags`)