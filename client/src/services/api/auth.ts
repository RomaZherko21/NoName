import fetch from 'services/fetch'

export const signIn = (email: string, password: string) =>
  fetch.post('/auth/signIn', { email, password })

export const signUp = (email: string, password: string) =>
  fetch.post('/auth/signUp', { email, password })
