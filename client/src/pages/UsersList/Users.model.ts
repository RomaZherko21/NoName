import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { UserMeta } from 'types/user'
import PaginationModel from 'models/Pagination'

class UsersModel {
  users: UserMeta[] = []

  pagination: PaginationModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
  }

  async fetch() {
    const data = await api.user.list(
      this.pagination.perPage,
      this.pagination.offset
    )
    this.users = data.users
    this.pagination.count = data.count
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
