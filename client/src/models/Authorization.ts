import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'
import { SignInData, SignUpData } from 'types/auth'

class AuthorizationModel {
  readonly rootStore: RootStore

  isAuthorized: boolean = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async signIn(value: SignInData) {
    await api.auth.signIn(value.email, value.password)
    this.isAuthorized = true
  }

  async signUp(value: SignUpData) {
    api.auth.signUp(value.email, value.password)
  }

  async unauthorize() {
    this.isAuthorized = false
  }
}

export default AuthorizationModel
