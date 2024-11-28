import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link, NavigateFunction } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import i18next from 'i18next'
import { Box, Chip, IconButton, Tooltip } from '@mui/material'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'

import { InformativeImage } from 'shared/ui'
import { ConfirmDialog } from 'entities'
import { useRootStore } from 'stores'
import { TableColumn, Roles, Gender } from 'shared/types'
import { API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { getFullName, getInitials, reformatDates } from 'shared/helpers'

import UsersModel, { User } from './Users.model'
import { ConnectionStatus } from '../ui'

const ActionButtons = observer(({ user: data }: { user: User }) => {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const removeUser = useCallback(
    async () => await (data.id && UsersModel.remove(data.id)),
    [data.id]
  )

  return (
    <>
      {user.permissions.updateUsers && (
        <Tooltip title={t('actions.edit') ?? 'edit'} placement="top">
          <IconButton
            component={Link}
            to={generatePath(ROUTES.USERS_EDIT, { id: String(data.id) })}
            aria-label="edit"
            size="small"
          >
            <EditOutlinedIcon sx={{ color: 'grey.500' }} fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('page:userProfile') ?? 'User profile'} placement="top">
        <IconButton
          component={Link}
          to={generatePath(ROUTES.USERS_PROFILE, { id: String(data.id) })}
          size="small"
        >
          <ArrowForwardOutlinedIcon sx={{ color: 'grey.500' }} fontSize="medium" />
        </IconButton>
      </Tooltip>
      {user.permissions.deleteUsers && (
        <Tooltip title={t('actions.delete') ?? 'delete'} placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setIsOpenModal(true)
            }}
          >
            <DeleteOutlinedIcon sx={{ color: 'grey.500' }} fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}

      <ConfirmDialog
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false)
        }}
        onDelete={removeUser}
      />
    </>
  )
})

export const getColumns = (navigate: NavigateFunction): TableColumn[] => [
  {
    key: 'name',
    title: i18next.t('user:name'),
    getValue: ({ name, surname, middle_name: middleName, email, avatar, id }: User) => (
      <InformativeImage
        onClick={() => navigate(generatePath(ROUTES.USERS_PROFILE, { id: String(id) }))}
        imgUrl={`${API_USER_AVATAR_URL}/${avatar}`}
        imgPlaceholder={getInitials(`${name} ${surname}`)}
        PrimaryText={getFullName(name, surname, middleName)}
        SecondaryText={email}
      />
    )
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
      )
  },
  {
    key: 'date_of_birth',
    title: i18next.t('user:dateOfBirth'),
    getValue: (row: User) => (
      <Box color="text.primary">{reformatDates(row.date_of_birth ?? '')}</Box>
    )
  },
  {
    key: 'tel_number',
    title: i18next.t('user:telephoneNumber')
  },
  {
    key: 'gender',
    title: i18next.t('user:gender'),
    getValue: (row: User) => (
      <Box color="text.primary">
        {row.gender === Gender.man ? i18next.t('user:man') : i18next.t('user:woman')}
      </Box>
    )
  },
  {
    key: 'friends',
    title: i18next.t('user:friends'),
    getValue: (row: User) => <ConnectionStatus user={row} />
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: User) => <ActionButtons user={row} />
  }
]
