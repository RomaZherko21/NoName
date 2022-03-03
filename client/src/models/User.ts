import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'

class UserModel {
  readonly rootStore: RootStore

  id: number = 0

  name: string = ''

  surname: string = ''

  email: string = ''

  role_id: number = 0

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async init() {
    const data = await api.user.self()

    this.id = data.id || 0
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.role_id = data.role_id || 0
  }
}

export default UserModel
