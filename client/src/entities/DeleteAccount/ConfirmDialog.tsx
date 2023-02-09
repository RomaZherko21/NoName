import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack } from '@mui/material'

import { useRootStore } from 'stores'

interface Props {
  onClose: () => void
  id: number
}

function ConfirmDialog({ onClose, id }: Props) {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const onDeleteAccount = async () => {
    await user.removeById(id)
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
