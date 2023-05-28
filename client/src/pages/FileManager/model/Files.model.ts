import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { File, Folder } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { API } from 'services'

class FilesModel {
  files: File[] = []

  folders: Folder[] = []

  folder?: Folder

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  cleanModel() {
    this.files = []
  }

  toggleFavourite(name: string) {
    console.log('toggleFavourite request', name)
  }

  deleteFile(id: number) {
    console.log('deleteFile request', id)
  }

  deleteTag(id: number) {
    console.log('deleteTag request', id)
  }

  async fetch({ hidden = false }: { hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.fileManager.getFolders()

      this.folders = data
      // this.pagination.totalCount = data.count

      this.loading.reset()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async fetchFolder({ id, hidden = false }: { id: number; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.fileManager.getFolderById(id)

      this.folder = data

      this.loading.reset()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async fetchDeleteFolder({ id }: { id: number }) {
    try {
      // if (!hidden) {
      //   this.loading.begin()
      // }
      await API.fileManager.deleteFolder(id)
      this.fetch({ hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
    // finally {}
  }
}

const model = new FilesModel()

export default model
