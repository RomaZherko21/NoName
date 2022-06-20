import { fetch } from 'services'

export const signIn = (email: string, password: string) =>
  fetch.post<{ accessToken: string }>('/auth/signIn', { email, password })
