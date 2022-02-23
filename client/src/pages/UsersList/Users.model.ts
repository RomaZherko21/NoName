import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { User } from 'types/user'

class UserModel {
  users: User[] = []

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  async init() {
    const data = await api.user.list()
    this.users = data
  }

  async create(user: User) {
    await api.user.create(user)
  }
}

export default new UserModel()
