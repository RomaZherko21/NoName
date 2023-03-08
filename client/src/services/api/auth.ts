import fetch from './fetch'

const ENDPOINT_BASE = '/auth'

export const signIn = async (email: string, password: string) =>
  await fetch.post<{ accessToken: string }>(`${ENDPOINT_BASE}/signIn`, { email, password })
