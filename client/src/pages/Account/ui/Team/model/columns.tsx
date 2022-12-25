import i18next from 'i18next'
import { Avatar, Box, Chip, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Roles, TableColumn, User } from 'shared/types'
import { getFullName, getInitials } from 'shared/helpers'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

export const getColumns = (): TableColumn[] => [
  {
    key: 'full_name',
    title: i18next.t('user:name'),
    getValue: ({ name, surname, middle_name, avatar }: User) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar src={`${NODE_API_USER_AVATAR_URL}/${avatar}`} sx={{ mr: 2 }}>
          {getInitials(`${name} ${surname}`)}
        </Avatar>
        <Typography color="textPrimary" variant="body1">
          {getFullName(name, surname, middle_name)}
        </Typography>
      </Box>
    ),
  },
  {
    key: 'role',
    title: i18next.t('user:role'),
    getValue: (row: User) =>
      row.role === Roles.admin ? (
        <Chip label={row.role} icon={<AdminPanelSettingsIcon />} color="primary" />
      ) : (
        <Chip label={row.role} icon={<AccountCircleIcon />} color="secondary" />
      ),
  },
]
