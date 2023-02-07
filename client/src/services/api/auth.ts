import fetch from './fetch'

const ENDPOINT_BASE = '/auth'

export const signIn = (email: string, password: string) =>
  fetch.post<{ accessToken: string }>(`${ENDPOINT_BASE}/signIn`, { email, password })
