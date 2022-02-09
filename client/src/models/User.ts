import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'

class UserModel {
  readonly rootStore: RootStore

  id: number = 0

  email: string = ''

  role_id: number = 0

  name: string = ''

  surname: string = ''

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async init() {
    console.log('user INIt')
  }
}

export default UserModel
