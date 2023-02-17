import fetch from './fetch'

const ENDPOINT_BASE = '/verification'

export const sendEmailVerificationCode = () => fetch.put(`${ENDPOINT_BASE}/email`)

export const verifyEmailVerificationCode = (code: string) =>
  fetch.post(`${ENDPOINT_BASE}/email`, { code })

export const sendPhoneVerificationCode = () => fetch.put(`${ENDPOINT_BASE}/phone`)

export const verifyPhoneVerificationCode = (code: string) =>
  fetch.post(`${ENDPOINT_BASE}/phone`, { code })
