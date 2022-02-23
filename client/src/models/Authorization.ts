import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'
import { User } from 'types/user'

class AuthorizationModel {
  readonly rootStore: RootStore

  isAuthorized: boolean = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async signIn(value: User) {
    await api.auth.signIn(value.email, value.password)
    this.isAuthorized = true
  }

  async unauthorize() {
    this.isAuthorized = false
  }
}

export default AuthorizationModel
