export type User = UserBasic & UserMeta & UserPassword & CreditCard

export interface UserBasic {
  id?: number
  name: string
  surname: string
  middle_name: string
  email: string
  role: Roles
}

export interface UserMeta {
  date_of_birth?: string
  tel_number?: string
  gender?: Gender
  avatar?: string
  job_title?: string
  connection_status?: ConnectionStatus | null

  native_country?: string
  native_city?: string
  residence_country?: string
  residence_city?: string
}

export interface UserPassword {
  password?: string
  confirmPassword?: string
}

export interface CreditCard {
  card_number?: string
  name_on_card?: string
  valid_thru?: string
  cvv?: string
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
