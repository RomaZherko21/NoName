import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { RootStore } from 'stores'
class MetaModel {
  readonly rootStore: typeof RootStore

  kanbanBoards: { id: number; name: string }[] = []

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  async init() {
    try {
      this.rootStore.loading.begin()

      const data = await API.meta.getMeta()

      this.kanbanBoards = data.kanban_boards
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }
}

export default MetaModel
