import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'
import { SignInData, SignUpData } from 'types/auth'

class AuthorizationModel {
  readonly rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async signIn(value: SignInData) {
    api.auth.signIn(value.email, value.password)
  }

  async signUp(value: SignUpData) {
    api.auth.signUp(value.email, value.password)
  }
}

export default AuthorizationModel
