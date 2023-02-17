import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { debounce } from '@mui/material'

import { API } from 'services'
import LoadingModel from 'models/Loading'
import { BasicUserInfo, MetaUserInfo } from 'shared/types'

interface UserFilters {
  name?: string
}

class ChatModel {
  users: (BasicUserInfo & MetaUserInfo)[] = []

  loading: LoadingModel

  messages = [
    {
      id: 1,
      text: 'Hey, nice projects! I really liked the one in react. Whats your quote on kinda similar project?',
      created_at: 1231231232,
      user_id: 2,
      user_name: 'Miron',
      user_surname: 'Vitold',
    },
    {
      id: 2,
      text: 'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
      created_at: 1231231239,
      user_id: 1,
      user_name: 'Ben',
      user_surname: 'Yes',
    },
    {
      id: 3,
      text: 'Well its a really easy one, Im sure we can make it half of the price.',
      created_at: 1231231259,
      user_id: 2,
      user_name: 'Miron',
      user_surname: 'Vitold',
    },
  ]

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.users = []
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams }: { searchParams: UserFilters }) {
    try {
      this.loading.begin()

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
