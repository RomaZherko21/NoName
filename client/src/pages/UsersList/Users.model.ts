import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { User } from 'types/user'

class UserModel {
  users: User[] = []

  constructor() {
    makeAutoObservable(this)
  }

  async init() {
    const data: any = await api.user.list()
    this.users = data
  }
}

export default UserModel
