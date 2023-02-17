import { useState } from 'react'
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
import { AiOutlinePlus } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineLightBulb } from 'react-icons/hi2'

import { BasicUserInfo, MetaUserInfo } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'

interface Props {
  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  contacts: (BasicUserInfo & MetaUserInfo)[] | []
  clearContacts: () => void
}

function AsideChatSelector({ inputValue, onInputChange, contacts, clearContacts }: Props) {
  const { t } = useTranslation()
  const [showTip, setShowTip] = useState(false)

  function onBlur() {
    setShowTip(false)
    clearContacts()
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 380,
        p: 2,
        gap: 2.5,
        borderRadius: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">{t('user:chats')}</Typography>
        <Button startIcon={<AiOutlinePlus />} variant="contained">
          {t('user:group')}
        </Button>
      </Box>
      <Stack gap={1.5}>
        <TextField
          value={inputValue}
          onChange={onInputChange}
          onFocus={() => setShowTip(true)}
          onBlur={onBlur}
          fullWidth
          placeholder={t('user:actions.searchContacts')}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{<FiSearch size="24px" />}</InputAdornment>
            ),
          }}
        />
        {showTip && !inputValue && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              backgroundColor: '#1c2536',
              color: (theme) => theme.palette.text.secondary,
              borderRadius: '8px',
            }}
          >
            <HiOutlineLightBulb size={18} />
            <Typography variant="caption">{t('user:contactNameTip')}</Typography>
          </Box>
        )}
        {inputValue && !contacts.length && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ maxWidth: '280px', wordWrap: 'break-word' }}
          >
            {t('user:matchesDontFoundHint', { value: inputValue })}
          </Typography>
        )}
      </Stack>

      {contacts.length > 0 && (
        <Stack>
          <Typography variant="subtitle2" color="text.secondary">
            {t('user:contacts')}
          </Typography>
          <Stack sx={{ gap: 0.5, overflowY: 'auto' }}>
            {contacts.map((user) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    cursor: 'pointer',
                    backgroundColor: (theme) => theme.palette.background.paper,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{ height: '32px', width: '32px' }}
                      src={`${API_USER_AVATAR_URL}/${user.avatar}`}
                    />
                    <Typography variant="subtitle2" color="text.primary">
                      {`${user.name} ${user.surname}`}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Stack>
        </Stack>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          cursor: 'pointer',
          backgroundColor: (theme) => theme.palette.background.paper,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
            borderRadius: '15px',
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar />
          <Stack>
            <Typography variant="subtitle2" color="text.primary">
              Miron Vitold
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Sent a photo
            </Typography>
          </Stack>
        </Box>
        <Typography variant="caption" color="text.secondary">
          1h
        </Typography>
      </Box>
    </Paper>
  )
}

export default observer(AsideChatSelector)
