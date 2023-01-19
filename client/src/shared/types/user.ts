export interface User {
  id?: number
  name: string
  surname: string
  middle_name: string
  email: string
  password?: string
  role: Roles
  date_of_birth?: string
  tel_number?: string
  gender?: Gender
  confirmPassword?: string
  avatar?: string
}

export enum Roles {
  admin = 'admin',
  user = 'user',
}

export enum Gender {
  man = 'man',
  woman = 'woman',
}

export enum BillingStatus {
  startup = 'startup',
  standard = 'standard',
  business = 'business',
}

export enum ConnectionStatus {
  pending = 'pending',
  decline = 'decline',
  accept = 'accept',
}
