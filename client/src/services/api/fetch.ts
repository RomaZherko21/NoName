import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { API_URL } from 'shared/consts'

import {
  extractDataInterceptor,
  setAuthInterceptor,
  unauthorizedInterceptor,
} from '../interceptors'

export interface FetchServiceConfig {
  apiUrl: string
  photoUrl: string
}

export class FetchService {
  private readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create()

    this.instance.interceptors.request.use(setAuthInterceptor)
    this.instance.interceptors.response.use(extractDataInterceptor)
    this.instance.interceptors.response.use(undefined, unauthorizedInterceptor)
    this.instance.defaults.baseURL = API_URL
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.post(url, data, config)
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.put(url, data, config)
  }

  public async patch<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.patch(url, config)
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.get(url, config)
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.instance.delete(url, config)
  }
}

const model = new FetchService()

export default model
