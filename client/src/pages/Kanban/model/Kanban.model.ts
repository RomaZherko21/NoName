import { makeAutoObservable } from 'mobx'

import LoadingModel from 'models/Loading'

class KanbanModel {
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }
}

export default new KanbanModel()
