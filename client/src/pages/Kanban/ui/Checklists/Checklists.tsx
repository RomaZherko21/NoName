import { observer } from 'mobx-react-lite'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Checklist } from './ui'

function Checklists() {
  const { t } = useTranslation()

  return (
    <Stack
      sx={{
        gap: 3,
        p: '24px',
        pt: 0,
      }}
    >
      <Checklist />
      <Checklist />

      <Button variant="contained" startIcon={<AiOutlinePlus />}>
        {t('actions.add')}
      </Button>
    </Stack>
  )
}

export default observer(Checklists)
