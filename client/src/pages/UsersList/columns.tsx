import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Tooltip } from '@mui/material'

import { ROLES } from 'constants/roles'
import { useDialog } from 'hooks'
import { TableColumn } from 'types/common'
import { UserMeta } from 'types/user'

import UpdateUserForm from './UpdateUserForm/UpdateUserForm'
import UsersModel from './Users.model'

const ActionButtons = (user: UserMeta) => {
  const [showUpdateUserModal] = useDialog('Update new user', (hideModal) => (
    <UpdateUserForm user={user} hideModal={hideModal} />
  ))

  return (
    <>
      <Tooltip title="edit" placement="top">
        <IconButton
          aria-label="edit"
          size="small"
          onClick={showUpdateUserModal}
        >
          <EditOutlinedIcon color="primary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete" placement="top">
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
}

export const getColumns = (): TableColumn[] => [
  {
    key: 'id',
    title: 'id',
    width: 100,
    align: 'right',
  },
  {
    key: 'name',
    title: 'name',
    width: 100,
    align: 'right',
  },
  {
    key: 'surname',
    title: 'surname',
    width: 100,
    align: 'right',
  },
  {
    key: 'email',
    title: 'email',
    width: 100,
    align: 'right',
  },
  {
    key: 'role_id',
    title: 'role',
    width: 100,
    align: 'right',
    getValue: (row) => ROLES[row.role_id],
  },
  {
    key: 'actions',
    title: 'action',
    width: 100,
    align: 'right',
    getValue: (row) => ActionButtons(row),
  },
]
