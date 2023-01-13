import { makeAutoObservable } from 'mobx'
import { debounce } from '@mui/material'

import { NODE_API } from 'services'
import { Post } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

import { PostsFilters } from './filters'

class PostsModel {
  private _posts: Post[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  changeFilters(filters: PostsFilters) {
    this.debounceFetch(filters)
  }

  debounceFetch = debounce(this.fetch, 500)

  set posts(data: Post[]) {
    this._posts = data
  }

  get posts() {
    return this._posts
  }

  async fetch(filters?: PostsFilters) {
    try {
      this.loading.begin()

      const data = await NODE_API.post.list({
        limit: this.pagination.perPage,
        offset: this.pagination.offset,
        filters,
      })

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

      await NODE_API.post.create({ ...post, created_at })
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await NODE_API.post.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new PostsModel()
