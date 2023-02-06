import { makeAutoObservable } from 'mobx'
import { debounce } from '@mui/material'

import { API } from 'services'
import { QueryPaginationParams, Post, QuerySortParams } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

import { PostsFilters } from './filters'

type SearchParams = PostsFilters & QuerySortParams & QueryPaginationParams

class PostsModel {
  private _posts: Post[] = []

  pagination: PaginationModel
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  get posts() {
    return this._posts
  }

  set posts(data: Post[]) {
    this._posts = data
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams?: SearchParams; hidden?: boolean }) {
    console.log(searchParams)
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.posts.list({
        searchParams,
      })

      this.posts = data.posts
      this.pagination.totalCount = data.count

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  async create(post: { name: string; description: string; post: File | ''; user_id: number }) {
    try {
      this.loading.begin()

      const created_at = Date.now()

      await API.posts.create({ ...post, created_at })
      this.fetch({})

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      await API.posts.remove(id)
      this.fetch({})

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async toggleLike(id: number, searchParams?: SearchParams) {
    await API.posts.like(id)

    this.fetch({ searchParams, hidden: true })
  }
}

export default new PostsModel()
