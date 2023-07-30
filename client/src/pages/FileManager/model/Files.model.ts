import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { File, Folder } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { API } from 'services'

class FilesModel {
  files: File[] = []
  folders: Folder[] = []
  tags: { id: number; name: string }[] = []

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

      const data = await API.fileManagerFolder.getFolders()

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

      const data = await API.fileManagerFolder.getFolderById(id)

      this.folder = data
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async deleteFolder({ id }: { id: number }) {
    try {
      await API.fileManagerFolder.deleteFolder(id)
      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }

  async deleteTag(folderId: number, tagId: number) {
    try {
      await API.fileManager.deleteTag(folderId, tagId)

      this.fetchFolder({ id: folderId })
      this.fetch({})
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editFolderName(name: string) {
    try {
      this.loading.begin()

      if (this.folder?.id) {
        await API.fileManagerFolder.editFolder(this.folder.id, { name })

        this.fetch({})
        this.fetchFolder({ id: this.folder.id })
      }
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async addFolderTag(name: string, setError: Function, handleClose: Function){
    try {

      const allTags = await API.fileManagerTags.getTags()

      const sameTag = Boolean(allTags.find((tag)=>tag.name === name))

      if (sameTag) {
          setError(true)
        } else {
      await API.fileManagerTags.addTag({name: name})
      this.fetch({})
         handleClose()
        }
    } catch (err: any) {
      toast.error(err)
    }
  }
  async createTag(folderId: number, tagId: number) {
    try {
      await API.fileManager.createTag(folderId, tagId)
      if (this.folder) await this.fetchFolder({ id: this.folder.id })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async fetchTags() {
    try {
      const data = await API.fileManager.getTags()
      this.tags = data
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
}

const model = new FilesModel()

export default model
