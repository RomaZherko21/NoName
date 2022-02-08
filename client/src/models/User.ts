import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'

class UserModel {
  readonly rootStore: RootStore

  id: number

  email: number

  role_id: number

  name: string

  surname: string

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async init() {
    console.log('user INIt')
  }
}

export default UserModel
