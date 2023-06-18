import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { RootStore } from 'stores'
// import { MetaKanbanBoards } from 'shared/types'

import LoadingModel from './Loading'

class MetaModel {
  readonly rootStore: typeof RootStore
  boards: { text: string; to: string }[] = []

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  async init() {
    try {
      this.rootStore.loading.begin()

      const data = await API.kanban.getMetaBoards()
      console.log(data)
      this.boards = data.map((item) => ({
        text: item.name,
        to: `/kanban/${item.id}`
      }))
      console.log(this.boards)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }
}

export default MetaModel
