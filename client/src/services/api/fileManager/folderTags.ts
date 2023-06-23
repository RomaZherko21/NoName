
import fetch from '../fetch'

const ENDPOINT_BASE = '/folders'



export const deleteTag = async (id: number) => await fetch.delete(`${ENDPOINT_BASE}/folders_tags/${id}`)


