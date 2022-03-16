import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { UserMeta } from 'types/user'

class UsersModel {
  users: UserMeta[] = []

  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    const data = await api.user.list()
    this.users = data
  }

  async create(user: UserMeta) {
    await api.user.create(user)
    this.fetch()
  }

  async remove(id: number) {
    await api.user.remove(id)
    this.fetch()
  }

  async update(user: UserMeta) {
    await api.user.update(user)
    this.fetch()
  }
}

export default new UsersModel()
