import { AxiosResponse } from 'axios'

export default async function extractDataInterceptor<T>(
  response: AxiosResponse<T>
): Promise<T> {
  return response.data
}
