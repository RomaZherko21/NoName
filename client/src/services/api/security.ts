import fetch from './fetch'

const ENDPOINT_BASE = '/security'

export const sendEmailVerificationCode = () => fetch.put(`${ENDPOINT_BASE}/email`)

export const verifyEmailVerificationCode = (code: string) =>
  fetch.post(`${ENDPOINT_BASE}/email`, { code })

export const toggleEmailAlerts = () => fetch.put(`${ENDPOINT_BASE}/email/alerts`)

export const sendPhoneVerificationCode = () => fetch.put(`${ENDPOINT_BASE}/phone`)

export const verifyPhoneVerificationCode = (code: string) =>
  fetch.post(`${ENDPOINT_BASE}/phone`, { code })

export const toggleSmsAlerts = () => fetch.put(`${ENDPOINT_BASE}/phone/alerts`)

export const getQrCode = () =>
  fetch.get<{
    qrCodeUrl: string
    secret: string
  }>(`${ENDPOINT_BASE}/qr`)

export const verifyQrCode = (code: string) => fetch.put(`${ENDPOINT_BASE}/qr`, { token: code })