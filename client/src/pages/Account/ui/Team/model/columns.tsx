import i18next from 'i18next'
import { Chip } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Roles, TableColumn, BasicUserInfo, MetaUserInfo } from 'shared/types'
import { getFullName, getInitials } from 'shared/helpers'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { InformativeImage } from 'shared/ui'

export const getColumns = (): TableColumn[] => [
  {
    key: 'full_name',
    title: i18next.t('user:member'),
    getValue: ({ name, surname, middle_name, avatar }: BasicUserInfo & MetaUserInfo) => (
      <InformativeImage
        imgUrl={`${API_USER_AVATAR_URL}/${avatar}`}
        imgPlaceholder={getInitials(`${name} ${surname}`)}
        PrimaryText={getFullName(name, surname, middle_name)}
      />
    ),
  },
  {
    key: 'role',
    title: i18next.t('user:role'),
    getValue: (row: BasicUserInfo & MetaUserInfo) =>
      row.role === Roles.admin ? (
        <Chip label={row.role} icon={<AdminPanelSettingsIcon />} color="primary" />
      ) : (
        <Chip label={row.role} icon={<AccountCircleIcon />} color="secondary" />
      ),
  },
]
