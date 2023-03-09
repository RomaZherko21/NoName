import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  IconButton,
  LinearProgress,
  InputBase,
  Button,
  Stack,
  Typography,
  Divider,
  Checkbox,
  TextField,
} from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'

import { ActionButtons } from '../ActionButtons'

function Checklist() {
  const { t } = useTranslation()
  const [isAddItemActive, setIsAddItemActive] = useState(false)
  const [isChangeNameActive, setIsChangeNameActive] = useState(false)
  const [isChangeCheckActive, setIsChangeCheckActive] = useState(false)

  return (
    <Stack sx={{ border: ({ palette }) => `1px solid ${palette.divider}`, borderRadius: '20px' }}>
      <Box sx={{ display: 'flex', gap: 3, p: 1.5 }}>
        <InputBase
          onFocus={() => setIsChangeNameActive(true)}
          value="Untitled Checklist"
          size="small"
          fullWidth
          sx={{
            p: 0.5,
            pl: 1.5,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px',
            },
            '&.Mui-focused': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px',
            },
            '&fieldset': { border: 'none' },
          }}
        />
        {isChangeNameActive ? (
          <ActionButtons onClick={() => setIsChangeNameActive(false)} />
        ) : (
          <IconButton sx={{ color: ({ palette }) => palette.text.secondary }} size="small">
            <FiTrash />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', p: 3, pt: 0, gap: 2 }}>
        <LinearProgress
          variant="determinate"
          value={30}
          sx={{ height: 10, borderRadius: '8px', width: '100%' }}
        />
        <Typography variant="body2" color="text.secondary">
          30%
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
        <Checkbox size="medium" />
        <InputBase
          onFocus={() => setIsChangeCheckActive(true)}
          value="Check"
          size="small"
          fullWidth
          sx={{
            mt: 0.8,
            p: 0.5,
            pl: 1.5,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px',
            },
            '&.Mui-focused': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px',
            },
            '&fieldset': { border: 'none' },
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isChangeCheckActive ? (
            <ActionButtons onClick={() => setIsChangeCheckActive(false)} />
          ) : (
            <IconButton sx={{ color: ({ palette }) => palette.text.secondary }} size="small">
              <FiTrash />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider />

      {isAddItemActive ? (
        <Box sx={{ display: 'flex', gap: 1, p: 1.5 }}>
          <TextField size="small" fullWidth placeholder={t('kanban:actions.addItem')} />
          <ActionButtons onClick={() => setIsAddItemActive(false)} />
        </Box>
      ) : (
        <Box onClick={() => setIsAddItemActive(true)} sx={{ p: 1.5 }}>
          <Button color="inherit" startIcon={<AiOutlinePlus />}>
            {t('kanban:actions.addItem')}
          </Button>
        </Box>
      )}
    </Stack>
  )
}

export default observer(Checklist)
