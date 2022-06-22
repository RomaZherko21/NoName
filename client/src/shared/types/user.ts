export enum TRoles {
  admin = 'admin',
  user = 'user',
  empty = '',
}

export interface TUser {
  email: string
  password: string
}

export interface TUserMeta extends TUser {
  id?: number
  name: string
  surname: string
  role: TRoles
  confirmPassword?: string
  avatar?: string
}
