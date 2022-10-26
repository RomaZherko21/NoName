import { makeAutoObservable } from 'mobx'

class FileModel {
  file: Blob | null = null

  url: string = ''

  name: string = ''

  size: number = 0

  type: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setFileData(file: File, url: string) {
    this.url = url
    this.name = file.name
    this.size = file.size
    this.type = file.type
  }
}

export default FileModel
