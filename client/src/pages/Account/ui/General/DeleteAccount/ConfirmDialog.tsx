import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useRootStore } from 'stores'

interface Props {
  onClose: () => void
}

function ConfirmDialog({ onClose }: Props) {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const onDeleteAccount = async () => {
    await user.selfDelete()
    onClose()
  }

  return (
    <Stack direction="row" spacing={2} sx={{ p: 2, width: '300px' }}>
      <Button onClick={onDeleteAccount} variant="contained" color="error" fullWidth>
        {t('actions.delete')}
      </Button>
    </Stack>
  )
}

export default ConfirmDialog
