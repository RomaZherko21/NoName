import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import { ConnectionStatus, SortParams, User } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { debounce } from '@mui/material'

import { UserFilters } from './filters'

type SearchParams = UserFilters & SortParams
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

    this.fetch({})
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams?: SearchParams; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await NODE_API.users.list({
        limit: this.pagination.limit,
        offset: this.pagination.offset,
        searchParams,
      })
      this.users = data.users
      this.pagination.totalCount = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(user: User) {
    try {
      this.loading.begin()

      await NODE_API.users.create(user)
      this.fetch({})

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await NODE_API.users.remove(id)
      this.fetch({})

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async update(user: User, id: number) {
    try {
      this.loading.begin()

      await NODE_API.users.update(user, id)
      this.fetch({})

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new UsersModel()
