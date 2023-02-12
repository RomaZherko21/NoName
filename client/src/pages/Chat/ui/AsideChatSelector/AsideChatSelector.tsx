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

import { User } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'

import s from './Styles.module.scss'

interface Props {
  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  contacts: User[] | []
  clearContacts: () => void
}

function AsideChatSelector({ inputValue, onInputChange, contacts, clearContacts }: Props) {
  const [tip, setTip] = useState(false)
  const { t } = useTranslation()

  function onBlur() {
    setTip(false)
    clearContacts()
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '380px',
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
          onFocus={() => setTip(true)}
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
        {tip && !inputValue && (
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
            Contacts
          </Typography>
          <Stack sx={{ gap: 0.5, overflowY: 'auto' }}>
            {contacts.map((user) => {
              return (
                <button className={s.contactButton}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{ height: '32px', width: '32px' }}
                      src={`${API_USER_AVATAR_URL}/${user.avatar}`}
                    />
                    <Typography variant="subtitle2" color="text.primary">
                      {`${user.name} ${user.surname}`}
                    </Typography>
                  </Box>
                </button>
              )
            })}
          </Stack>
        </Stack>
      )}
      <button className={s.messageButton}>
        <Box display="flex" gap={2}>
          <Avatar />
          <Stack alignItems="flex-start">
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
      </button>
    </Paper>
  )
}

export default observer(AsideChatSelector)
