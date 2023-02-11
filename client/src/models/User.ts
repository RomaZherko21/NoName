import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { RootStore } from 'stores'
import { API } from 'services'
import { Gender, Roles, User } from 'shared/types'

import FileModel from './File'

class UserModel {
  readonly rootStore: typeof RootStore

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

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

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

      this.fromJSON(user)

      this.rootStore.authorization.isAuthorized = true
    } catch (err: any) {
      console.log(err)
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
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

  async update(values: User) {
    try {
      this.rootStore.loading.begin()

      await API.user.update(values)

      await this.init()
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

  private fromJSON(user: User) {
    this.id = user.id || 0
    this.name = user.name
    this.surname = user.surname
    this.middle_name = user.middle_name

    this.date_of_birth = user.date_of_birth || ''
    this.tel_number = user.tel_number || ''
    this.gender = user.gender || Gender.man
    this.email = user.email
    this.role = user.role
    this.avatar.url = user.avatar || ''
    this.job_title = user.job_title = ''

    this.native_country = user.native_country || ''
    this.native_city = user.native_city || ''
    this.residence_country = user.residence_country || ''
    this.residence_city = user.residence_city || ''

    this.card_number = user.card_number || ''
    this.name_on_card = user.name_on_card || ''
    this.valid_thru = user.valid_thru || ''
    this.cvv = user.cvv || ''
  }
}

export default UserModel
