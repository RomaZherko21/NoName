import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { debounce } from '@mui/material'

import { File } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

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
      tags: ['Business', 'Work']
    },
    {
      id: 1,
      name: ' Credentials 22',
      type: 'folder',
      size: '403.9 MB',
      count: 9,
      created_at: 'Feb 13, 2023',
      is_favourite: false,
      tags: ['Friends', 'Personal']
    },
    {
      id: 2,
      name: 'AWS',
      type: 'folder',
      size: '303.9 MB',
      count: 11,
      created_at: 'Feb 13, 2023',
      is_favourite: true,
      tags: ['Homework', 'Holiday']
    }
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
    console.log('toggleFavourite request', id)
  }

  deleteFile(id: number) {
    console.log('deleteFile request', id)
  }

  deleteTag(id: number) {
    console.log('deleteTag request', id)
  }

  debounceFetch = debounce(this.fetch, 500)

  async fetch({ hidden = false }: { hidden?: boolean }) {
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

const model = new FilesModel()

export default model
