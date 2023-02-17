import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { debounce } from '@mui/material'

import { QueryPaginationParams, QuerySortParams, File } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

type SearchParams = QuerySortParams & QueryPaginationParams

class FilesModel {
  files: File[] = [
    {
      id: 0,
      name: 'AWS Credentials',
      type: 'folder',
      size: '503.9 MB',
      count: 12,
      created_at: 'Feb 13, 2023',
      is_favourite: false,
    },
    {
      id: 1,
      name: ' Credentials 22',
      type: 'folder',
      size: '403.9 MB',
      count: 9,
      created_at: 'Feb 13, 2023',
      is_favourite: false,
    },
    {
      id: 2,
      name: 'AWS',
      type: 'folder',
      size: '303.9 MB',
      count: 11,
      created_at: 'Feb 13, 2023',
      is_favourite: true,
    },
  ]

  pagination: PaginationModel
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  cleanModel() {
    // this.files = []
  }

  toggleFavourite(id: number) {
    console.log('toggleFavourite request')
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ searchParams, hidden = false }: { searchParams?: SearchParams; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      // const data = await API.posts.list({
      //   searchParams,
      // })

      // this.files = data.posts
      // this.pagination.totalCount = data.count

      this.loading.reset()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
}

export default new FilesModel()
