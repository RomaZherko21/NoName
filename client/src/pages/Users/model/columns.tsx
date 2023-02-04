import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import i18next from 'i18next'
import { Box, Chip, IconButton, Tooltip } from '@mui/material'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { useDialog } from 'shared/hooks'
import { InformativeImage } from 'shared/ui'
import { TableColumn, Roles, User, Gender } from 'shared/types'
import { NODE_API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { getFullName, getInitials, reformatDates } from 'shared/helpers'

import UsersModel from './Users.model'
import { UserForm, DeleteUserDialog, ConnectionStatus } from '../ui'

const ActionButtons = observer(({ user: data }: { user: User }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [showUpdateUserModal] = useDialog('user:form.updateUser', (hideModal) => (
    <UserForm
      user={data}
      onSubmit={(value: User) => {
        if (data.id) {
          UsersModel.update(value, data.id)
          hideModal()
        }
      }}
    />
  ))

  const removeUser = useCallback(() => data.id && UsersModel.remove(data.id), [data.id])

  const [showConfirmationModal] = useDialog(
    'notification:removeConfirm',
    (onClose) => <DeleteUserDialog onSubmit={removeUser} onClose={onClose} />,
    true
  )

  return (
    <>
      <Tooltip title={t('actions.edit') || 'edit'} placement="top">
        <IconButton
          aria-label="edit"
          size="small"
          onClick={() => navigate(generatePath(ROUTES.USERS_EDIT, { id: String(data.id) }))}
        >
          <EditOutlinedIcon sx={{ color: 'grey.500' }} fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.delete') || 'delete'} placement="top">
        <IconButton aria-label="delete" size="small" onClick={showConfirmationModal}>
          <DeleteOutlinedIcon sx={{ color: 'grey.500' }} fontSize="medium" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'name',
    title: i18next.t('user:name'),
    getValue: ({ name, surname, middle_name, email, avatar }: User) => (
      <InformativeImage
        imgUrl={`${NODE_API_USER_AVATAR_URL}/${avatar}`}
        imgPlaceholder={getInitials(`${name} ${surname}`)}
        PrimaryText={getFullName(name, surname, middle_name)}
        SecondaryText={email}
      />
    ),
  },
  {
    key: 'role',
    title: i18next.t('user:role'),
    getValue: (row: User) =>
      row.role === Roles.admin ? (
        <Chip
          label={row.role}
          icon={<AdminPanelSettingsOutlinedIcon fontSize="small" />}
          color="primary"
        />
      ) : (
        <Chip
          label={row.role}
          icon={<AccountCircleOutlinedIcon fontSize="small" />}
          color="secondary"
        />
      ),
  },
  {
    key: 'date_of_birth',
    title: i18next.t('user:dateOfBirth'),
    getValue: (row: User) => (
      <Box color="text.primary">{reformatDates(row.date_of_birth || '')}</Box>
    ),
  },
  {
    key: 'tel_number',
    title: i18next.t('user:telephoneNumber'),
  },
  {
    key: 'gender',
    title: i18next.t('user:gender'),
    // getValue: (row: User) => i18next.t(`user:${row.gender}`),
    getValue: (row: User) => (
      <Box color="text.primary">
        {row.gender === Gender.man ? i18next.t('user:man') : i18next.t('user:woman')}
      </Box>
    ),
  },
  {
    key: 'friends',
    title: i18next.t('user:friends'),
    getValue: (row: User) => <ConnectionStatus user={row} />,
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: User) => <ActionButtons user={row} />,
  },
]
