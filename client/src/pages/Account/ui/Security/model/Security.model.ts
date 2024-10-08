import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import PaginationModel from 'models/Pagination'
import { API } from 'services'

class SecurityModel {
  qrCodeUrl: string = ''
  qrCodeSecret: string = ''

  entrances: any = [
    {
      login_type: 'Credential login',
      date: '14:36 PM 02/08/2023',
      ip_address: '95.130.17.84',
      client: 'Chrome, Mac OS 10.15.7'
    },
    {
      login_type: 'Credential login',
      date: '12:16 PM 02/08/2023',
      ip_address: '95.130.17.84',
      client: 'Chrome, Mac OS 10.15.7'
    }
  ]

  loading: LoadingModel
  pagination: PaginationModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
    this.pagination = new PaginationModel()
  }

  async getQRCode() {
    try {
      const data = await API.security.getQrCode()

      this.qrCodeUrl = data.qrCodeUrl
      this.qrCodeSecret = data.secret
    } catch (err: any) {
      toast.error(err)
    }
  }

  async verifyQrCode(code: string) {
    try {
      await API.security.verifyQrCode(code)
    } catch (err: any) {
      toast.error(err)
    }
  }
}

const model = new SecurityModel()

export default model
