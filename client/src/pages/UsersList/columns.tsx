import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useDialog } from 'shared/hooks'
import { TableColumn, UserMeta } from 'shared/types'

import UpdateUserForm from './UpdateUserForm/UpdateUserForm'
import UsersModel from './Users.model'
import DeleteUserDialog from './DeleteUserDialog'

const ActionButtons = observer(({ user }: { user: UserMeta }) => {
  const { t } = useTranslation()

  const [showUpdateUserModal] = useDialog(
    'user:form.updateUser',
    (hideModal) => <UpdateUserForm user={user} hideModal={hideModal} />
  )

  const removeUser = useCallback(
    () => user.id && UsersModel.remove(user.id),
    [user.id]
  )

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
          onClick={showUpdateUserModal}
        >
          <EditOutlinedIcon color="primary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.delete') || 'edit'} placement="top">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={showConfirmationModal}
        >
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
  },
  {
    key: 'surname',
    title: i18next.t('user:surname'),
  },
  {
    key: 'email',
    title: i18next.t('user:email'),
  },
  {
    key: 'role',
    title: i18next.t('user:role'),
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: UserMeta) => <ActionButtons user={row} />,
  },
]
