import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import { ConnectionStatus, User } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { debounce } from '@mui/material'

import { UserFilters } from './filters'

class UsersModel {
  private _users: User[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set users(data: User[]) {
    this._users = data
  }

  get users() {
    return this._users
  }

  async connectionRequest(id: number) {
    await NODE_API.connection.update(id, ConnectionStatus.pending)

    this.fetch()
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch(filters?: UserFilters) {
    try {
      this.loading.begin()

      const data = await NODE_API.users.list({
        limit: this.pagination.perPage,
        offset: this.pagination.offset,
        filters,
      })
      this.users = data.users
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(user: User) {
    try {
      this.loading.begin()

      await NODE_API.users.create(user)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await NODE_API.users.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async update(user: User, id: number) {
    try {
      this.loading.begin()

      await NODE_API.users.update(user, id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new UsersModel()
