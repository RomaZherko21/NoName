import { makeAutoObservable } from 'mobx'

class FileModel {
  private _file: Blob | null = null

  private _url: string = ''

  private _name: string = ''

  private _size: number = 0

  private _type: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  get file() {
    return this._file
  }

  set file(file: Blob | null) {
    this._file = file
  }

  get url() {
    return this._url
  }

  set url(url: string) {
    this._url = url
  }

  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get size() {
    return this._size
  }

  set size(size: number) {
    this._size = size
  }

  get type() {
    return this._url
  }

  set type(type: string) {
    this._type = type
  }

  setFileData(file: File, url: string) {
    this.url = url
    this.name = file.name
    this.size = file.size
    this.type = file.type
  }
}

export default FileModel
