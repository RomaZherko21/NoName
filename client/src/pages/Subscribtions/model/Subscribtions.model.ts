import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import { Subscribtion } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class SubscribtionsModel {
  subscribtions: Subscribtion[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await GO_API.subscribtions.list()
      this.subscribtions = data.subscribtions

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async update(value: Subscribtion, id: number) {
    try {
      this.loading.begin()

      await GO_API.subscribtions.update(value, id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new SubscribtionsModel()
