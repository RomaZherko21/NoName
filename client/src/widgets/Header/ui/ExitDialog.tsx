import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useRootStore } from 'stores'

interface Props {
  onClose: () => void
}

function ExitDialog({ onClose }: Props) {
  const { authorization } = useRootStore()

  const { t } = useTranslation()

  return (
    <Stack direction="row" spacing={2} sx={{ padding: '20px', width: '300px' }}>
      <Button
        onClick={() => {
          authorization.unauthorize()
          onClose()
        }}
        variant="contained"
        color="error"
        fullWidth
      >
        {t('actions.exit')}
      </Button>
    </Stack>
  )
}

export default ExitDialog
