import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

interface Props {
  onClick: () => void
}

function ActionButtons({ onClick }: Props) {
  const { t } = useTranslation()
  return (
    <>
      <Button onClick={onClick} variant="contained">
        {t('actions.add')}
      </Button>
      <Button onClick={onClick}>{t('actions.cancel')}</Button>
    </>
  )
}

export default observer(ActionButtons)
