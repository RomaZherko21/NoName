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

  messages = [
    {
      message_id: 1,
      isCurrentUser: false,
      message:
        'Hey, nice projects! I really liked the one in react. Whats your quote on kinda similar project?',
      received_at: 1231231232,
      user_name: 'Miron',
      user_surname: 'Vitold',
    },
    {
      message_id: 2,
      isCurrentUser: true,
      message: 'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
      received_at: 1231231239,
      user_name: 'Ben',
      user_surname: 'Yes',
    },
    {
      message_id: 3,
      isCurrentUser: false,
      message: 'Well its a really easy one, Im sure we can make it half of the price.',
      received_at: 1231231259,
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
