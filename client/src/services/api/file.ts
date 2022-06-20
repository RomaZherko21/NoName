import { fetch } from 'services'

export const getFile = (url: string) => {
  return fetch.get<Blob | null>(`/uploads/${url}`)
}
