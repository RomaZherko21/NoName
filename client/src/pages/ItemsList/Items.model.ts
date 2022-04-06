import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { Item } from 'types/item'

class ItemsModel {
  private _items: Item[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set users(data: Item[]) {
    this._items = data
  }

  get users() {
    return this._items
  }

  async create(item: Item) {
    this.loading.begin()

    await api.item.create(item)

    this.loading.end()
  }
}

export default new ItemsModel()
