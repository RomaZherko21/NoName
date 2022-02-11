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
    const data: any = await api.user.list()
    console.log('HEHEHE', data)
    this.users = data
  }

  async create(user: User) {
    const data: any = await api.user.create(user)
    this.users = data
  }
}

export default new UserModel()
