import fetch from 'services/fetch'

export const get = (email: string, password: string) =>
  fetch.post('/user/get', { email, password })

export const create = (email: string, password: string) =>
  fetch.post('/user/create', { email, password })

export const list = (email: string, password: string) =>
  fetch.post('/user/list', { email, password })

export const self = (email: string, password: string) =>
  fetch.post('/user/self', { email, password })
