import nodemailer from 'nodemailer'

const { SERVER_HOST, SERVER_EMAIL_LOGIN, SERVER_EMAIL_PASSWORD } = process.env

const emailTransporter = nodemailer.createTransport({
  host: SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SERVER_EMAIL_LOGIN,
    pass: SERVER_EMAIL_PASSWORD,
  },
})

export { emailTransporter }
