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

  role: TRoles = TRoles.user

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  async init() {
    const { id, name, surname, email, role } = await api.user.self()

    this.rootStore.authorization.isAuthorized = true

    this.id = id || 0
    this.name = name
    this.surname = surname
    this.email = email
    this.role = role
  }
}

export default UserModel
