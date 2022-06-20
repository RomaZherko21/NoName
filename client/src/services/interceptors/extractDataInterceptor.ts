import { AxiosResponse } from 'axios'

export async function extractDataInterceptor<T>(
  response: AxiosResponse<T>
): Promise<T> {
  return response.data
}
