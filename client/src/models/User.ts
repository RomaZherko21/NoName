import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { TRoles } from 'constants/index'
import { RootStore } from 'stores/Root'
import { API_URL } from 'constants/config'

import FileModel from './File'

class UserModel {
  readonly rootStore: RootStore

  id: number = 0

  name: string = ''

  surname: string = ''

  email: string = ''

  avatar: FileModel

  role: TRoles = TRoles.user

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.avatar = new FileModel()
    this.init()
  }

  async init() {
    const {
      id,
      name,
      surname,
      email,
      role,
      avatar = '',
    } = await api.user.self()

    this.rootStore.authorization.isAuthorized = true

    this.id = id || 0
    this.name = name
    this.surname = surname
    this.email = email
    this.role = role
    this.avatar.url = avatar
  }

  getPhotoUrl() {
    return `${API_URL}/uploads/${this.avatar.url}`
  }

  async uploadPhoto(file: File) {
    this.rootStore.loading.begin()

    const { url } = await api.user.uploadPhoto(file, this.id)

    this.rootStore.loading.end()

    this.avatar.setFileData(file, url)
  }
}

export default UserModel
