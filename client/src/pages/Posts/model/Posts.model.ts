import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { Post } from 'shared/types'

class PostsModel {
  private _posts: Post[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set posts(data: Post[]) {
    this._posts = data
  }

  get posts() {
    return this._posts
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await API.post.list(this.pagination.perPage, this.pagination.offset)

      this.posts = data.posts
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(post: { name: string; description: string; post: File | ''; user_id: number }) {
    try {
      this.loading.begin()

      const created_at = Date.now()

      await API.post.create({ ...post, created_at })
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await API.post.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new PostsModel()
