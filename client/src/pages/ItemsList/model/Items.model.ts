import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { TItem } from 'shared/types'

class ItemsModel {
  private _items: TItem[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set items(data: TItem[]) {
    this._items = data
  }

  get items() {
    return this._items
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await API.item.list(this.pagination.perPage, this.pagination.offset)

      this.items = data.items
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(item: { name: string; description: string; item: File | ''; userId: number }) {
    try {
      this.loading.begin()

      const createdAt = Date.now()

      await API.item.create({ ...item, createdAt })
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await API.item.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new ItemsModel()
