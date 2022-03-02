import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import extractDataInterceptor from './extractDataInterceptor'
import setAuthInterceptor from './setAuthInterceptor'
import unauthorizedInterceptor from './unauthorizedInterceptor'

export type FetchServiceConfig = {
  apiUrl: string
  photoUrl: string
}

export class FetchService {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create()

    this.instance.interceptors.request.use(setAuthInterceptor)
    this.instance.interceptors.response.use(extractDataInterceptor)
    this.instance.interceptors.response.use(undefined, unauthorizedInterceptor)
  }

  init() {
    this.instance.defaults.baseURL = 'http://localhost:5000'
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public patch<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, config)
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export default new FetchService()
