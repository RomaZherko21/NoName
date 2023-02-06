import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { ConnectionStatus, QueryPaginationParams, QuerySortParams, User } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { debounce } from '@mui/material'

import { UserFilters } from './filters'

type SearchParams = UserFilters & QuerySortParams & QueryPaginationParams
class UsersModel {
  users: User[] = []

  pagination: PaginationModel
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams?: SearchParams; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.users.list({
        searchParams,
      })
      this.users = data.users
      this.pagination.totalCount = data.count
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async create(user: User) {
    try {
      this.loading.begin()

      await API.users.create(user)

      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await API.users.remove(id)

      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async update(user: User, id: number) {
    try {
      this.loading.begin()

      await API.users.update(user, id)

      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async connectionRequest(id: number) {
    try {
      await API.connections.update(id, ConnectionStatus.pending)

      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }
}

export default new UsersModel()
