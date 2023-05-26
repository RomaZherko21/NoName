import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { debounce } from '@mui/material'

import { File } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class FilesModel {
  files: File[] = []

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
