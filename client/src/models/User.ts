import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { RootStore } from 'stores'
import { API } from 'services'
import {
  Gender,
  Roles,
  User,
  BasicUserInfo,
  MetaUserInfo,
  UserCredentials,
  CreditCard
} from 'shared/types'

import FileModel from './File'
import PermissionsModel from './Permissions'

class UserModel {
  readonly rootStore: typeof RootStore

  permissions: PermissionsModel

  id: number = 0
  name: string = ''
  surname: string = ''
  middle_name: string = ''

  tel_number: string = ''
  gender: Gender = Gender.man
  date_of_birth: string = ''
  email: string = ''
  avatar: FileModel
  role: Roles = Roles.user
  job_title: string = ''

  native_country: string = ''
  native_city: string = ''
  residence_country: string = ''
  residence_city: string = ''

  card_number: string = ''
  name_on_card: string = ''
  valid_thru: string = ''
  cvv: string = ''

  is_email_verified: boolean = false
  is_phone_verified: boolean = false

  is_two_factor_auth_active: boolean = false
  is_sms_alerts_active: boolean = false
  is_email_alerts_active: boolean = false

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.permissions = new PermissionsModel()
    this.avatar = new FileModel()

    this.init()
  }

  isAuthorizedUser(id: number) {
    return this.id === id
  }

  async init() {
    try {
      this.rootStore.loading.begin()

      const user = await API.user.get()

      await this.permissions.init()

      this.fromJSON(user)

      this.rootStore.authorization.isAuthorized = true
    } catch (err: any) {
      console.log(err)
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }

  async fetch({ hidden = false }: { hidden?: boolean }) {
    try {
      if (!hidden) {
        this.rootStore.loading.begin()
      }

      const user = await API.user.get()

      this.fromJSON(user)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.reset()
    }
  }

  async uploadPhoto(file: File) {
    try {
      this.rootStore.loading.begin()

      const { url } = await API.user.uploadPhoto(file)

      this.avatar.setFileData(file, url)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }

  async update(values: BasicUserInfo & MetaUserInfo & UserCredentials) {
    try {
      this.rootStore.loading.begin()

      await API.user.update(values)

      await this.fetch({})
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }

  async remove() {
    try {
      this.rootStore.loading.begin()

      await API.user.remove()

      this.rootStore.authorization.unauthorize()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }

  async toggleEmailAlerts() {
    try {
      await API.security.toggleEmailAlerts()

      this.fetch({ hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async toggleSmsAlerts() {
    try {
      await API.security.toggleSmsAlerts()

      this.fetch({ hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  private fromJSON(user: User) {
    this.id = user.basic.id ?? 0
    this.name = user.basic.name
    this.surname = user.basic.surname
    this.middle_name = user.basic.middle_name
    this.tel_number = user.basic.tel_number ?? ''
    this.email = user.basic.email
    this.role = user.basic.role

    this.date_of_birth = user.meta.date_of_birth ?? ''
    this.gender = user.meta.gender ?? Gender.man
    this.avatar.url = user.meta.avatar ?? ''
    this.job_title = user.meta.job_title = ''

    this.native_country = user.place.native_country ?? ''
    this.native_city = user.place.native_city ?? ''
    this.residence_country = user.place.residence_country ?? ''
    this.residence_city = user.place.residence_city ?? ''

    this.card_number = user.credit_card.card_number ?? ''
    this.name_on_card = user.credit_card.name_on_card ?? ''
    this.valid_thru = user.credit_card.valid_thru ?? ''
    this.cvv = user.credit_card.cvv ?? ''

    this.is_email_verified = user.security.is_email_verified
    this.is_phone_verified = user.security.is_phone_verified

    this.is_two_factor_auth_active = user.security.is_two_factor_auth_active
    this.is_sms_alerts_active = user.security.is_sms_alerts_active
    this.is_email_alerts_active = user.security.is_email_alerts_active
  }
}

export default UserModel
