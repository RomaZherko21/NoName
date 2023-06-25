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

  // deleteTag(id: number) {
  //   console.log('deleteTag request', id)
  // }

  async fetch({ hidden = false }: { hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.fileManager.getFolders()

      this.folders = data
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
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async deleteFolder({ id }: { id: number }) {
    try {
      await API.fileManager.deleteFolder(id)
      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }

  async deleteTag(id: number) {
    try {
      await API.fileManager.deleteTag(id)
      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editFolderName(name: string) {
    try {
      this.loading.begin()

      if (this.folder?.id) {
        await API.fileManager.editFolder(this.folder.id, { name })

        this.fetch({})
        this.fetchFolder({ id: this.folder.id })
      }
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createTag(tag: string) {
    try {
      await API.fileManager.createTag('bbb')

      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }
}

const model = new FilesModel()

export default model
