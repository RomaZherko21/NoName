import qs from 'qs'

export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('')

export const getFullName = (name = '', surname = '', middleName = '') =>
  middleName ? `${name} ${middleName} ${surname}` : `${name} ${surname}`

export const getQueryParams = (obj: any): string => {
  let result: any = {}

  Object.entries(obj).forEach(([key, value]: any) => {
    if (value || value > 0) {
      result[key] = value
    }
  })

  return qs.stringify(result, { addQueryPrefix: true, arrayFormat: 'repeat' })
}
