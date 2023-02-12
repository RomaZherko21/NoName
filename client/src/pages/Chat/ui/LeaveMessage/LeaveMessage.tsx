import { Paper, Avatar, TextField, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TbSend } from 'react-icons/tb'
import { RiAttachment2 } from 'react-icons/ri'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'

function LeaveMessage() {
  const { user } = useRootStore()
  const { t } = useTranslation()

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        pr: 4,
        pl: 4,
        gap: 2,
        width: '100%',
        height: `71px`,
        borderRadius: 0,
      }}
    >
      <Avatar
        sx={{ height: '40px', width: '40px' }}
        src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
      />
      <TextField size="small" fullWidth placeholder={t('Leave a message')} variant="outlined" />
      <IconButton>
        <TbSend />
      </IconButton>
      <IconButton>
        <RiAttachment2 />
      </IconButton>
    </Paper>
  )
}

export default LeaveMessage
