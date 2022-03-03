import { Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useRootStore } from 'stores/Root'

interface Props {
  onClose: () => void
}

const ExitDialog = ({ onClose }: Props) => {
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
        {t('common.exit')}
      </Button>
    </Stack>
  )
}

export default ExitDialog
