import fetch from 'services/fetch'

export const getFile = (url: string) => {
  return fetch.get<Blob | null>(`/uploads/${url}`)
}
