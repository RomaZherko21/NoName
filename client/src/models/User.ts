import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import { API_URL } from 'shared/consts'
import { TRoles } from 'shared/types'
import { RootStore } from 'stores'

import FileModel from './File'

class UserModel {
  readonly rootStore: typeof RootStore

  id: number = 0

  name: string = ''

  surname: string = ''

  email: string = ''

  avatar: FileModel

  role: TRoles = TRoles.user

  constructor(rootStore: typeof RootStore) {
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
    } = await API.user.self()

    this.rootStore.authorization.isAuthorized = true

    this.id = id || 0
    this.name = name
    this.surname = surname
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
}

export default UserModel
