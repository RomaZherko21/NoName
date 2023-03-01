import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Avatar,
} from '@mui/material'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'

import { API_USER_AVATAR_URL, COMMON_DATE_FORMAT } from 'shared/consts'

import { format } from 'date-fns'
import { fromMsToDate } from 'shared/helpers'

import { ChatModel } from '../../model'

function AsideChatSelector() {
  const { t } = useTranslation()
  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
    ChatModel.fetchChats()
  }, [searchInputValue])

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        p: 2,
        gap: 2,
        borderRadius: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">{t('user:chats')}</Typography>
        <Button size="small" variant="contained" endIcon={<AiOutlineUsergroupAdd />}>
          {t('chat:actions.addGroup')}
        </Button>
      </Box>

      <Stack gap={1}>
        <TextField
          value={searchInputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInputValue(e.target.value)
          }}
          fullWidth
          placeholder={t('chat:actions.searchChat')}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{<FiSearch size="16px" />}</InputAdornment>
            ),
          }}
        />

        {searchInputValue && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ wordWrap: 'break-word', textAlign: 'left', ml: 0.5 }}
          >
            {t('chat:notification.emptyChatSearch')}
          </Typography>
        )}
      </Stack>

      {ChatModel.chats.map((item) => (
        <Box
          onClick={() => {
            if (item.id !== ChatModel.chat_id) {
              ChatModel.fetchChatMessages(item.id)
            }
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2,
            cursor: 'pointer',
            backgroundColor: item.id === ChatModel.chat_id ? 'action.hover' : 'background.paper',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={`${API_USER_AVATAR_URL}/${item.user_avatar}`} />
            <Stack>
              <Typography variant="subtitle2" color="text.primary">
                {item.user_name} {item.user_surname}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                {item.last_message}
              </Typography>
            </Stack>
          </Box>

          <Typography variant="caption" color="text.secondary">
            {format(fromMsToDate(item.updated_at), COMMON_DATE_FORMAT)}
          </Typography>
        </Box>
      ))}
    </Paper>
  )
}

export default observer(AsideChatSelector)
