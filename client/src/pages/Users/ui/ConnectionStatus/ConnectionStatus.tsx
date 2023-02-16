import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Chip } from '@mui/material'

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined'

import { ConnectionStatus as TConnectionStatus } from 'shared/types'
import { useRootStore } from 'stores'

import { UsersModel, User } from '../../model'

interface Props {
  user: User
}

function ConnectionStatus({ user: data }: Props) {
  const { t } = useTranslation()
  const { user } = useRootStore()

  function sendConnectionRequest() {
    if (data.id) {
      UsersModel.connectionRequest(data.id)
    }
  }

  switch (data.connection_status) {
    case data.id !== user.id && null:
      return (
        <Button
          onClick={sendConnectionRequest}
          variant="contained"
          size="small"
          startIcon={<PersonAddAltOutlinedIcon fontSize="small" />}
          sx={{ borderRadius: '16px' }}
        >
          {t('user:actions.sendRequest')}
        </Button>
      )
    case TConnectionStatus.accept:
      return (
        <Chip
          label={t('user:yourFriend')}
          icon={<PersonOutlineOutlinedIcon fontSize="small" />}
          color="secondary"
        />
      )
    case TConnectionStatus.decline:
      return (
        <Chip
          label={t('user:userCanceledRequest')}
          icon={<PersonOutlineOutlinedIcon fontSize="small" />}
          color="error"
        />
      )
    case TConnectionStatus.pending:
      return (
        <Chip
          label={t('user:requestPending')}
          icon={<ScheduleSendOutlinedIcon fontSize="small" />}
          color="info"
        />
      )
    default:
      return null
  }
}

export default observer(ConnectionStatus)
