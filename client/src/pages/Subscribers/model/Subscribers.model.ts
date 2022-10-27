import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import { Subscriber } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class SubscribersModel {
  subscribers: Subscriber[] = []

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

      const data = await GO_API.subscribers.list()
      this.subscribers = data.subscribers

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(value: Subscriber) {
    try {
      this.loading.begin()

      await GO_API.subscribers.create(value)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await GO_API.subscribers.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async update(value: Subscriber, id: number) {
    try {
      this.loading.begin()

      await GO_API.subscribers.update(value, id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new SubscribersModel()
