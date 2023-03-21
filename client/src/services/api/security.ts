import fetch from './fetch'

const ENDPOINT_BASE = '/security'

export const sendEmailVerificationCode = async () => await fetch.put(`${ENDPOINT_BASE}/email`)

export const verifyEmailVerificationCode = async (code: string) =>
  await fetch.post(`${ENDPOINT_BASE}/email`, { code })

export const toggleEmailAlerts = async () => await fetch.put(`${ENDPOINT_BASE}/email/alerts`)

export const sendPhoneVerificationCode = async () => await fetch.put(`${ENDPOINT_BASE}/phone`)

export const verifyPhoneVerificationCode = async (code: string) =>
  await fetch.post(`${ENDPOINT_BASE}/phone`, { code })

export const toggleSmsAlerts = async () => await fetch.put(`${ENDPOINT_BASE}/phone/alerts`)

export const getQrCode = async () =>
  await fetch.get<{
    qrCodeUrl: string
    secret: string
  }>(`${ENDPOINT_BASE}/qr`)

export const verifyQrCode = async (code: string) =>
  await fetch.put(`${ENDPOINT_BASE}/qr`, { token: code })
