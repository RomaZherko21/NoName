import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Button, TextField } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

interface Props {
  text: string
}

function AddButton({ text }: Props) {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {isFormOpen ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1.5,
            gap: 1.5,
            width: '100%',
            maxWidth: '300px',
            borderRadius: '20px',
            backgroundColor: '#1c2536',
            color: (theme) => theme.palette.text.secondary,
            cursor: 'pointer',
            '&:active': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          <TextField size="small" autoFocus placeholder={t(text)} fullWidth />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              onClick={() => setIsFormOpen(false)}
              size="small"
              variant="contained"
              startIcon={<AiOutlinePlus />}
            >
              {t(text)}
            </Button>
            <Button onClick={() => setIsFormOpen(false)} size="small" variant="text">
              {t('user:actions.cancel')}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={() => setIsFormOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
            p: 1.5,
            gap: 1,
            borderRadius: '20px',
            backgroundColor: '#1c2536',
            color: (theme) => theme.palette.text.secondary,
            cursor: 'pointer',
            '&:active': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          <AiOutlinePlus fontSize={24} />
          <Typography variant="subtitle1">{t(text)}</Typography>
        </Box>
      )}
    </>
  )
}

export default observer(AddButton)
