import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { TRoles } from 'constants/index'
import { RootStore } from 'stores/Root'

class UserModel {
  readonly rootStore: RootStore

  id: number = 0

  name: string = ''

  surname: string = ''

  email: string = ''

  avatar: string = ''

  role: TRoles = TRoles.user

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  async init() {
    const { id, name, surname, email, role, avatar } = await api.user.self()

    this.rootStore.authorization.isAuthorized = true

    this.id = id || 0
    this.name = name
    this.surname = surname
    this.avatar = avatar || ''
    this.email = email
    this.role = role
  }

  async uploadPhoto(file: any) {
    const data = await api.user.uploadPhoto(file)
    console.log(data)
  }
}

export default UserModel
