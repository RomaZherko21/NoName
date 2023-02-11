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
  connection_status?: ConnectionStatus | null
}

export interface Connection {
  user_id: number
  name: string
  middle_name: string
  surname: string
  avatar: string
  email: string
  tel_number: string
  status: string
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

export interface Entrances {
  login_type: string
  date: string
  ip_address: string
  client: string
}
