import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack } from '@mui/material'

interface Props {
  onClose: () => void
  onSubmit: () => void
}

function DeleteSubscriberDialog({ onSubmit, onClose }: Props) {
  const { t } = useTranslation()

  return (
    <Stack direction="row" spacing={2} sx={{ padding: 3, width: '300px' }}>
      <Button
        onClick={() => {
          onSubmit()
          onClose()
        }}
        variant="contained"
        color="error"
        fullWidth
      >
        {t('actions.delete')}
      </Button>
    </Stack>
  )
}

export default observer(DeleteSubscriberDialog)
