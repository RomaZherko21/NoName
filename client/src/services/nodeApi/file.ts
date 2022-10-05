import fetch from './fetch'

export const getFile = (url: string) => {
  return fetch.get<Blob | null>(`/uploads/${url}`)
}
