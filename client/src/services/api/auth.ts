import fetch from 'services/fetch'

export const signIn = (email: string, password: string) =>
  fetch.post('/auth/signIn', { email, password })
