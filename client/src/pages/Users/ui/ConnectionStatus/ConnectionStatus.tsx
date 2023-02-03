import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip } from '@mui/material'

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
      <Tooltip title={t('user:thatsYou')} placement="top">
        <IconButton size="small" onClick={sendConnectionRequest}>
          <PersonPinOutlinedIcon fontSize="medium" color="info" />
        </IconButton>
      </Tooltip>
    )
  }

  if (data.id !== user.id && data.connection_status === null) {
    return (
      <Tooltip title={t('user:actions.sendRequest')} placement="top">
        <IconButton size="small" onClick={sendConnectionRequest}>
          <PersonAddAltOutlinedIcon fontSize="medium" sx={{ color: 'grey.500' }} />
        </IconButton>
      </Tooltip>
    )
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.accept) {
    return (
      <Tooltip title={t('user:yourFriend')} placement="top">
        <IconButton size="small">
          <PersonOutlineOutlinedIcon fontSize="medium" color="secondary" />
        </IconButton>
      </Tooltip>
    )
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.decline) {
    return (
      <Tooltip title={t('user:userCanceledRequest')} placement="top">
        <IconButton size="small">
          <PersonOutlineOutlinedIcon fontSize="medium" color="error" />
        </IconButton>
      </Tooltip>
    )
  }

  if (data.id !== user.id && data.connection_status === ConnectionStatuss.pending) {
    return (
      <Tooltip title={t('user:requestPending')} placement="top">
        <IconButton size="small">
          <ScheduleSendOutlinedIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    )
  }

  return null
}

export default observer(ConnectionStatus)
