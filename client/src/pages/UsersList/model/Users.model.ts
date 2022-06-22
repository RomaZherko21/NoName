import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import { UserMeta } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class UsersModel {
  private _users: UserMeta[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set users(data: UserMeta[]) {
    this._users = data
  }

  get users() {
    return this._users
  }

  async fetch() {
    this.loading.begin()

    const data = await API.user.list(
      this.pagination.perPage,
      this.pagination.offset
    )
    this.users = data.users
    this.pagination.count = data.count

    this.loading.end()
  }

  async create(user: UserMeta) {
    this.loading.begin()

    await API.user.create(user)
    this.fetch()

    this.loading.end()
  }

  async remove(id: number) {
    this.loading.begin()

    await API.user.remove(id)
    this.fetch()

    this.loading.end()
  }

  async update(user: UserMeta) {
    this.loading.begin()

    await API.user.update(user)
    this.fetch()

    this.loading.end()
  }
}

export default new UsersModel()
