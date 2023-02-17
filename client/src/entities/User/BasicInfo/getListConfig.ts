import { getFullName } from 'shared/helpers'
import { BasicUserInfo, MetaUserInfo, UserLocation } from 'shared/types'

export const getListConfig = (user: BasicUserInfo & MetaUserInfo & UserLocation) => [
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
