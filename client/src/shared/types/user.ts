export type User = {
  basic: BasicUserInfo
  meta: MetaUserInfo
  place: UserLocation
  credit_card: CreditCard
  security: UserSecurity
} & UserCredentials

export interface BasicUserInfo {
  id?: number
  name: string
  surname: string
  middle_name: string
  email: string
  tel_number?: string
  role: Roles
}

export interface MetaUserInfo {
  date_of_birth?: string
  gender?: Gender
  job_title?: string
  avatar?: string
  profile_background?: string
}

export interface UserLocation {
  native_country?: string
  native_city?: string
  residence_country?: string
  residence_city?: string
}

export interface UserSecurity {
  is_email_verified: boolean
  is_phone_verified: boolean

  is_two_factor_auth_active: boolean
  is_sms_alerts_active: boolean
  is_email_alerts_active: boolean
}

export interface UserCredentials {
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
  user = 'user'
}

export enum Gender {
  man = 'man',
  woman = 'woman'
}

export enum BillingStatus {
  startup = 'startup',
  standard = 'standard',
  business = 'business'
}

export enum ConnectionStatus {
  pending = 'pending',
  decline = 'decline',
  accept = 'accept'
}

export interface Entrances {
  login_type: string
  date: string
  ip_address: string
  client: string
}
