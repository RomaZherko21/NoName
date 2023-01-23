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
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonIcon from '@mui/icons-material/Person'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'

import { useDialog } from 'shared/hooks'
import { TableColumn, Roles, User, Gender, ConnectionStatus } from 'shared/types'
import { getFullName, getInitials, reformatDates } from 'shared/helpers'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

import UsersModel from './Users.model'
import { UserForm, DeleteUserDialog } from '../ui'

const ActionButtons = observer(({ user }: { user: User }) => {
  const { t } = useTranslation()

  const [showUpdateUserModal] = useDialog('user:form.updateUser', (hideModal) => (
    <UserForm
      user={user}
      onSubmit={(value: User) => {
        if (user.id) {
          UsersModel.update(value, user.id)
          hideModal()
        }
      }}
    />
  ))

  const removeUser = useCallback(() => user.id && UsersModel.remove(user.id), [user.id])

  const [showConfirmationModal] = useDialog(
    'notification:removeConfirm',
    (onClose) => <DeleteUserDialog onSubmit={removeUser} onClose={onClose} />,
    true
  )

  function sentRequest() {
    if (user.id) {
      UsersModel.debounceConnectionRequest(user.id)
    }
  }

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
      {user.connection_status === null && (
        <Tooltip title={t('actions.sendRequest')} placement="top">
          <IconButton size="small" onClick={sentRequest}>
            <PersonAddIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      {user.connection_status === ConnectionStatus.accept && (
        <Tooltip title={t('common.yourFriend')} placement="top">
          <IconButton size="small">
            <PersonIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      {user.connection_status === ConnectionStatus.decline && (
        <Tooltip title={t('common.userCanceledRequest')} placement="top">
          <IconButton size="small">
            <PersonIcon fontSize="inherit" color="error" />
          </IconButton>
        </Tooltip>
      )}
      {user.connection_status === ConnectionStatus.pending && (
        <Tooltip title={t('common.requestPending')} placement="top">
          <IconButton size="small">
            <ScheduleSendIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
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
    getValue: (row: User) => (
      <Box
        sx={{
          backgroundColor: 'grey.800',
          width: 'fit-content',
          p: 1,
          borderRadius: 1,
          color: 'grey.300',
        }}
      >
        {reformatDates(row.date_of_birth || '')}
      </Box>
    ),
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
