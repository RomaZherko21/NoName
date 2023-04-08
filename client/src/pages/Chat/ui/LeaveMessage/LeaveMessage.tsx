import { observer } from 'mobx-react-lite'
import { Paper, Avatar, TextField, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TbSend } from 'react-icons/tb'
import { RiAttachment2 } from 'react-icons/ri'

import { useState } from 'react'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'

function LeaveMessage() {
  const { ws, user } = useRootStore()
  const { t } = useTranslation()

  const [value, setValue] = useState('')

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        gap: 1,
        width: '100%',
        borderRadius: 0
      }}
    >
      <Avatar sx={{ height: 40, width: 40 }} src={`${API_USER_AVATAR_URL}/${user.avatar.url}`} />

      <TextField
        value={value}
        onChange={(e: any) => {
          setValue(e.target.value)
        }}
        size="small"
        fullWidth
        placeholder={t('actions.leaveMessage')}
        variant="outlined"
      />

      <IconButton
        onClick={() => {
          ws.chatMessages.sendMessage({
            text: value,
            userId: 2
          })
        }}
      >
        <TbSend />
      </IconButton>
      <IconButton>
        <RiAttachment2 />
      </IconButton>
    </Paper>
  )
}

export default observer(LeaveMessage)
