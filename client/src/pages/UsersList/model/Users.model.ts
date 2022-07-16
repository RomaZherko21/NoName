import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import { TUserMeta } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class UsersModel {
  private _users: TUserMeta[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set users(data: TUserMeta[]) {
    this._users = data
  }

  get users() {
    return this._users
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await API.user.list(this.pagination.perPage, this.pagination.offset)
      this.users = data.users
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(user: TUserMeta) {
    try {
      this.loading.begin()

      await API.user.create(user)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await API.user.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async update(user: TUserMeta) {
    try {
      this.loading.begin()

      await API.user.update(user)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new UsersModel()
