import { TRoles } from 'consts'

export interface User {
  email: string
  password: string
}

export interface UserMeta extends User {
  id?: number
  name: string
  surname: string
  role: TRoles
  confirmPassword?: string
  avatar?: string
}
