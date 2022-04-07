import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { Item } from 'types/item'
import rootStore from 'stores/Root'

class ItemsModel {
  private _items: Item[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set items(data: Item[]) {
    this._items = data
  }

  get items() {
    return this._items
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await api.item.list(
        this.pagination.perPage,
        this.pagination.offset,
        rootStore.user.id
      )

      this.items = data.items
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(item: Item) {
    try {
      this.loading.begin()

      await api.item.create(item)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new ItemsModel()
