import { makeAutoObservable } from 'mobx'
import { debounce } from '@mui/material'
import { toast } from 'react-toastify'

import { API } from 'services'
import { QueryPaginationParams, Post, QuerySortParams } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

import { PostsFilters } from './filters'

type SearchParams = PostsFilters & QuerySortParams & QueryPaginationParams

class PostsModel {
  posts: Post[] = []

  pagination: PaginationModel
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.posts = []
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams?: SearchParams; hidden?: boolean }) {
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
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async toggleLike(id: number, searchParams?: SearchParams) {
    try {
      await API.posts.like(id)

      this.fetch({ searchParams, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }
}

export default new PostsModel()
