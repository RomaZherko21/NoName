import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack } from '@mui/material'

interface Props {
  onClose: () => void
  onDelete: () => void
}

function ConfirmDialog({ onClose, onDelete }: Props) {
  const { t } = useTranslation()

  const onDeleteAccount = async () => {
    onDelete()
    onClose()
  }

  return (
    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
      <Button onClick={onDeleteAccount} variant="contained" color="error" fullWidth>
        {t('actions.delete')}
      </Button>
    </Stack>
  )
}

export default observer(ConfirmDialog)
