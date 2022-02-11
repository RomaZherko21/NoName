import fetch from 'services/fetch'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = (email: string, password: string) =>
  fetch.post('/user/create', { email, password })

export const update = () => fetch.post('/user/update')

export const remove = () => fetch.delete('/user/delete')

export const list = () => fetch.get('/user/list')

export const self = (email: string, password: string) =>
  fetch.post('/user/self', { email, password })
