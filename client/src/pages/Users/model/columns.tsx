import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import i18next from 'i18next'
import { Avatar, Box, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ManIcon from '@mui/icons-material/Man'
import WomanIcon from '@mui/icons-material/Woman'

import { useDialog } from 'shared/hooks'
import { TableColumn, Roles, User, Gender } from 'shared/types'
import { getFullName, getInitials, reformatDates } from 'shared/helpers'

import UsersModel from './Users.model'
import { UserForm, DeleteUserDialog } from '../ui'

const ActionButtons = observer(({ user }: { user: User }) => {
  const { t } = useTranslation()

  const [showUpdateUserModal] = useDialog('user:form.updateUser', (hideModal) => (
    <UserForm
      user={user}
      onSubmit={(value: User) => {
        UsersModel.update(value)
        hideModal()
      }}
    />
  ))

  const removeUser = useCallback(() => user.id && UsersModel.remove(user.id), [user.id])

  const [showConfirmationModal] = useDialog(
    'notification:removeConfirm',
    (onClose) => <DeleteUserDialog onSubmit={removeUser} onClose={onClose} />,
    true
  )

  return (
    <>
      <Tooltip title={t('actions.edit') || 'edit'} placement="top">
        <IconButton aria-label="edit" size="small" onClick={showUpdateUserModal}>
          <EditOutlinedIcon color="secondary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.delete') || 'delete'} placement="top">
        <IconButton aria-label="delete" size="small" onClick={showConfirmationModal}>
          <DeleteIcon color="error" fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'id',
    title: 'id',
  },
  {
    key: 'name',
    title: i18next.t('user:name'),
    getValue: ({ name, surname, middle_name, avatar }: User) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar src={`http://localhost/api/uploads/avatar/${avatar}`} sx={{ mr: 2 }}>
          {getInitials(`${name} ${surname}`)}
        </Avatar>
        <Typography color="textPrimary" variant="body1">
          {getFullName(name, middle_name, surname)}
        </Typography>
      </Box>
    ),
  },
  {
    key: 'email',
    title: i18next.t('user:email'),
  },
  {
    key: 'gender',
    title: i18next.t('user:gender'),
    // getValue: (row: User) => i18next.t(`user:${row.gender}`),
    getValue: (row: User) =>
      row.gender === Gender.man ? (
        <Chip label={row.gender} icon={<ManIcon />} color="primary" />
      ) : (
        <Chip label={row.gender} icon={<WomanIcon />} color="primary" />
      ),
  },
  {
    key: 'date_of_birth',
    title: i18next.t('user:dateOfBirth'),
    getValue: (row: User) => reformatDates(row.date_of_birth || ''),
  },
  {
    key: 'tel_number',
    title: i18next.t('user:telephoneNumber'),
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
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: User) => <ActionButtons user={row} />,
  },
]
