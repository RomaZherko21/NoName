import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { User } from 'shared/types'
import LoadingModel from 'models/Loading'
import { debounce } from '@mui/material'

interface UserFilters {
  name?: string
}

class ChatModel {
  users: User[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.users = []
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams: UserFilters; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.users.list({
        searchParams,
      })

      this.users = data.users
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
}

export default new ChatModel()
