import fetch from 'services/fetch'

export const signIn = (email: string, password: string) =>
  fetch.post('/auth/login', { email, password })

export const signUp = (email: string, password: string) =>
  fetch.post('/auth/login', { email, password })
