import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import { API_URL } from 'shared/consts'
import { Gender, Roles, User } from 'shared/types'
import { RootStore } from 'stores'

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

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.avatar = new FileModel()
    this.init()
  }

  async init() {
    const {
      id = 0,
      name,
      surname,
      middle_name,
      email,
      gender = Gender.man,
      tel_number = '',
      date_of_birth = '',
      role,
      avatar = '',
    } = await API.user.self()

    this.rootStore.authorization.isAuthorized = true

    this.id = id
    this.name = name
    this.surname = surname
    this.middle_name = middle_name
    this.date_of_birth = date_of_birth
    this.tel_number = tel_number
    this.gender = gender
    this.email = email
    this.role = role
    this.avatar.url = avatar
  }

  getPhotoUrl() {
    return `${API_URL}/uploads/avatar/${this.avatar.url}`
  }

  async uploadPhoto(file: File) {
    this.rootStore.loading.begin()
    try {
      const { url } = await API.user.uploadPhoto(file, this.id)
      this.avatar.setFileData(file, url)
      this.rootStore.loading.end()
    } catch {
      this.rootStore.loading.end()
    }
  }

  async selfUpdate(values: User) {
    this.rootStore.loading.begin()
    try {
      await API.user.selfUpdate(values)
      await this.init()
      this.rootStore.loading.end()
    } catch {
      this.rootStore.loading.end()
    }
  }
}

export default UserModel
