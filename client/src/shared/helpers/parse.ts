import qs from 'qs'
import { User } from 'shared/types'

export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('')

export const getFullName = (name = '', surname = '', middleName = '') =>
  middleName ? `${name} ${middleName} ${surname}` : `${name} ${surname}`

export const getSplitName = (full_name: string, user?: User) => {
  const [firstName, middleName, lastName] = full_name.split(' ')

  return { name: firstName, middle_name: middleName, surname: lastName }
}

export const getQueryParams = (obj: any): string => {
  let result: any = {}

  Object.entries(obj).forEach(([key, value]: any) => {
    if (value || value > 0) {
      result[key] = value
    }
  })

  return qs.stringify(result, { addQueryPrefix: true, arrayFormat: 'repeat' })
}

export const getSearchParamsObj = (searchParams: URLSearchParams) => {
  const params: { [key: string]: string } = {}

  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}
