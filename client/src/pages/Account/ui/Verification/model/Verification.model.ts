import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import { API } from 'services'

export enum SendType {
  email = 'email',
  phone = 'phone'
}

class VerificationModel {
  isEmailVerified = false
  isPhoneVerified = false

  verificationType = SendType.email

  constructor() {
    makeAutoObservable(this)
  }

  async sendCode() {
    try {
      if (this.verificationType === SendType.email) {
        await API.security.sendEmailVerificationCode()
      }
      if (this.verificationType === SendType.phone) {
        await API.security.sendPhoneVerificationCode()
      }
    } catch (err: any) {
      toast.error(err)
    }
  }

  async verifyCode(code: string) {
    try {
      if (this.verificationType === SendType.email) {
        await API.security.verifyEmailVerificationCode(code)
        toast.success(i18next.t('user:updates.security.emailVerified'))
      }
      if (this.verificationType === SendType.phone) {
        await API.security.verifyPhoneVerificationCode(code)
        toast.success(i18next.t('user:updates.security.phoneVerified'))
      }
    } catch (err: any) {
      toast.error(err)
    }
  }
}

const model = new VerificationModel()

export default model
