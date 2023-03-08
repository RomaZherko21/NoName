import { debounce } from '@mui/material'
import { toast } from 'react-toastify'
import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import {
  ConnectionStatus,
  QueryPaginationParams,
  QuerySortParams,
  BasicUserInfo,
  MetaUserInfo,
} from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

import { UserFilters } from './filters'

type SearchParams = UserFilters & QuerySortParams & QueryPaginationParams

export type User = BasicUserInfo & MetaUserInfo & { connection_status?: ConnectionStatus | null }

class UsersModel {
  users: User[] = []

  pagination: PaginationModel
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.users = []
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

  async connectionRequest(id: number) {
    try {
      await API.connections.update(id, ConnectionStatus.pending)

      this.fetch({ hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }
}

const model = new UsersModel()

export default model
