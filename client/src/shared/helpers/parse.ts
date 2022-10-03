export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('')

export const getFullName = (name = '', middleName = '', surname = '') =>
  `${name} ${middleName} ${surname}`
