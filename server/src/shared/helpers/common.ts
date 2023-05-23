import * as fs from 'fs'

export const generateRandomCode = (n: number = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  for (let i = 0; i < n; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

export const createNonExistFolder = (url: string) => {
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true })
  }
}
