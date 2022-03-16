import i18n from 'i18n'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { ROLES } from 'constants/roles'
import { useDialog } from 'hooks'
import { TableColumn } from 'types/common'
import { UserMeta } from 'types/user'

import UpdateUserForm from './UpdateUserForm/UpdateUserForm'
import UsersModel from './Users.model'

const ActionButtons = observer(({ user }: { user: UserMeta }) => {
  const { t } = useTranslation()

  const [showUpdateUserModal] = useDialog(
    'user:form.updateUser',
    (hideModal) => <UpdateUserForm user={user} hideModal={hideModal} />
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
          // eslint-disable-next-line
          onClick={() => UsersModel.remove(user.id || 0)}
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
    width: 100,
    align: 'right',
  },
  {
    key: 'name',
    title: i18n.t('user:name'),
    width: 100,
    align: 'right',
  },
  {
    key: 'surname',
    title: i18n.t('user:surname'),
    width: 100,
    align: 'right',
  },
  {
    key: 'email',
    title: i18n.t('user:email'),
    width: 100,
    align: 'right',
  },
  {
    key: 'role_id',
    title: i18n.t('user:role'),
    width: 100,
    align: 'right',
    getValue: (row) => ROLES[row.role_id],
  },
  {
    key: 'actions',
    title: i18n.t('common.actions'),
    width: 100,
    align: 'right',
    getValue: (row: any) => <ActionButtons user={row} />,
  },
]
