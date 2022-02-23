export interface User {
  email: string
  password: string
}

export interface UserMeta extends User {
  id?: number
  role_id?: number
  name: string
  surname: string
  role: 'admin' | 'user'
  confirmPassword?: string
}
