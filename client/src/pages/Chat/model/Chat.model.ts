import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { debounce } from '@mui/material'

import { API } from 'services'
import LoadingModel from 'models/Loading'
import { BasicUserInfo, Message, MetaUserInfo } from 'shared/types'

interface UserFilters {
  name?: string
}

interface Chat {
  id: number
  name: string

  user_name: string
  user_surname: string
  user_avatar: string
  last_message: string
  updated_at: number
}

class ChatModel {
  chat_id?: number

  users: (BasicUserInfo & MetaUserInfo)[] = []

  chats: Chat[] = []

  messages: Message[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.users = []
  }

  async fetchChats() {
    try {
      this.loading.begin()

      const data = await API.chat.getUserChats()

      this.fetchChatMessages(1)

      this.chats = data
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async fetchChatMessages(chatId: number) {
    try {
      this.loading.begin()

      const messages = await API.chat.getChatMessages(chatId)

      this.chat_id = chatId

      this.messages = messages || []
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
}

export default new ChatModel()
