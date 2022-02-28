import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { UserMeta } from 'types/user'

class UsersModel {
  users: UserMeta[] = []

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  async init() {
    const data = await api.user.list()
    this.users = data
  }

  async create(user: UserMeta) {
    await api.user.create(user)
  }

  async remove(id: number) {
    await api.user.remove(id)
  }

  async update(user: UserMeta) {
    await api.user.update(user)
  }
}

export default new UsersModel()
