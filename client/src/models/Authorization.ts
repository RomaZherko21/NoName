import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'

class AuthorizationModel {
  readonly rootStore: RootStore

  name = ''

  password = ''

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async signIn() {
    console.log(this.name, this.password)
    api.auth.login(this.name, this.password)
  }

  async signUp(value: any) {
    console.log(this.name, this.password)
    api.auth.login(this.name, this.password)
  }
}

export default AuthorizationModel
