import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Chip } from '@mui/material'

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined'
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined'

import { User, ConnectionStatus as ConnectionStatuss } from 'shared/types'
import { useRootStore } from 'stores'

import { UsersModel } from '../../model'

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

  if (data.id === user.id) {
    return (
      <Chip
        label={t('user:thatsYou')}
        icon={<PersonPinOutlinedIcon fontSize="small" />}
        color="info"
      />
    )
  }

  if (data.id !== user.id && data.connection_status === null) {
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
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.accept) {
    return (
      <Chip
        label={t('user:yourFriend')}
        icon={<PersonOutlineOutlinedIcon fontSize="small" />}
        color="secondary"
      />
    )
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.decline) {
    return (
      <Chip
        label={t('user:userCanceledRequest')}
        icon={<PersonOutlineOutlinedIcon fontSize="small" />}
        color="error"
      />
    )
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.pending) {
    return (
      <Chip
        label={t('user:requestPending')}
        icon={<ScheduleSendOutlinedIcon fontSize="small" />}
        color="info"
      />
    )
  }

  return null
}

export default observer(ConnectionStatus)
