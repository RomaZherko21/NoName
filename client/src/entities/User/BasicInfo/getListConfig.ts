import { getFullName } from 'shared/helpers'
import { UserBasic, UserMeta, UserPlace } from 'shared/types'

export const getListConfig = (user: UserBasic & UserMeta & UserPlace) => [
  { title: 'user:fullName', text: getFullName(user.name, user.surname, user.middle_name) },
  { title: 'user:email', text: user.email },
  { title: 'user:telephoneNumber', text: user.tel_number },
  { title: 'user:nativeLocation', text: `${user.native_country}, ${user.native_city}` },
  {
    title: 'user:residenceLocation',
    text: `${user.residence_country}, ${user.residence_city}`,
  },
  { title: 'user:jobTitle', text: user.job_title },
]
