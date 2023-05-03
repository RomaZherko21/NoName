import { Folder } from 'shared/types'
import fetch from './fetch'

const ENDPOINT_BASE = '/folders'

export const getFileManagerFolders = async () => await fetch.get<Folder[]>(`${ENDPOINT_BASE}`)
