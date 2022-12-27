import { Button, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { useRootStore } from 'stores'

interface Props {
  onClose: () => void
}

function ExitDialog({ onClose }: Props) {
  const { authorization } = useRootStore()

  const { t } = useTranslation()

  return (
    <Stack direction="row" spacing={2} sx={{ padding: 3, width: '300px' }}>
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

export default observer(ExitDialog)
