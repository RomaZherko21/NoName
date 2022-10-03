import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import i18next from 'i18next'
import { Avatar, Box, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { useDialog } from 'shared/hooks'
import { TableColumn, TRoles, TUserMeta } from 'shared/types'
import { getInitials } from 'shared/helpers'

import UsersModel from './Users.model'
import { UpdateUserForm, DeleteUserDialog } from '../ui'

const ActionButtons = observer(({ user }: { user: TUserMeta }) => {
  const { t } = useTranslation()

  const [showUpdateUserModal] = useDialog('user:form.updateUser', (hideModal) => (
    <UpdateUserForm user={user} hideModal={hideModal} />
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
          <EditOutlinedIcon color="primary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.delete') || 'edit'} placement="top">
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
    getValue: (row: TUserMeta) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar src={`http://localhost/api/uploads/avatar/${row.avatar}`} sx={{ mr: 2 }}>
          {getInitials(`${row.name} ${row.surname}`)}
        </Avatar>
        <Typography color="textPrimary" variant="body1">
          {`${row.name} ${row.surname}`}
        </Typography>
      </Box>
    ),
  },
  {
    key: 'email',
    title: i18next.t('user:email'),
  },
  {
    key: 'role',
    title: i18next.t('user:role'),
    getValue: (row: TUserMeta) =>
      row.role === TRoles.admin ? (
        <Chip label={row.role} icon={<AdminPanelSettingsIcon />} color="primary" />
      ) : (
        <Chip label={row.role} icon={<AccountCircleIcon />} color="secondary" />
      ),
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: TUserMeta) => <ActionButtons user={row} />,
  },
]
