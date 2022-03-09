import fetch from 'services/fetch'

export const signIn = (email: string, password: string) =>
  fetch.post<{ accessToken: string }>('/auth/signIn', { email, password })
