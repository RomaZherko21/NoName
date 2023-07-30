import fetch from '../fetch'

const ENDPOINT_BASE = '/folders'

export const deleteTag = async (foderId: number, id: number) =>
  await fetch.delete(`${ENDPOINT_BASE}/${foderId}/folders_tags/${id}`)
