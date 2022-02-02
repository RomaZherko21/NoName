import fetch from 'services/fetch'

export const login = (email: string, password: string) =>
  fetch.post('/auth/login', { email, password })

export const login2 = (email: string, password: string) =>
  fetch.post('/auth/login', { email, password })
